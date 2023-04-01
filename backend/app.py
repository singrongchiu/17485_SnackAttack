from flask_cors import CORS
from flask import Flask, jsonify, request
import os
import login
import projects
import database.hwsets as hwsets

import pymongo
import database.projects as projects

db = "mongodb+srv://test_user:Passw0rd@cluster0.c3m9ayf.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(db)
hardware = client.test.hardware

flask_app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(flask_app)

@flask_app.route("/hwset1cap", methods=["GET", "POST"])
def get_hwset1_cap():
    myquery = {"name": "HWSet1"}
    x = hardware.find_one(myquery)
    return jsonify({"capacity": x["capacity"]})

@flask_app.route("/gethwset1availability", methods=["GET", "POST"])
def get_hwset1_availability():
    myquery = {"name": "HWSet1"}
    x = hardware.find_one(myquery)
    return jsonify({"availability": x["availability"]})

@flask_app.route("/sethwset1availability/<current>/<new_amount>", methods=["GET", "POST"])
def set_hwset1_availability(current, new_amount):
    record = hardware.find_one({"availability": current})
    if record is None:
        return jsonify({})
    hardware.update_one(
        {"availability": current},
        {"$set": {
            "availability": new_amount
        }
        })
    return jsonify(hardware.find_one({"availability": new_amount}))

@flask_app.route("/hwset2cap", methods=["GET", "POST"])
def get_hwset2_cap():
    myquery = {"name": "HWSet2"}
    x = hardware.find_one(myquery)
    return jsonify({"capacity": x["capacity"]})

@flask_app.route("/gethwset2availability", methods=["GET", "POST"])
def get_hwset2_availability():
    myquery = {"name": "HWSet2"}
    x = hardware.find_one(myquery)
    return jsonify({"availability": x["availability"]})

@flask_app.route("/sethwset2availability/<current>/<new_amount>", methods=["GET", "POST"])
def set_hwset2_availability(current, new_amount):
    record = hardware.find_one({"availability": current})
    if record is None:
        return jsonify({})
    hardware.update_one(
        {"availability": current},
        {"$set": {
            "availability": new_amount
        }
        })
    return jsonify(hardware.find_one({"availability": new_amount}))

@flask_app.route("/createuser/<email>/<username>/<password>", methods=["GET", "POST"])
def create_user(email, username, password):
    if login.create_account(username, password, email):
        return jsonify({"username": username, "success":"Y", "message": username + " account created!"})
    else:
        return jsonify({"username": username, "success":"N", "message": username + " account not created."})


@flask_app.route("/login/<username>/<password>", methods=["GET", "POST"])
def login_user(username, password):
    if login.login(username, password) == 1:
        return jsonify({"username": username, "success":"Y", "message": "Successful Login!"})
    else:
        return jsonify({"username": username, "success":"N", "message": "Unsuccessful Login"})
    
@flask_app.route("/createproject/<name>/<projectid>/<description>", methods=["GET", "POST"])
def create_project(name, projectid, description):
    success = projects.create_project(name, projectid, description)
    if (success == 1):
        return jsonify({"projectid": projectid, "success":"Y", "message": "Project created " + str(projectid)})
    else: 
        return jsonify({"projectid": projectid, "success":"N", "message": "Invalid Project ID " + str(projectid)})

@flask_app.route("/projectlogin/<projectid>", methods=["GET", "POST"])
def project_login(projectid):
    success = projects.login(projectid)
    if (success == 1):
        return jsonify({"projectid": projectid, "success":"Y", "message": "Valid Project ID " + str(projectid)})
    else: 
        return jsonify({"projectid": projectid, "success":"N", "message": "Invalid Project ID " + str(projectid)})

@flask_app.route("/queryhwset/<hwsetid>", methods=["GET", "POST"])
def query_hwset(hwsetid):
    hwset = hwsets.queryHWSet("hwsetid")
    if (hwset == None):
        return jsonify({"success": "N", "hwsetid": hwsetid, "message": "HWset ID "+ hwsetid + " not found"})
    return jsonify({"success":"Y", "hwsetid": hwsetid, "availability":hwset["availability"]})

# NOTE: need to add /<projectid>/ to be able to check out
@flask_app.route("/checkout/<hwsetid>/<qty>", methods=["GET", "POST"])
def checkOut_hardware(hwsetid, qty):
    return jsonify({"id": hwsetid, 'count': qty})

@flask_app.route("/checkin/<hwsetid>/<qty>", methods=["GET", "POST"])
def checkIn_hardware(hwsetid, qty):
    return jsonify({"id": hwsetid, 'count': qty})

@flask_app.route("/joinproject/<projectid>", methods=["GET", "POST"])
def joinProject(projectid):
    return jsonify({"id": projectid})

@flask_app.route("/leaveproject/<projectid>", methods=["GET", "POST"])
def leaveProject(projectid):
    return jsonify({"id": projectid})

if __name__ == "__main__":
    flask_app.run(host='0.0.0.0', debug=False, port=os.environ.get("PORT", 80))

