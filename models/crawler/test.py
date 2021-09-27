import pandas as pd
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
import time
from sklearn import svm
from sklearn.metrics import classification_report
from sklearn.metrics import recall_score
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
# train Data


trainData = pd.read_csv(
    "../datasets/filtered.csv")

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

classifier_linear = svm.SVC(kernel='linear', probability=True)
t0 = time.time()
classifier_linear.fit(train_vectors, y_train)
t1 = time.time()
prediction_linear = classifier_linear.predict(test_vectors)
t2 = time.time()
time_linear_train = t1-t0
time_linear_predict = t2-t1


# # results
print("Training time: %fs; Prediction time: %fs" %
      (time_linear_train, time_linear_predict))

joblib.dump(classifier_linear, '../server/prob_classifier.joblib')
joblib.dump(vectorizer, '../server/prob_vectorizer.joblib')
# print(classification_report(
#     y_test, prediction_linear, output_dict=True))


# cm = confusion_matrix(y_test, prediction_linear,
#                       labels=classifier_linear.classes_)
# disp = ConfusionMatrixDisplay(
#     confusion_matrix=cm, display_labels=classifier_linear.classes_)
# disp.plot()


# plt.show()


while True:
    review = input('Input your chat message: \n')
    review_vector = vectorizer.transform([review])  # vectorizing
    prob_matrix_string = classifier_linear.predict_proba(review_vector)[0]
    probabilities = prob_matrix_string.split(" ", 1)
    print(f"ADHD: {format(probabilities[0], '.8f')}\n Anxiety: {format(probabilities[1], '.8f')} \n Autism: {format(probabilities[2], '.8f')}\n Bipolar: {format(probabilities[3], '.8f')}\n Depression: {format(probabilities[4], '.8f')}\n Eating: {format(probabilities[5], '.8f')}\n None: {format(probabilities[6], '.8f')}")
