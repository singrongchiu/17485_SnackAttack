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
projects_db = client.test.projects

flask_app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(flask_app)

@flask_app.route("/projectdescription/<projectid>", methods=["GET", "POST"])
def get_project_description(projectid):
    myquery = {"id": projectid}
    x = projects_db.find_one(myquery)
    return jsonify({"description": x["description"]})

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

@flask_app.route("/newproject/<name>/<projectid>/<description>", methods=["GET", "POST"])
def create_project(name, projectid, description):
    success = projects.create_new_project(name, projectid, description)
    if (success == 1):
        return jsonify({"projectid": projectid, "success":"Y", "message": "Project created " + str(projectid)})
    else: 
        return jsonify({"projectid": projectid, "success":"N", "message": "Invalid Project ID " + str(projectid)})

@flask_app.route("/projlogin/<projectid>", methods=["GET", "POST"])
def project_login(projectid):
    success = projects.project_sign_in(projectid)
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
@flask_app.route("/checkout/<projectid>/<hwsetid>/<qty>", methods=["GET", "POST"])
def checkOut_hardware(projectid, hwsetid, qty):
    success = projects.project_check_out(projectid, hwsetid, qty)
    availability = hwsets.queryHWSet(hwsetid)["availability"]
    checkedout = projects.query_project(projectid)["checkedout"][hwsetid]
    if success == 1:
        return jsonify({"id": hwsetid, 'availability': availability, "checkedout": checkedout, 
            "message": "Successfully checked out " + qty + " from " + hwsetid})
    if success == -1:
        return jsonify({"id": hwsetid, 'availability': availability, "checkedout": checkedout, 
            "message": "Incorrect Input"})
    else: 
        return jsonify({"id": hwsetid, 'availability': availability, "checkedout": checkedout, 
            "message": "HWSet does not have enough availability"})
    
@flask_app.route("/checkin/<projectid>/<hwsetid>/<qty>", methods=["GET", "POST"])
def checkIn_hardware(projectid, hwsetid, qty):
    success = projects.project_check_in(projectid, hwsetid, qty)
    availability = hwsets.queryHWSet(hwsetid)["availability"]
    checkedout = projects.query_project(projectid)["checkedout"][hwsetid]
    if success == 1:
        return jsonify({"id": hwsetid, 'availability': availability, "checkedout": checkedout, 
            "message": "Successfully checked in " + qty + " from " + hwsetid})
    if success == -1:
        return jsonify({"id": hwsetid, 'availability': availability, "checkedout": checkedout, 
            "message": "Incorrect Input"})
    else: 
        return jsonify({"id": hwsetid, 'availability': availability, "checkedout": checkedout, 
            "message": "Can't check in amount " + qty + " from " + projectid})

@flask_app.route("/getcheckedout/<projectid>", methods=["GET", "POST"])
def get_checkedout(projectid):
    x = projects.query_project(projectid)
    
    return jsonify({"HWSet1": x["checkedout"]["HWSet1"], "HWSet2": x["checkedout"]["HWSet2"]})

@flask_app.route("/joinproject/<projectid>", methods=["GET", "POST"])
def joinProject(projectid):
    return jsonify({"id": projectid})

@flask_app.route("/leaveproject/<projectid>", methods=["GET", "POST"])
def leaveProject(projectid):
    return jsonify({"id": projectid})

if __name__ == "__main__":
    flask_app.run(host='0.0.0.0', debug=False, port=os.environ.get("PORT", 80))

