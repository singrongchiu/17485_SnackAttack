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

def queryHWSet(id):
    myquery = {"id": id}
    hwset = set.find_one(myquery)
    return (hwset['availability'], hwset['capacity'])

# return 0 if unsuccessful, 1 if successful
def initializeHWSet(id, capacity, availability):
    exists = set.find_one({"id": id})
    if exists is not None:
        print("id", id, "already exists")
        return 0
    
    hwsetDocument = {
        "name": "HWSet" + str(id),
        "id": id, 
        "capacity": capacity,
        "availability": availability}
    set.insert_one(hwsetDocument)
    return 1

# return 0 if unsuccessful, 1 if successful
def changeHWSet1Availability(newCapacity):
    set.update_one({"name": "HWSet1"},
        {"$set": {
            "capacity": newCapacity
        }
        })
    return 1

# return 0 if unsuccessful, 1 if successful
def changeHWSet2Availability(newCapacity):
    set.update_one({"name": "HWSet2"},
        {"$set": {
            "capacity": newCapacity
        }
        })
    return 1

# return 0 if unsuccessful, 1 if successful
def changeCapacity(id, newCapacity):
    record = set.find_one({"id": id})
    if record is None: 
        return 0
    set.update_one({"id": id},
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
def changeAvailability(id, newAvailability):
    record = set.find_one({"id": id})
    if record is None: 
        return 0
    set.update_one({"id": id},
        {"$set": {
            "availability": newAvailability
        }
        })
    return 1