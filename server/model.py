import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd
import numpy as np

# Google Sheets Connect
def predict_digit(data):
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_name('creds.json', scope)
    client = gspread.authorize(creds)
    sheet = client.open("Handwritten-Dataset").sheet1

    # adding training data
    training_data = pd.read_csv('mnist_test.csv')
    training_data = np.array(training_data)
    m, n = training_data.shape

    data_train = training_data.T
    mnist_y_train = data_train[0]
    mnist_x_train = data_train[1:n]
    mnist_x_train = mnist_x_train / 255
    _,m_train = mnist_x_train.shape

    df = pd.DataFrame(sheet.get_all_values())
    df.columns = df.iloc[0]
    df = df[1:]

    x_data = []
    y_data = df["label"]
    for i in df.index: 
        df.at[i, "grid"] = df.at[i, "grid"].split(',')

    for i in df.index:
        x_data.append(df.at[i,"grid"])

    x_data = np.asarray(x_data)
    y_data = np.asarray(y_data)

    x_data = x_data.astype('int32').T
    x_data = x_data / 255
    y_data = y_data.astype('int32')

    m, n = x_data.shape
    
    x_train = np.concatenate((mnist_x_train.T, x_data.T)).T
    Y_train = np.concatenate((mnist_y_train.T, y_data.T)).T
    
    # Function 
    def init_params():
        W1 = np.random.rand(10, 784) - 0.5
        b1 = np.random.rand(10, 1) - 0.5
        W2 = np.random.rand(10, 10) - 0.5
        b2 = np.random.rand(10, 1) - 0.5
        return W1, b1, W2, b2

    def ReLU(Z):
        return np.maximum(Z, 0)

    def softmax(Z):
        A = np.exp(Z) / sum(np.exp(Z))
        return A
        
    def forward_prop(W1, b1, W2, b2, X):
        Z1 = W1.dot(X) + b1
        A1 = ReLU(Z1)
        Z2 = W2.dot(A1) + b2
        A2 = softmax(Z2)
        return Z1, A1, Z2, A2

    def ReLU_deriv(Z):
        return Z > 0

    def one_hot(Y):
        one_hot_Y = np.zeros((Y.size, Y.max() + 1))
        one_hot_Y[np.arange(Y.size), Y] = 1
        one_hot_Y = one_hot_Y.T
        return one_hot_Y

    def backward_prop(Z1, A1, Z2, A2, W1, W2, X, Y):
        one_hot_Y = one_hot(Y)
        dZ2 = A2 - one_hot_Y
        dW2 = 1 / m * dZ2.dot(A1.T)
        db2 = 1 / m * np.sum(dZ2)
        dZ1 = W2.T.dot(dZ2) * ReLU_deriv(Z1)
        dW1 = 1 / m * dZ1.dot(X.T)
        db1 = 1 / m * np.sum(dZ1)
        return dW1, db1, dW2, db2

    def update_params(W1, b1, W2, b2, dW1, db1, dW2, db2, alpha):
        W1 = W1 - alpha * dW1
        b1 = b1 - alpha * db1    
        W2 = W2 - alpha * dW2  
        b2 = b2 - alpha * db2    
        return W1, b1, W2, b2

    def get_predictions(A2):
        return np.argmax(A2, 0)

    def get_accuracy(predictions, Y):
        print(predictions, Y)
        return np.sum(predictions == Y) / Y.size

    def gradient_descent(X, Y, alpha, iterations):
        W1, b1, W2, b2 = init_params()
        for i in range(iterations):
            Z1, A1, Z2, A2 = forward_prop(W1, b1, W2, b2, X)
            dW1, db1, dW2, db2 = backward_prop(Z1, A1, Z2, A2, W1, W2, X, Y)
            W1, b1, W2, b2 = update_params(W1, b1, W2, b2, dW1, db1, dW2, db2, alpha)
            if i % 10 == 0:
                # print("Iteration: ", i)
                predictions = get_predictions(A2)
                # print(get_accuracy(predictions, Y))
        return W1, b1, W2, b2

    W1, b1, W2, b2 = gradient_descent(x_train, Y_train, 0.20, 250)

    # Prediction
    def make_predictions(X, W1, b1, W2, b2):
        _, _, _, A2 = forward_prop(W1, b1, W2, b2, X)
        predictions = get_predictions(A2)
        return predictions

    data_grid = np.array(data, dtype='int32').reshape(-1,1)
    result = make_predictions(data_grid, W1, b1, W2, b2)
    
    print(result[0])
    return result[0]
