import joblib
import csv
import praw
import numpy as np
import time
import ast
import random

start = time.time()
classifier = joblib.load('./prob_classifier.joblib')
vectorizer = joblib.load('./prob_vectorizer.joblib')

client_id, client_secret, user_agent = 'KSzTSG5IaNHzWFIe4SJxXw', 'HMs5f4V9FAct1vSX1QUYWWV_u9D-dw', 'crawler'

reddit = praw.Reddit(client_id=client_id,
                     client_secret=client_secret, user_agent=user_agent)

user_data = {}
subreddit_users = {}
users = []
matched_users = []
subreddit_string = 'help, depression, SuicideWatch, mentalhealth, ptsd, introvert, StopSelfHarm, SuicideBereavement, psychology, Anxiety, selfharm, alcoholicsanonymous, depressed, heartbreak, depressionregimens, relationship_advice, Petloss, MentalHealthSupport, NarcoticsAnonymous, PanicAttack, BingeEatingDisorder, stopdrinking, depression_help, lonely, selfimprovement, eatingdisorder, fuckeatingdisorders, heartbreak, autism, Advice, addiction, depression_memes, AnorexiaNervosa, insomnia, HealthAnxiety, ADHD, deadpets, Stress, SelfHarmScars, TalkTherapy, offmychest, anorexiaflareuphelp, bipolar, therapy, alcoholism, Molested, socialanxiety'

removed_users = 'helloiminsaneBRO69,mrezar'
repeated = []
subreddit_list = subreddit_string.split(', ')
recommended_groups = []
user_sample_posts = []

positive_subreddits = 'depression, SuicideWatch, mentalhealth, ptsd, SuicideBereavement, Anxiety, depression_help, depressed, depressionregimens, relationship_advice, MentalHealthSupport, PanicAttack, BingeEatingDisorder, eatingdisorder, fuckeatingdisorders, AnorexiaNervosa, insomnia, HealthAnxiety, ADHD, TalkTherapy, offmychest, bipolar, therapy, Molested, socialanxiety'
positive_subreddit_list = positive_subreddits.split(', ')
subreddits_averages = {}

with open('../datasets/experiment.csv', mode='r', encoding="UTF-8") as infile:
    reader = csv.reader(infile)
    for row in reader:
        user_data[row[0]] = row[1]
        if(len(users) < 3 and row[0] not in removed_users):
            users.append(row[0])


def getUserSubreddits(user):
    curr_user = reddit.redditor(user)
    userSubreddits = []
    try:
        user_posts = list(curr_user.submissions.new(limit=None))
    except:
        return None
    for user_post in user_posts:
        if user_post.subreddit.display_name not in userSubreddits and user_post.subreddit.display_name in positive_subreddit_list:
            userSubreddits.append(user_post.subreddit.display_name)

    return userSubreddits


def getNotJoinedSubreddits(user_subreddits):
    return list(set(subreddit_list) - set(user_subreddits))


def getGroupDistribution(subreddit):
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
        return subreddit_average
    except:
        return None


def addSamplePosts(sub):
    temp = []
    subreddit_posts = list(reddit.subreddit(sub).hot(limit=10))
    for post in subreddit_posts:
        temp.append(post.selftext)
    recommended_groups.append([sub, temp])


def getUserDistribution(user):
    curr_user = reddit.redditor(user)
    posts_average = [0, 0, 0, 0, 0, 0, 0]
    mh_posts = []
    post_texts = []
    try:
        user_posts = list(curr_user.submissions.new(limit=None))
        for post in user_posts:
            if(post.subreddit.display_name in positive_subreddit_list and post.subreddit.display_name not in mh_posts):
                mh_posts.append(post)
                post_texts.append(post.selftext)
        posts_amount = len(mh_posts)

        user_sample_posts.append([user, random.sample(post_texts, 10)])
        print(f"Total User Posts -> {posts_amount}\n")
        for post in mh_posts:
            review_vector = vectorizer.transform(
                [post.selftext])  # vectorizing
            prob_matrix_string = classifier.predict_proba(review_vector)[0]
            for i in range(len(prob_matrix_string)):
                posts_average[i] += prob_matrix_string[i]
        for i in range(len(posts_average)):
            posts_average[i] = posts_average[i] / posts_amount
        return posts_average
    except:
        return None


def findCoorelatedRecommendation(subreddit, dist, user_subreddits, user_distribution):
    for sub in positive_subreddit_list:
        if(sub not in user_subreddits):
            if(sub != subreddit):
                print(f"{subreddit}-{sub}: \n")
                print(f"{subreddit} distribution -> {dists[subreddit]}\n")
                print(f"{sub} distribution -> {dists[sub]}\n")
                coor = np.corrcoef(dist, dists[sub])[1, 0]
                if(coor < 0.7):
                    print(f"Low Correlation -> {coor}\n")
                else:
                    print(f"Found High Correlation -> {coor}\n")
                    user_group_coorelation = np.corrcoef(
                        user_distribution, dists[sub])[1, 0]
                    print(
                        f"User-Group Correlation -> {user_group_coorelation}\n")
                    if(user_group_coorelation >= 0.7):
                        print(f"Recommending User Group -> {sub}\n")
                        addSamplePosts(subreddit)
                        addSamplePosts(sub)
                        return True
    return False


# START
dists = {}
with open('../datasets/test_distributions.csv', mode='r', encoding="UTF-8") as infile:
    reader = csv.reader(infile)
    for row in reader:
        dists[row[0]] = ast.literal_eval(row[1])
for user in users:
    print(f"User -> {user}\n")
    user_subreddits = getUserSubreddits(user)
    user_distribution = getUserDistribution(user)
    subreddit = ''
    for sub in user_subreddits:
        if sub in positive_subreddit_list and sub not in repeated:
            subreddit = sub
            repeated.append(sub)
            break

    user_sub_distribution = dists[subreddit]
    print(f"User Subreddits -> {user_subreddits}\n")
    print(f"Chosen Subreddit -> \n{subreddit}\n")
    print(f"Subreddit distribution -> {user_sub_distribution}\n")
    print(f"User Posts Distribution -> {user_distribution}\n")

    possible_recommendation = findCoorelatedRecommendation(
        subreddit, user_sub_distribution, user_subreddits, user_distribution)
    if(possible_recommendation == False):
        print("No Possible Recommendations found within the available subreddits\n")

with open('../datasets/data', 'w', encoding='UTF8') as f:
    # create the csv writer
    writer = csv.writer(f)
    writer.writerow("\nPRINTING USER SAMPLE POSTS\n")
    for entry in user_sample_posts:
        writer.writerow(f"User -> {entry[0]}\n")
        for post in entry[1]:
            writer.writerow("--------------------------------------------\n")
            writer.writerow(f"{post}\n")
            writer.writerow("--------------------------------------------\n")

    writer.writerow("\nPRINTING GROUP SAMPLE POSTS\n")
    for entry in recommended_groups:
        writer.writerow(f"Group -> {entry[0]}\n")
        for post in entry[1]:
            writer.writerow("--------------------------------------------\n")
            writer.writerow(f"{post}\n")
            writer.writerow("--------------------------------------------\n")
end = time.time()
print(f'elapsed time: {end - start}s')
# END
