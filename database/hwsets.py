import pymongo

db = "mongodb+srv://test_user:Passw0rd@cluster0.c3m9ayf.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(db)
set = client.test.hardware

# get availability and capacity
def queryHWSet(name):
    myquery = {"name:": name}
    hwset = set.find_one(myquery)
    return hwset

# return 0 if unsuccessful, 1 if successful
def initializeHWSet(hwsetname, capacity, availability):
    exists = set.find_one({"name": hwsetname})
    if exists is not None:
        print("Hwset name", hwsetname, "already exists")
        return 0

    hwsetDocument = {
        "name": hwsetname,
        "capacity": capacity,
        "availability": availability}
    
    set.insert_one(hwsetDocument)
    return 1

# # return 0 if unsuccessful, 1 if successful
# def changeHWSet1Capacity(newCapacity):
#     set.update_one({"name": "HWSet1"},
#         {"$set": {
#             "capacity": newCapacity
#         }
#         })
#     return 1

# # return 0 if unsuccessful, 1 if successful
# def changeHWSet2Capacity(newCapacity):
#     set.update_one({"name": "HWSet2"},
#         {"$set": {
#             "capacity": newCapacity
#         }
#         })
#     return 1

# return 0 if unsuccessful, 1 if successful
def changeCapacity(hwsetname, newCapacity):
    record = set.find_one({"name": hwsetname})
    if record is None:
        return 0
    set.update_one({"name": hwsetname},
        {"$set": {
            "capacity": newCapacity
        }
        })
    return 1

# # return 0 if unsuccessful, 1 if successful
# def changeHWSet1Availability(newAvailability):
#     set.update_one({"name": "HWSet1"},
#         {"$set": {
#             "availability": newAvailability
#         }
#         })
#     return 1

# # return 0 if unsuccessful, 1 if successful
# def changeHWSet2Availability(newAvailability):
#     set.update_one({"name": "HWSet2"},
#         {"$set": {
#             "availability": newAvailability
#         }
#         })
#     return 1

# return 0 if unsuccessful, 1 if successful
def changeAvailability(hwsetname, newAvailability):
    record = set.find_one({"name": hwsetname})
    if record is None:
        return 0
    set.update_one({"name": hwsetname},
        {"$set": {
            "availability": newAvailability
        }
        })
    return 1