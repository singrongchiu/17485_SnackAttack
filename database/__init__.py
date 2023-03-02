import pymongo
import sys
sys.path.insert(0, "./")
import database.users as users

db = "mongodb+srv://test_user:Passw0rd@cluster0.c3m9ayf.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(db)

users.client = client
users.users = client.test.users
