import pymongo
import sys

sys.path.insert(0, "./")
import database.users as users
import database.hwsets as hwsets
import database.projects as projects

db = "mongodb+srv://test_user:Passw0rd@cluster0.c3m9ayf.mongodb.net/?retryWrites=true&w=majority"
usersclient = pymongo.MongoClient(db)

users.client = usersclient
users.users = usersclient.test.users

db = "mongodb+srv://asamant:EE461LSp23@cluster0.oovet.mongodb.net/?retryWrites=true&w=majority"
hwclient = pymongo.MongoClient(db) 

hwsets.client = hwclient
hwsets.set = hwclient.test.hardware

db = "mongodb+srv://asamant:EE461LSp23@cluster0.oovet.mongodb.net/?retryWrites=true&w=majority"
projectsclient = pymongo.MongoClient(db)

projects.client = projectsclient
projects.projects = hwclient.test.projects

