import tweepy
#from pprint import pprint
from datetime import datetime,timezone, timedelta
from Models import ChinpoTweet
import motor.motor_asyncio

# API情報を記入
BEARER_TOKEN        = "AAAAAAAAAAAAAAAAAAAAAL9mdwEAAAAAkzydybhWZO%2BFya4NxnEEX2UUcxM%3DruoCBiG7cfqWgPw9yLDs1WjE00pSyjHBm4vVMs2raJAE5FKzaL"
API_KEY             = "Mbd4HEdPl8lpUJmW8ftz3YAS6"
API_SECRET          = "ARkuqFp2ilJszgT4ksv5TT25atveuZSD3eP1Lv3mHxXXmYMhF2"
ACCESS_TOKEN        = "627025270-FJJtG9HLCOXLTeHvobLywL7qRQpDlK9INY0y98FK"
ACCESS_TOKEN_SECRET = "sAFaWKi3lo9vJZDpL2tM0SW6EYVMfnrlhvzOZlshAObkL"

query = '吉野家 lang:ja -is:retweet'       # 検索するキーワード 検索条件指定してOK
limit = 500                # 取得したいツイート数

now = datetime.now()
now = now.replace(minute=0, second=0, microsecond=0)
end_time_tweepy = str(now.isoformat())+'+09:00'
start_time = now - timedelta(days=1) 
start_time_tweepy = str(start_time.isoformat())+'+09:00'

# クライアント関数を作成
def ClientInfo():
	# 取得対象のツイートの時間幅を指定する この例では実行前の２４時間としています。
	# iso形式のUTC時間で指定しないと正しく時間指定ができない模様。
	# 指定した時間幅に、limitで指定した件数以上のツイートがあってもlimit以上は取得しません。

    client = tweepy.Client(bearer_token    = BEARER_TOKEN,
                           consumer_key    = API_KEY,
                           consumer_secret = API_SECRET,
                           access_token    = ACCESS_TOKEN,
                           access_token_secret = ACCESS_TOKEN_SECRET,
                          )
    return client

def change_time_JST(u_time):
    #イギリスのtimezoneを設定するために再定義する
    utc_time = datetime(u_time.year, u_time.month,u_time.day, \
    u_time.hour,u_time.minute,u_time.second, tzinfo=timezone.utc)
    #タイムゾーンを日本時刻に変換
    jst_time = utc_time.astimezone(timezone(timedelta(hours=+9), 'JST'))
    # 文字列で返す
    str_time = jst_time.strftime("%Y-%m-%d_%H:%M:%S")
    return str_time

# 関数
def SearchTweets(): #search,tweet_max):    
    # ★必要情報入力
    search    = "ちんぽ OR チンポ"  # 検索対象
    tweet_max = 100           # 取得したいツイート数(10〜100で設定可能)

    # 直近のツイート取得
    tweets = ClientInfo().search_recent_tweets(query = search, max_results = tweet_max,
            tweet_fields = ['author_id', 'created_at'],
            expansions = ['author_id'])

    # 取得したデータ加工
    results     = []
    tweets_data = tweets.data

    # tweet検索結果取得
    if tweets_data != None:
        for tweet in tweets_data:
            obj = {}
            obj["tweet_id"] = tweet.id      # Tweet_ID
            obj["text"] = tweet.text  # Tweet Content
            obj["created_at"] = change_time_JST(tweet.created_at) # Tweet date

            for i in range(len(tweets.includes['users'])):
                if tweet.author_id == tweets.includes['users'][i]['id']:
                    obj['user_id'] = tweets.includes['users'][i]['username']
                    obj['user_name'] = tweets.includes['users'][i]['name']

            results.append(obj)
    else:
        results.append('')

    #fetch_and_replace(results)

    # 結果出力
    return results

# 関数実行・出力
#pprint(SearchTweets(search,tweet_max))

# MongoDB操作

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://admin:admin@cluster0.spluvvn.mongodb.net/?retryWrites=true&w=majority')
database = client.ChinpoTweet
collection = database.ChinpoTweet

def fetch_and_replace(chinpoTweets):
    # ★データが一定時間以上前なら置き換える処理を入れたい
    #cursor = collection.find({}).sort({"created_at":-1})

    # とりあえず毎回最新を取得して入れ替える
#    remove_all_chinpoTweets()

    for document in chinpoTweets:
        insert_chinpoTweets(document)
        
    #return chinpoTweets

def insert_chinpoTweets(chinpoTweets):
    for document in chinpoTweets:
        result = collection.insert_one(document)
    
    return True

def remove_all_chinpoTweets():
    result =collection.remove()
    return True