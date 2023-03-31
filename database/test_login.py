# import users
# import hwsets
import projects

# print(users.create_new_user("lululololhash1", "passwordhash", "emailhash"))
# print(users.create_new_user("lululololhash1", "passwordhash", "emailhash"))

# users.sign_in("lululololhash1", "passwordhash")
# users.sign_in("lululololhash1", "wrongpassword")
# users.sign_in("wronguser", "passwordhash")
# print(users.change_password("lululololss", "newpassword"))
# users.sign_in("lululololhash1", "passwordhash")

# print(users.get_login("emailhash"))

# hwsets.initializeHWSet("HWSet1", 399, 222)
# hwsets.changeAvailability(4, 2)

projects.create_new_project("Name 1", "ECE445LLabGroupExtra", "This is a description. Ahsdkfl")
print(projects.project_sign_in("ECE445LLabGroupExtra"))
print(projects.project_sign_in("ECE445LLabGroupExtra1"))
projects.project_check_in("ECE445LLabGroupExtra", "HWSet4", 2)
projects.project_check_out("ECE445LLabGroupExtra", "HWSet1", 1)
projects.project_check_out("ECE445LLabGroupExtra", "HWSet4", 45)

