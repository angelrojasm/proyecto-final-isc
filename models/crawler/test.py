import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import time
import sklearn
from sklearn import svm
from sklearn.metrics import classification_report
import joblib
from sklearn.model_selection import train_test_split
# train Data

print('loading train data...')
trainData = pd.read_csv(
    "../datasets/new_dataset2.csv")
print(trainData)

x_train, x_test = train_test_split(trainData, test_size=0.33, random_state=42)

print(x_train.sample(frac=1).head(5))  # shuffle the df and pick first 5

# Create feature vectors
print('creating feature vectors...')
vectorizer = TfidfVectorizer(min_df=5,
                             max_df=0.8,
                             sublinear_tf=True,
                             use_idf=True)
train_vectors = vectorizer.fit_transform(x_train['content'].values.astype('U'))
test_vectors = vectorizer.transform(x_test['content'].values.astype('U'))

# Perform classification with SVM, kernel=linear

print('performing classification with Linear SVM...')
classifier_linear = svm.SVC(kernel='linear')
t0 = time.time()
classifier_linear.fit(train_vectors, x_train['label'])
t1 = time.time()
prediction_linear = classifier_linear.predict(test_vectors)
t2 = time.time()
time_linear_train = t1-t0
time_linear_predict = t2-t1

# results
print("Training time: %fs; Prediction time: %fs" %
      (time_linear_train, time_linear_predict))
report = classification_report(
    x_test['label'], prediction_linear, output_dict=True)
print('depression: ', report['depression'])
print('anxiety: ', report['anxiety'])
print('autism: ', report['autism'])
print('bipolar: ', report['bipolar'])
print('none: ', report['none'])

joblib.dump(classifier_linear, '../server/new_classifier.joblib')
joblib.dump(vectorizer, '../server/new_vectorizer.joblib')

while True:
    review = input('Input your chat message: \n')
    review_vector = vectorizer.transform([review])  # vectorizing
    print(classifier_linear.predict(review_vector))
