from os import name
import joblib
import csv
import praw
import numpy as np
import time
classifier = joblib.load('./prob_classifier.joblib')
vectorizer = joblib.load('./prob_vectorizer.joblib')

client_id, client_secret, user_agent = 'KSzTSG5IaNHzWFIe4SJxXw', 'HMs5f4V9FAct1vSX1QUYWWV_u9D-dw', 'crawler'

reddit = praw.Reddit(client_id=client_id,
                     client_secret=client_secret, user_agent=user_agent)

user_data = {}
subreddit_users = {}
users = []
matched_users = []


def getUserSubreddits(user):
    curr_user = reddit.redditor(user)
    userSubreddits = []
    try:
        user_posts = list(curr_user.submissions.new(limit=None))
    except:
        return None
    for user_post in user_posts:
        if user_post.subreddit.display_name not in userSubreddits:
            userSubreddits.append(user_post.subreddit.display_name)

    return userSubreddits


with open('../datasets/experiment.csv', mode='r', encoding="UTF-8") as infile:
    reader = csv.reader(infile)
    for row in reader:
        user_data[row[0]] = row[1]
        users.append(row[0])

subreddit_string = 'AbuseInterrupted, help, depression, SuicideWatch, mentalhealth, ptsd, introvert, StopSelfHarm, SuicideBereavement, psychology, Anxiety, selfharm, alcoholicsanonymous, depression, depression_help, depressed, heartbreak, SuicideWatch, depressionregimens, relationship_advice, Petloss, MentalHealthSupport, NarcoticsAnonymous, PanicAttack, BingeEatingDisorder, stopdrinking, depression_help, lonely, selfimprovement, eatingdisorder, fuckeatingdisorders, heartbreak, autism, Advice, addiction, depression_memes, AnorexiaNervosa, Drugs, insomnia, HealthAnxiety, ADHD, deadpets, Stress, SelfHarmScars, TalkTherapy, offmychest, anorexiaflareuphelp, bipolar, depressed, therapy, alcoholism, Anxiety, Molested, socialanxiety'

subreddit_list = subreddit_string.split(', ')

subreddits_averages = {}

start = time.time()
for subreddit in subreddit_list:
    try:
        subreddit_posts = list(reddit.subreddit(subreddit).hot(limit=1000))
        posts_amount = len(subreddit_posts)
        subreddit_average = [0, 0, 0, 0, 0, 0, 0]
        for post in subreddit_posts:
            review_vector = vectorizer.transform(
                [post.selftext])  # vectorizing
            prob_matrix_string = classifier.predict_proba(review_vector)[0]
            for i in range(len(prob_matrix_string)):
                subreddit_average[i] += prob_matrix_string[i]
        for i in range(len(subreddit_average)):
            subreddit_average[i] = subreddit_average[i] / posts_amount
        subreddits_averages[subreddit] = subreddit_average
    except:
        continue

coorelations = {}

averages = list(subreddits_averages.items())
for i in range(len(averages)):
    for j in range(i, len(averages)):
        if(i != j):
            name = f"{averages[i][0]}-{averages[j][0]}"
            coor = np.corrcoef(
                np.array(averages[i][1]), np.array(averages[j][1]))
            coorelations[name] = coor

coorelation_results = list(coorelations.items())
for key, values in coorelation_results:
    for value in values:
        for val in value:
            if(val >= 0.7):
                sub_names = key.split('-')
                for user in users:
                    user_subreddits = getUserSubreddits(user)
                    if(user_subreddits != None):
                        if(sub_names[0] in user_subreddits and sub_names[1] in user_subreddits):
                            if(user not in matched_users):
                                matched_users.append(user)

end = time.time()

print(f"Total Users: {len(users)}\n")
print(f"Total Matched Users: {len(matched_users)}\n")
print(f"Percentage: {len(matched_users) / len(users)}\n")
print(f"Total Time Elapsed: {end - start}")
# for key, values in coorelation_results:
#     print(key)
#     print(values)
#     print('\n')
