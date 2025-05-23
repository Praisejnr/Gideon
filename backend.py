from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend access (from other ports/domains)

@app.route('/receive', methods=['POST'])
def receive_data():
    data = request.get_json()
    transcript= data.get("transcript")
    print("Recieved from frontend:", transcript)
    return jsonify({'message': transcript })

if __name__ == '__main__':
    app.run(debug=True)