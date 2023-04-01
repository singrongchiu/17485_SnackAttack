import pymongo
from . import users
from . import hwsets
from . import projects

db = "mongodb+srv://test_user:Passw0rd@cluster0.c3m9ayf.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(db)

users.client = client
users.users = client.test.users

hwsets.client = client
hwsets.set = client.test.hardware

projects.client = client
projects.projects = client.test.projects

