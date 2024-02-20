from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from firebase_admin import credentials, firestore, initialize_app

app = Flask(__name__)
CORS(app)

# Initialize Firestore DB
cred = credentials.Certificate(r"C:\Users\ghana\Downloads\biometric-9f4d9-firebase-adminsdk-zfeco-995983529d.json")
default_app = initialize_app(cred)
db = firestore.client()
users_ref = db.collection('users')

# Specify allowed origins using the cross_origin decorator
@app.route('/register', methods=['POST'])
@cross_origin(origin='http://192.168.1.7:8081')
  # Replace with the IP address of your development machine
def register():
    username = request.form['username']
    position = request.form['position']
    email = request.form['email']

    user = {
        'username': username,
        'position': position,
        'email': email
    }

    users_ref.add(user)

    print('Received registration data from frontend:', user)
    return jsonify({'message': 'User created successfully'}), 200

if __name__ == '__main__':
    print('Flask server running...')
    app.run(debug=True, host='0.0.0.0')  # Set host to '0.0.0.0' to make the server accessible externally
