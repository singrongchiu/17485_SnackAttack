import pymongo
from database import hwsets

db = "mongodb+srv://test_user:Passw0rd@cluster0.c3m9ayf.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(db)
projects = client.test.projects

def query_project(projectid):
    myquery = {"id": projectid}
    x = projects.find_one(myquery)
    return x

# id, password are strings
# members is stored in database as a set
# checks if the project already exists in the database
# returns 1 if successful and 0 if unsuccessful

def create_new_project(name, id, description):
    myquery = {"id": id}
    x = projects.find_one(myquery)
    if x != None: 
        print("Project ID", id, "already exists")
        return 0

    projectDocument = {
        "name": name,
        "id": id, 
        "description": description,
        "checkedout": {"HWSet1": 0, "HWSet2":0}     ## {int project id: int number checked out}
    }

    projects.insert_one(projectDocument)
    print("Project successfully created")
    return 1

# def create_new_project_with_members(id, password, members):
#     mymembers = list(members)
#     myquery = {"id": id}
#     x = projects.find_one(myquery)
#     if x != None:
#         print("Project ID", id, "already exists")
#         return 0

#     projectDocument = {
#         "id": id,
#         "password": password,
#         "checkedout": {"HWSet1": 0, "HWSet2": 0},
#         "members": mymembers
#     }

#     projects.insert_one(projectDocument)
#     print("Project successfully created")
#     return 1

# returns 1 if id and password matches and
# 0 if they don't match
def project_sign_in(projectid):
    myquery = {"id": projectid}
    x = projects.find_one(myquery)
    if x == None:
        print("Project ID", projectid, "does NOT exist")
        return 0

    print("Project ID", projectid, "exists")
    return 1

# checks if user is a part of the project
# def project_sign_in_with_user(projectid, password, userid):
#     myquery = {"id": projectid}
#     x = projects.find_one(myquery)
#     if x == None:
#         print("Project ID", projectid, "does NOT exist")
#         return 0

#     print("Project ID", projectid, "exists")
#     if (x["password"]== password):
#         print("Login and password correct.", projectid, password)
#         if userid in x["members"]:
#             print("User", userid, "is a part of the project. Login successful.")
#             return 1
#         else:
#             print("User", userid, "is not a part of the project.")
#             return 0
#     else:
#         print("Password", password, "is INCORRECT")
#         return -1

# returns -1 if there is an invalid input
# returns 0 if there is not enough availability
# returns 1 if successful
def project_check_out(projectid, hwsetname, num):
    num = int(num)
    if type(num) is not int:
        print("Input check out quantity is not an int")
        return -1

    myquery = {"name": hwsetname}
    thisHWSet = hwsets.set.find_one(myquery)

    if thisHWSet is None:
        print("Input hwsetid is not a real id")
        return -1

    hwsetavailability = thisHWSet["availability"]

    if hwsetavailability < num:
        print("HWset", hwsetname, "does not have enough availability")
        return 0

    hwsets.changeAvailability(hwsetname, hwsetavailability - num)
    print("Successfully checked out quantity", num, "from database")

    myprojquery = {"id": projectid}
    thisProject = projects.find_one(myprojquery)

    hwsetcheckedout = thisProject["checkedout"]
    if hwsetname not in hwsetcheckedout:
        hwsetcheckedout[hwsetname] = num
    else:
        hwsetcheckedout[hwsetname] += num

    projects.update_one({"id": projectid},
                   {"$set": {
                       "checkedout": hwsetcheckedout
                   }
                   })
    print("Successfully updated projectid", projectid)
    return 1

def project_check_in(projectid, hwsetname, num):
    num = int(num)
    if type(num) is not int:
        print("Input check out quantity is not an int")
        return -1

    myquery = {"name": hwsetname}
    thisHWSet = hwsets.set.find_one(myquery)

    if thisHWSet is None:
        print("Input hwsetid is not a real id")
        return -1
    
    hwsetavailability = thisHWSet["availability"]

    myprojquery = {"id": projectid}
    thisProject = projects.find_one(myprojquery)

    if thisProject is None:
        print("Input projectid is not a real id")
        return -1

    hwsetcheckedout = thisProject["checkedout"]

    if hwsetname not in hwsetcheckedout:
        print("HWSet", hwsetname, "is not checked out by this project", projectid)
        return 0
    else: 
        if hwsetcheckedout[hwsetname] >= num: 
            hwsets.changeAvailability(hwsetname, hwsetavailability + num)
            print("Successfully checked in quantity", num, "from database")
            hwsetcheckedout[hwsetname] -= num
            projects.update_one({"id": projectid},
                   {"$set": {
                       "checkedout": hwsetcheckedout
                   }
                   })
            print("Successfully updated projectid", projectid)
            return 1
        else: 
            print("Project", projectid, "has not previously checked out more than this amount", "checked out:", 
                  hwsetcheckedout[hwsetname], "check in attempt:", num)
            return 0