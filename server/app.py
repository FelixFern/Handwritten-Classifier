from flask import Flask, jsonify, request

app = Flask(__name__)

data = {"data": [
    
]}
@app.route('/predict', methods=["GET","POST"])
def predict():
    if request.method == "GET":
        return data
    if request.method == "POST":
        data["data"].append(request.json)
        return jsonify(request.json["grid"])


if __name__ == "__main__":
    app.run(debug=True, port=3001)