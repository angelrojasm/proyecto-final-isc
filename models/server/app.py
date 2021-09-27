from flask import Flask
from flask import request
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import joblib


classifier = joblib.load('./classifier.joblib')
vectorizer = joblib.load('./vectorizer.joblib')

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict():
    request_data = request.get_json()
    vectorizedMessage = vectorizer.transform([request_data['message']])
    return classifier.predict(vectorizedMessage)[0]
