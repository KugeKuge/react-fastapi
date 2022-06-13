from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from Utils import convertChinpo
#debug用 from .Utils import convertChinpo
import base64
from io import BytesIO
from PIL import Image

app = FastAPI()

origins = [
    "http://localhost:3000",
] #通信するreactなどのアプリのURLを記載しましょう。最初はlocalとの通信をしたいので、http://localhost:3000しか登録してませんが、後ほどフロントエンドのアプリをサーバーにデプロイした際には、URLを増やすことになると思います。

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #クロスオリジンを許可するオリジンのリストを配列で指定する。
    allow_credentials=True, #Cookieの共有を許可するかどうか。デフォルトはFalse。
    allow_methods=["*"], #許可するHTTPメソッドを指定する。デフォルトはGET。アスタリスク( * )にすることで全てのHTTPメソッドを許可する。
    allow_headers=["*"], #オリジン間リクエストでサポートするHTTPリクエストヘッダーのリスト。デフォルトは [] 。['*']を使用して、すべてのヘッダーを許可できる。
)

@app.get("/") #/というURLにGetリクエスト来たら、という意味です。/はデフォルトのURLです。
def Hello():
    return {"Hello":"World!"} #{"Hello":"World!"}というjsonを返すように設定しています。このように、FastAPIでは、returnにjsonを書くだけで、json形式でレスポンスを送る事ができます。

@app.post("/chinpo") 
async def letsChinpo(request: Request):
    form = await request.form()
    base64_image_string = form["originalImage"]
    
    image = Image.open(BytesIO(base64.b64decode(base64_image_string.split(",")[1])))

    chinpo_image = convertChinpo.paste_chinpo(image)
    
    buff = BytesIO()
    chinpo_image.save(buff, format="JPEG")
    base64_chinpo_image_string = base64.b64encode(buff.getvalue()).decode("utf-8")
    
    # レスポンスはデフォルトではJSONになる。
    #return Response(content=buff.getvalue())
    
    # カスタムレスポンス(形式指定)を返却。この場合はjpg。
    return Response(content=base64_chinpo_image_string, media_type="image/jpg")
