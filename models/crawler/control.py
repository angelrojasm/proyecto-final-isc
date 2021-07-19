import praw
import time
import csv

LIMIT = 9
matched = {}

diagnosedSentences = []
isInvalid = False
diagnosed_users = {}
client_id, client_secret, user_agent = 'KSzTSG5IaNHzWFIe4SJxXw', 'HMs5f4V9FAct1vSX1QUYWWV_u9D-dw', 'crawler'


def readFile(fileName):
    fileObj = open(fileName, "r")  # opens the file in read mode
    words = fileObj.read().splitlines()  # puts the file into an array
    fileObj.close()
    return words


mh_subreddits = readFile("./mh_subreddits.txt")
mh_subreddits_length = len(mh_subreddits)

with open('../datasets/diagnosed_users.csv', mode='r') as infile:
    reader = csv.reader(infile)
    for row in reader:
        if len(row) > 1:
            diagnosed_users[row[0]] = row[1]

users = list(diagnosed_users.keys())
# Praw Setup

reddit = praw.Reddit(client_id=client_id,
                     client_secret=client_secret, user_agent=user_agent)

# Getting Control Users (9 Max)

# 1. For each diagnosed user, get the list of all different subreddits to which the user belongs to.
start = time.time()
for user in users:
    print('started with user ' + user)
    diagnosed_user_count = 0
    subreddit_list = []
    curr_user = reddit.redditor(user)
    user_posts = list(curr_user.submissions.new(limit=1000))
    clean_posts = []
    for user_post in user_posts:
        if(user_post.subreddit.display_name not in mh_subreddits):
            clean_posts.append(user_post)
            if(user_post.subreddit.display_name not in subreddit_list):
                subreddit_list.append(user_post.subreddit.display_name)
    print(subreddit_list)

# 2. For each Subreddit, get the list of all the users in the subreddit.
    for subreddit in subreddit_list:
        print('subreddit is ' + subreddit)
        if diagnosed_user_count == LIMIT:
            break
        subreddit_members = []
        subreddit_posts = []
        for post in list(reddit.subreddit(subreddit).hot(limit=1000)):
            subreddit_posts.append(post)
        for post in subreddit_posts:
            if post.author != None:
                subreddit_members.append(post.author.name)

# 3. For each user, get all the posts the user has postted.
        for member in subreddit_members:
            if diagnosed_user_count == LIMIT:
                break
            if isInvalid:
                isInvalid = False
                continue
            try:
                curr_member = reddit.redditor(member)
                member_posts = list(curr_member.submissions.new(limit=1000))
            except:
                continue
# 4. Validate that the user has at least 50 posts acrross all subreddits.
            if len(member_posts) < 50:
                isInvalid = True

# 5. Validate that the candidate control user does not have more than twice the amount of posts (> 2 * totalPosts['diagnosedUser']) or less than half the amount of posts (< totalPosts['diagnosedUser'] / 2) of the diagnosed user.

            if(len(member_posts) > 2 * len(clean_posts) or len(member_posts) < len(clean_posts) / 2):
                isInvalid = True

# 6. Validate if any post has been made in any subreddit that matches any of the mh_subreddits
            for post in member_posts:
                if post.subreddit in mh_subreddits:
                    isInvalid = True

# 7. If everything has passed, add the corresponding control user to the 'matched' dictionary.
            if not isInvalid:
                if member not in matched.keys():
                    print('added member ' + member)
                    diagnosed_user_count += 1
                    matched[member] = 'none'
end = time.time()
print(f'elapsed time: {end - start}')
with open('../datasets/control_users.csv', 'w', encoding='UTF8') as f:
    # create the csv writer
    writer = csv.writer(f)

    for key, value in matched.items():

        # write a row to the csv file
        writer.writerow([key, value])
