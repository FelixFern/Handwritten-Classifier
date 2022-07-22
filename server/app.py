from flask import Flask, jsonify, request

import gspread
from oauth2client.service_account import ServiceAccountCredentials

from model import predict_digit

# Google Sheets Connect
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name('creds.json', scope)
client = gspread.authorize(creds)
sheet = client.open("Handwritten-Dataset").sheet1

# Flask App
app = Flask(__name__)

@app.route('/predict', methods=["GET","POST"])
def predict():
    if request.method == "GET":
        return "Getting Data"
    if request.method == "POST":
        req = request.get_json()
        result = predict_digit(req["grid"])
        predicted = {'result': int(result)}
        return jsonify(predicted)

@app.route('/add', methods=["POST"])
def addGrid():
    if request.method == "GET":
        return "Getting Data"
    if request.method == "POST":
        req = request.get_json()
        row = [req["grid"], req["label"], req["prediction"]]
        sheet.insert_row(row, 2)
        return jsonify(req)

if __name__ == "__main__":
    app.run(debug=True, port=3001)