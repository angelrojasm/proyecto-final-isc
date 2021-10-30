from flask import Flask, request, Response
import joblib
import json

classifier = joblib.load('./prob_classifier.joblib')
vectorizer = joblib.load('./prob_vectorizer.joblib')

app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict():
    request_data = request.get_json()
    vectorizedMessage = vectorizer.transform([request_data['message']])
    dist = list(classifier.predict_proba(vectorizedMessage)[0])
    return Response(json.dumps(dist), mimetype='application/json')
