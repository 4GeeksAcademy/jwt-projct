"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, create_access_token
import hashlib


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.json
    body_email = body('email')
    body_password = hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    user = User(email=body_email, password=body_password)
    
    db.session.add(user)
    db.session.commit()

    return jsonify({ "msg": "User created successfully", "user_id": user.id  }), 200


@api.route('/login', methods=['POST'])
def handle_login():
    body = request.json
    body_email = body.get('email')
    body_password = hashlib.sha256(body['password'].encode("utf-8")).hexdigest()

    user = User.query.filter_by(email=body_email).first()

    if user and user.password == body_password:
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token = access_token), 200
    else:
        return jsonify("User not found"), 400


@api.route('/private', methods=['POST', 'GET'])
@jwt_required()
def handle_private():
    current_user_id = get_jwt_identity()
    return jsonify({ "msg": f"You are logged in as user {current_user_id}" }), 200


