import cipher
import pymongo
from database import hwsets
from database import projects

print(hwsets.queryHWSet("HWSet1"))
print(projects.create_new_project("New Project", "newproject123", "this is a description"))
# USER_N = 4
# USER_D = 1
# PW_N = 8
# PW_D = 1
# EMAIL_N = 6
# EMAIL_D = -1

# db = "mongodb+srv://test_user:Passw0rd@cluster0.c3m9ayf.mongodb.net/?retryWrites=true&w=majority"
# client = pymongo.MongoClient(db)
# users = client.test.users

# def encrypt_credentials(username, password, email):
#     encrypted_username = cipher.encrypt(username, USER_N, USER_D)
#     encrypted_pw = cipher.encrypt(password, PW_N, PW_D)
#     encrypted_email = cipher.encrypt(email, EMAIL_N, EMAIL_D)

#     return encrypted_username, encrypted_pw, encrypted_email

# def create_account(username, password, email):
#     encrypted_username, encrypted_pw, encrypted_email = encrypt_credentials(username, password, email) 
#     return create_new_user(encrypted_username, encrypted_pw, encrypted_email)

# def create_new_user(usernamehash, passwordhash, emailhash):
#     myquery = {"login.userhash": usernamehash}
#     x = users.find_one(myquery)
#     if x != None:
#         print("Userhash", usernamehash, "already exists")
#         return 0

#     personDocument = {
#         "login": {"userhash": usernamehash, "passwordhash": passwordhash},
#         "email": emailhash}

#     users.insert_one(personDocument)
#     print("User account successfully created")
#     return 1


# create_account("Abhay", "Samant", "abhay.samant@utexas.edu")