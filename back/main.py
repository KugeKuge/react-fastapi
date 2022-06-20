from fastapi import FastAPI#, Request, Response #リクエスト、レスポンスを使う場合
from fastapi.middleware.cors import CORSMiddleware
from Utils import ConvertChinpo 
#from .Utils import convertChinpo #デバッグ用
import base64
from io import BytesIO
from PIL import Image
from pydantic import BaseModel #リクエストボディの中をクラスで定義する
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from Utils import SearchChinpoTweet

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://192.168.10.14:3000",
    "http://192.168.10.14",
] #通信するreactなどのアプリのURLを記載しましょう。最初はlocalとの通信をしたいので、http://localhost:3000しか登録してませんが、後ほどフロントエンドのアプリをサーバーにデプロイした際には、URLを増やすことになると思います。

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #クロスオリジンを許可するオリジンのリストを配列で指定する。
    allow_credentials=True, #Cookieの共有を許可するかどうか。デフォルトはFalse。
    allow_methods=["*"], #許可するHTTPメソッドを指定する。デフォルトはGET。アスタリスク( * )にすることで全てのHTTPメソッドを許可する。
    allow_headers=["*"], #オリジン間リクエストでサポートするHTTPリクエストヘッダーのリスト。デフォルトは [] 。['*']を使用して、すべてのヘッダーを許可できる。
)

# リクエストボディで引数をもらう場合、Jsonに対応した項目をクラスとして定義しておく
class ChinpoImageItem(BaseModel):
    base64_image_string: str

@app.get("/") #/というURLにGetリクエスト来たら、という意味です。/はデフォルトのURLです。
def Hello():
    return {"Hello":"World!"} #{"Hello":"World!"}というjsonを返すように設定しています。このように、FastAPIでは、returnにjsonを書くだけで、json形式でレスポンスを送る事ができます。

@app.get("/getRecentChinpo") 
def GetRecentChinpo():
    return SearchChinpoTweet.SearchTweets()

@app.post("/chinpo") 
# def letsChinpo(request: Request): #FormDataで送る場合
    #form = await request.form()
    #base64_image_string = form["originalImage"]
    
def letsChinpo(item: ChinpoImageItem): # リクエストボディで送る場合    
    base64_image_string = item.base64_image_string
    
    image = Image.open(BytesIO(base64.b64decode(base64_image_string.split(",")[1])))

    chinpo_image = ConvertChinpo.paste_chinpo(image)
    
    buff = BytesIO()
    chinpo_image.save(buff, format="JPEG")
    base64_chinpo_image_string = base64.b64encode(buff.getvalue()).decode("utf-8")
    
    # Itemに詰め替えると勝手にJSONでResponseを返す
    #return ChinpoImageItem(base64_image_string = base64_chinpo_image_string)

    #これも同じく
    #res = ChinpoImageItem(base64_image_string = base64_chinpo_image_string)
    #json_compatible_item_data = jsonable_encoder(res)
    #return JSONResponse(content=json_compatible_item_data)
    
    #自分でJSONを組み立てて返してもOK
    data = {"base64_image_string": base64_chinpo_image_string, "name": "chinpo-image"}
    return data
    
    #複数行実験
    #images = [base64_chinpo_image_string,base64_chinpo_image_string,base64_chinpo_image_string]
    #str_json = {
    #    "data":{
    #        "base64_image_string": images,
    #        "Key2": "Value2"
    #    }
    #}
    #return str_json
    
    #これもOK
    # return base64_chinpo_image_string
    
    # カスタムレスポンス(形式指定)を返却。この場合はjpg。
    #return Response(content=base64_chinpo_image_string, media_type="image/jpg")
