import joblib


classifier = joblib.load('./prob_classifier.joblib')
vectorizer = joblib.load('./prob_vectorizer.joblib')

while True:
    review = input('Input your chat message: \n')
    review_vector = vectorizer.transform([review])  # vectorizing
    prob_matrix_string = classifier.predict_proba(review_vector)[0]
    print(f"\n ADHD: {format(prob_matrix_string[0], '.8f')}\n Anxiety: {format(prob_matrix_string[1], '.8f')} \n Autism: {format(prob_matrix_string[2], '.8f')}\n Bipolar: {format(prob_matrix_string[3], '.8f')}\n Depression: {format(prob_matrix_string[4], '.8f')}\n Eating: {format(prob_matrix_string[5], '.8f')}\n None: {format(prob_matrix_string[6], '.8f')}\n")
