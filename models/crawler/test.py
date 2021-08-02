import pandas as pd
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
import time
import sklearn
from sklearn import svm

import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
# train Data


trainData = pd.read_csv(
    "./dreaddit.csv")

x = trainData['content']
y = trainData['label']

x_train, x_test, y_train, y_test = train_test_split(
    x, y, random_state=0)
# Create feature vectors
vectorizer = TfidfVectorizer(min_df=5,
                             max_df=0.8,
                             sublinear_tf=True,
                             use_idf=True)

train_vectors = vectorizer.fit_transform(x_train.values.astype('U'))
test_vectors = vectorizer.transform(x_test.values.astype('U'))

# Perform classification with SVM, kernel=linear

classifier_linear = svm.SVC(kernel='linear')
t0 = time.time()
classifier_linear.fit(train_vectors, y_train)
t1 = time.time()
prediction_linear = classifier_linear.predict(test_vectors)
t2 = time.time()
time_linear_train = t1-t0
time_linear_predict = t2-t1

cm = confusion_matrix(y_test, prediction_linear,
                      labels=classifier_linear.classes_)
disp = ConfusionMatrixDisplay(
    confusion_matrix=cm, display_labels=classifier_linear.classes_)
disp.plot()


plt.show()
# # results
# print("Training time: %fs; Prediction time: %fs" %
#       (time_linear_train, time_linear_predict))
# report = classification_report(
#     x_test['label'], prediction_linear, output_dict=True)
# print('depression: ', report['depression'])
# print('anxiety: ', report['anxiety'])
# print('autism: ', report['autism'])
# print('bipolar: ', report['bipolar'])
# print('none: ', report['none'])

# joblib.dump(classifier_linear, '../server/new_classifier.joblib')
# joblib.dump(vectorizer, '../server/new_vectorizer.joblib')

# while True:
#     review = input('Input your chat message: \n')
#     review_vector = vectorizer.transform([review])  # vectorizing
#     print(classifier_linear.predict(review_vector))
