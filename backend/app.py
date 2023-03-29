from flask_cors import CORS
from flask import Flask, jsonify, request
import os
import login

flask_app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(flask_app)

@flask_app.route("/login/<username>/<password>", methods=["GET", "POST"])
def login_user(username, password):
    if login.login(username, password) == 1:
        return jsonify({"username": username, "success":"Y", "message": "Successful Login!"})
    else:
        return jsonify({"username": username, "success":"N", "message": "Unsuccessful Login"})

@flask_app.route("/checkout/<projectid>/<qty>", methods=["GET", "POST"])
def checkOut_hardware(projectid, qty):
    return jsonify({"id": projectid, 'count': qty})

@flask_app.route("/checkin/<projectid>/<qty>", methods=["GET", "POST"])
def checkIn_hardware(projectid, qty):
    return jsonify({"id": projectid, 'count': qty})

@flask_app.route("/joinproject/<projectid>", methods=["GET", "POST"])
def joinProject(projectid):
    return jsonify({"id": projectid})

@flask_app.route("/leaveproject/<projectid>", methods=["GET", "POST"])
def leaveProject(projectid):
    return jsonify({"id": projectid})

if __name__ == "__main__":
    flask_app.run(host='0.0.0.0', debug=False, port=os.environ.get("PORT", 80))

