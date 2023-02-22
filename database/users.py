import pymongo
client = pymongo.MongoClient("mongodb+srv://test_user:Passw0rd@cluster0.c3m9ayf.mongodb.net/?retryWrites=true&w=majority")
db = client.test
users = db.users

# checks if the username hash already exists in the database
# and inserts a new user
# does not do hashing or checking for valid usernames/passwords
# returns 1 if successful and 0 if unsuccessful
def create_new_user(usernamehash, passwordhash):
    user = usernamehash
    myquery = {"login.userhash": usernamehash}
    x = users.find_one(myquery)
    if x != None:
        print("Userhash", usernamehash, "already exists")
        return 0

    personDocument = {
        "login": {"userhash": usernamehash, "passwordhash": passwordhash},
        "projects": []}

    users.insert_one(personDocument)
    print("User account successfully created")
    return 1

# returns 1 if successful and 0 if unsuccessful
def sign_in(usernamehash, passwordhash):
    myquery = {"login.userhash": usernamehash}
    x = users.find_one(myquery)
    if x == None:
        print("Userhash", usernamehash, "does NOT exist")
        return 0

    print("Userhash", usernamehash, "exists")
    if (x["login"]["passwordhash"] == passwordhash):
        print("Successful login for", usernamehash, passwordhash)
        return 1
    else:
        print("Passwordhash", passwordhash, "is INCORRECT")
        return 0


