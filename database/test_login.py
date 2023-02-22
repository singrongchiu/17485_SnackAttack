import users

print(users.create_new_user("lululololhash", "passwordhash"))
print(users.create_new_user("lululololhash", "passwordhash"))

users.sign_in("lululololhash", "passwordhash")
users.sign_in("lululololhash", "wrongpassword")
users.sign_in("wronguser", "passwordhash")