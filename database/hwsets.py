import pymongo

db = "mongodb+srv://test_user:Passw0rd@cluster0.c3m9ayf.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(db)
set = client.test.hardware

# get availability and capacity
def queryHWSet1():
    myquery = {"name:": 'HWSet1'}
    hwset = set.find_one(myquery)
    return (hwset['availability'], hwset['capacity'])

def queryHWSet2():
    myquery = {"name:": 'HWSet2'}
    hwset = set.find_one(myquery)
    return (hwset['availability'], hwset['capacity'])

# return 0 if unsuccessful, 1 if successful
def initializeHWSetWithName(hwsetname, capacity, availability):
    exists = set.find_one({"name": "HWSet1"})
    if exists is not None:
        print("Hwset name", hwsetname, "already exists")
        return 0

    hwsetDocument = {
        "name": "HWSet" + str(id),
        "id": id,
        "capacity": capacity,
        "availability": availability}
    set.insert_one(hwsetDocument)
    return 1

# return 0 if unsuccessful, 1 if successful
def changeHWSet1Capacity(newCapacity):
    set.update_one({"name": "HWSet1"},
        {"$set": {
            "capacity": newCapacity
        }
        })
    return 1

# return 0 if unsuccessful, 1 if successful
def changeHWSet2Capacity(newCapacity):
    set.update_one({"name": "HWSet2"},
        {"$set": {
            "capacity": newCapacity
        }
        })
    return 1

# return 0 if unsuccessful, 1 if successful
def changeCapacityWithName(hwsetname, newCapacity):
    record = set.find_one({"name": hwsetname})
    if record is None:
        return 0
    set.update_one({"name": hwsetname},
        {"$set": {
            "capacity": newCapacity
        }
        })
    return 1

# return 0 if unsuccessful, 1 if successful
def changeHWSet1Availability(newAvailability):
    set.update_one({"name": "HWSet1"},
        {"$set": {
            "availability": newAvailability
        }
        })
    return 1

# return 0 if unsuccessful, 1 if successful
def changeHWSet2Availability(newAvailability):
    set.update_one({"name": "HWSet2"},
        {"$set": {
            "availability": newAvailability
        }
        })
    return 1

# return 0 if unsuccessful, 1 if successful
def changeAvailabilityWithName(hwsetname, newAvailability):
    record = set.find_one({"name": hwsetname})
    if record is None:
        return 0
    set.update_one({"name": hwsetname},
        {"$set": {
            "availability": newAvailability
        }
        })
    return 1