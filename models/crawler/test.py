import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import time
import sklearn
from sklearn import svm
from sklearn.metrics import classification_report
import joblib

# train Data

print('loading train data...')
trainData = pd.read_csv(
    "train.csv")
# test Data

print('loading test data...')
testData = pd.read_csv(
    "test.csv")


print(trainData.sample(frac=1).head(5))  # shuffle the df and pick first 5

# Create feature vectors
print('creating feature vectors...')
vectorizer = TfidfVectorizer(min_df=5,
                             max_df=0.8,
                             sublinear_tf=True,
                             use_idf=True)
train_vectors = vectorizer.fit_transform(trainData['Content'])
test_vectors = vectorizer.transform(testData['Content'])

# Perform classification with SVM, kernel=linear

print('performing classification with Linear SVM...')
classifier_linear = svm.SVC(kernel='linear')
t0 = time.time()
classifier_linear.fit(train_vectors, trainData['Label'])
t1 = time.time()
prediction_linear = classifier_linear.predict(test_vectors)
t2 = time.time()
time_linear_train = t1-t0
time_linear_predict = t2-t1

# results
print("Training time: %fs; Prediction time: %fs" %
      (time_linear_train, time_linear_predict))
report = classification_report(
    testData['Label'], prediction_linear, output_dict=True)
print('stress: ', report['stress'])
print('anxiety: ', report['anxiety'])
print('ptsd: ', report['ptsd'])

joblib.dump(classifier_linear, '../server/classifier.joblib')
joblib.dump(vectorizer, '../server/vectorizer.joblib')
