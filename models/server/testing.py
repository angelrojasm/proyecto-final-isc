import joblib
import csv
import time

classifier = joblib.load('./prob_classifier.joblib')
vectorizer = joblib.load('./prob_vectorizer.joblib')

test_lines = []
with open('../datasets/HEE.csv', mode='r', encoding="UTF-8") as infile:
    reader = csv.reader(infile)
    for row in reader:
        test_lines.append(row[1])

classes = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0}
THRESHOLD = 1/7

print(len(test_lines))
for post in test_lines:
    review_vector = vectorizer.transform([post])  # vectorizing
    prob_matrix_string = classifier.predict_proba(review_vector)[0]
    count = 0
    for review in prob_matrix_string:
        if(review >= THRESHOLD):
            count += 1
    classes[f"{count}"] += 1

multiClasses = classes["2"] + classes["3"] + \
    classes["4"] + classes["5"] + classes["6"] + classes["7"]
monoClasses = classes["1"]
print(f"MONO CLASSES: {monoClasses}\nMULTI CLASSES: {multiClasses}")
print("TWO CLASSES: " + str(classes["2"]))
print("THREE CLASSES: " + str(classes["3"]))
print("FOUR CLASSES: " + str(classes["4"]))
print("FIVE CLASSES: " + str(classes["5"]))
print("SIX CLASSES: " + str(classes["6"]))
print("SEVEN CLASSES: " + str(classes["7"]))
# print(f"\n ADHD: {format(prob_matrix_string[0], '.8f')}\n Anxiety: {format(prob_matrix_string[1], '.8f')} \n Autism: {format(prob_matrix_string[2], '.8f')}\n Bipolar: {format(prob_matrix_string[3], '.8f')}\n Depression: {format(prob_matrix_string[4], '.8f')}\n Eating: {format(prob_matrix_string[5], '.8f')}\n None: {format(prob_matrix_string[6], '.8f')}\n")
# time.sleep(5)
