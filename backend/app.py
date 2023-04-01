from flask_cors import CORS
from flask import Flask, jsonify, request
import os
import login
import projects

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
    print(x["capacity"])
    return jsonify({"capacity": x["capacity"]})

@flask_app.route("/hwset2cap", methods=["GET", "POST"])
def get_hwset2_cap():
    myquery = {"name": "HWSet2"}
    x = hardware.find_one(myquery)
    print(x["capacity"])
    return jsonify({"capacity": x["capacity"]})

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

