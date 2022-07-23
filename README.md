# Handwritten Digit Classifier

## Initial Idea: 
This project inspired by the [MNIST](http://yann.lecun.com/exdb/mnist/) handwritten digit dataset, that is usually used to train a neural network to predict a handwritten digit and currently i'm learning Web Development and Machine Learning, so i came up with an idea to combine both field by doing this project. 

How this web app will work is firstly, user draw in available 28 x 28 grid, then the grid data will be send to backend to be predicted (what number is written on the grid) by a neural network, but instead of training on available data, the model will be trained on a user generated data, the user that visited the website can draw and label their drawing, then send the data to the database, and hopefully as time goes on the model will be alot more accurate.

## Stack Used : 
1. React - Frontend 
2. Python / Flask - Backend 
3. Google Sheets - Database 

## Project Progress : 
1. Grid for Handwritting Number ✅
2. Backend Setup ✅
3. Neural Network Model ✅
4. Sending and Receiving Data Between Frontend and Backend ✅
5. Connecting to Database and Accept User Data ✅
6. Add leaderboard for user that add data to the dataset
7. Add data plot by each label ✅
8. Add more data to dataset 

## How to Run Project:
Install all dependencies and needed package
#### Frontend : 
```
    npm install
```
#### Backend : 
Navigate to the server directory using 
```
    cd server
```
Install module needed: flask, numpy, pandas, gspread, oauth2client
```
    pip install -r requirements.txt
```

#### Running Project :
After installing all dependecies and needed package, proceed to run the app, 
Run the react frontend  
```
    npm run
```
Run the flask backend
```
    flask run
```
the frontend will run on [http://localhost:3000](http://localhost:3000) and the backend will run on [http://localhost:3001](http://localhost:3001) 
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


Project by : Felix Fernando
