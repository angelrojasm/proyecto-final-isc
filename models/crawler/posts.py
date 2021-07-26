# 1. Setup
import praw
import time
import csv
diagnosed_users = {}
control_users = {}
posts = {}
client_id, client_secret, user_agent = 'KSzTSG5IaNHzWFIe4SJxXw', 'HMs5f4V9FAct1vSX1QUYWWV_u9D-dw', 'crawler'


def readFile(fileName):
    fileObj = open(fileName, "r")  # opens the file in read mode
    words = fileObj.read().splitlines()  # puts the file into an array
    fileObj.close()
    return words


mh_subreddits = readFile("./mh_subreddits.txt")

with open('../datasets/diagnosed_users.csv', mode='r') as infile:
    reader = csv.reader(infile)
    for row in reader:
        if len(row) > 1:
            diagnosed_users[row[0]] = row[1]

with open('../datasets/control_users.csv', mode='r') as infile:
    reader = csv.reader(infile)
    for row in reader:
        if len(row) > 1:
            control_users[row[0]] = row[1]


reddit = praw.Reddit(client_id=client_id,
                     client_secret=client_secret, user_agent=user_agent)


d_users = list(diagnosed_users.keys())
for user in d_users:
    curr_user = reddit.redditor(user)
    user_posts = list(curr_user.submissions.new(limit=1000))

    for user_post in user_posts:
        if(user_post.subreddit.display_name in mh_subreddits):
            posts[user_post.selftext] = diagnosed_users[user]

c_users = list(control_users.keys())
for user in c_users:
    curr_user = reddit.redditor(user)
    try:
        user_posts = list(curr_user.submissions.new(limit=1000))
    except:
        print(curr_user)
        continue
    for user_post in user_posts:
        if(user_post.subreddit.display_name not in mh_subreddits):
            posts[user_post.selftext] = control_users[user]


with open('../datasets/new_dataset.csv', 'w', newline='', encoding='UTF8') as f:
    # create the csv writer
    writer = csv.writer(f)

    for key, value in posts.items():

        # write a row to the csv file
        writer.writerow([value, key])
