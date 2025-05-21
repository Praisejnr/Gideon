from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend access (from other ports/domains)

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'Connection successful'})

if __name__ == '__main__':
    app.run(debug=True)