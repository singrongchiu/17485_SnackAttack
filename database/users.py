import pymongo

db = "mongodb+srv://test_user:Passw0rd@cluster0.c3m9ayf.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(db)
users = client.test.users

# checks if the username hash already exists in the database
# and inserts a new user
# does not do hashing or checking for valid usernames/passwords
# returns 1 if successful and 0 if unsuccessful
def create_new_user(usernamehash, passwordhash, emailhash):
    myquery = {"login.userhash": usernamehash}
    x = users.find_one(myquery)
    if x != None:
        print("Userhash", usernamehash, "already exists")
        return 0

    personDocument = {
        "login": {"userhash": usernamehash, "passwordhash": passwordhash},
        "email": emailhash, 
        "projects": []}

    users.insert_one(personDocument)
    print("User account successfully created")
    return 1

# returns 1 if userhash and password hash matches and 
# 0 if the username and password don't match
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

def get_login(emailhash):
    myquery = {"email": emailhash}
    x = users.find_one(myquery)
    return(x["login"]["userhash"], x["login"]["passwordhash"])

# 0 if userhash does not exist, 1 if successful
def change_password(usernamehash, passwordhash): 
    users = client.test.users

    record = users.find_one({"login.userhash": usernamehash})
    if record is None: 
        client.close()
        return 0
    users.update_one({"login.userhash": usernamehash},
        {"$set": {
            "login.passwordhash": passwordhash
        }
        })
    return 1

# def close_connection():
#     client.close()
