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
    data = request.json
    print('Received data:', data)  # Add this line for debugging
    
    if data is None:
        return jsonify({'error': 'No JSON data provided'}), 400

    username = data.get('username')
    position = data.get('position')
    email = data.get('email')

    if not username or not position or not email:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if username already exists
    existing_user = users_ref.where('username', '==', username).get()
    if not existing_user:
        # Add new user to Firestore
        user = {
            'username': username,
            'position': position,
            'email': email
        }
        users_ref.add(user)
        print('New user added to Firestore:', user)
        return jsonify({'message': 'User created successfully'}), 200
    else:
        return jsonify({'error': 'Username already exists'}), 400

if __name__ == '__main__':
    print('Flask server running...')
    app.run(debug=True, host='192.168.1.7')  
