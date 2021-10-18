import praw
import time
import csv

client_id, client_secret, user_agent = 'KSzTSG5IaNHzWFIe4SJxXw', 'HMs5f4V9FAct1vSX1QUYWWV_u9D-dw', 'crawler'

diagnosed_users = []
finalData = {}

with open('../datasets/diagnosed_users.csv', mode='r') as infile:
    reader = csv.reader(infile)
    for row in reader:
        if len(row) > 1:
            diagnosed_users.append(row[0])


reddit = praw.Reddit(client_id=client_id,
                     client_secret=client_secret, user_agent=user_agent)
users = []
subreddit_posts = list(reddit.subreddit("depression").hot(limit=1000))
for post in subreddit_posts:
    if(len(users) == 100):
        break
    if post.author != None:
        users.append(post.author)
for curr_user in users:
    # curr_user = reddit.redditor(user)
    userSubreddits = []
    try:
        user_posts = list(curr_user.submissions.new(limit=None))
    except:
        continue
    for user_post in user_posts:
        if user_post.subreddit.display_name not in userSubreddits:
            if finalData.get(curr_user.name):
                finalData[curr_user.name] += f"{user_post.subreddit.display_name}, "
            else:
                finalData[curr_user.name] = f"{user_post.subreddit.display_name}, "
            userSubreddits.append(user_post.subreddit.display_name)

with open('../datasets/experiment.csv', 'w', newline='', encoding='UTF8') as f:
    # create the csv writer
    writer = csv.writer(f)

    for key, value in finalData.items():

        # write a row to the csv file
        writer.writerow([key, value])
