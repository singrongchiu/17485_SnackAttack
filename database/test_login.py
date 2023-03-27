import users
import hwsets
import projects

# print(users.create_new_user("lululololhash", "passwordhash", "emailhash"))
# print(users.create_new_user("lululololhash", "passwordhash", "emailhash"))

# users.sign_in("lululololhash", "passwordhash")
# users.sign_in("lululololhash", "wrongpassword")
# users.sign_in("wronguser", "passwordhash")
# print(users.change_password("lululololss", "newpassword"))
# users.sign_in("lululololhash", "passwordhash")

# print(users.get_login("emailhash"))

# hwsets.initializeHWSet(4, 399, 222)
# hwsets.changeAvailability(4, 2)

projects.create_new_project("ECE445LLabGroup", "ourpassword", ["lululolol", "Abhay"])
print(projects.project_sign_in("ECE445LLabGroup", "ourpassword"))
projects.project_check_out("ECE445LLabGroup", "HWSet4", 2)

