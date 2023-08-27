from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Aktiviere CORS für die gesamte App

@app.route('/right', methods=['POST'])
def right_endpoint():
    data = request.json
    speed = data.get('speed', 0)
    print(f"Received speed: {speed}")
    return "Received speed value"

@app.route('/left', methods=['POST'])
def left_endpoint():
    data = request.json
    speed = data.get('speed', 0)
    print(f"Received speed: {speed}")
    return "Received speed value"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
