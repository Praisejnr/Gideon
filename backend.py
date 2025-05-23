from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend access (from other ports/domains)

@app.route('/receive', methods=['POST'])
def receive_data():
    data = request.get_json()
    transcript = data.get("transcript", "").lower()
    message = transcript_functions(transcript);
    return jsonify({'message': message })
    
 #functioms performed by the transcripts request
def transcript_functions(transcript):
     if "gideon" in transcript or "hi" in transcript:
         return greeting(transcript)
     elif "time" in transcript:
         return get_time(transcript)
     elif "bye" in transcript:
         return farewell(transcript)
     else:
         return "I dont understand what you said"


#functions
def greeting(transcript):
    return "Hello boss, how are you doing"    
def get_time(transcript):
        from datetime import datetime
        now = datetime.now().strftime("%H: %M")
        return f"The time is {now}"
        
def farewell(transcript):
        return "Bye sir"


if __name__ == '__main__':
    app.run(debug=True)