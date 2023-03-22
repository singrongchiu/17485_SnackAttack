from flask_cors import CORS
from flask import Flask, jsonify, request
import os

flask_app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(flask_app)

@flask_app.route("/checkout", methods=["GET", "POST"])
def set_checkout():
    args = request.get_json(force=True)
    count = args["total"]
    return jsonify({'count': count})


if __name__ == "__main__":
    flask_app.run(host='0.0.0.0', debug=False, port=os.environ.get("PORT", 80))

