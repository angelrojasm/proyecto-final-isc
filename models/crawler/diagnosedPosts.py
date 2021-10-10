import praw
import time
import csv
count = 1
matched = {}
totalPosts = {}
subreddits = {
    0: 'adhd',
    1: 'anxiety',
    2: 'autism',
    3: 'bipolar',
    4: 'depression',
    5: 'eating',
    6: 'ocd',
    7: 'ptsd',
    8: 'schizophrenia'
}
diagnosedSentences = []
foundCloseMatch = False
client_id, client_secret, user_agent = 'KSzTSG5IaNHzWFIe4SJxXw', 'HMs5f4V9FAct1vSX1QUYWWV_u9D-dw', 'crawler'


def readFile(fileName):
    fileObj = open(fileName, "r")  # opens the file in read mode
    words = fileObj.read().splitlines()  # puts the file into an array
    fileObj.close()
    return words


def isInDistance(s, seq1, seq2):
    s = s.lower()
    seq1_start = s.find(seq1)
    seq1_end = seq1_start + len(seq1)
    sequence_frame = seq1_end + 50
    return seq2 in s[seq1_end:sequence_frame]


def getCondition(pattern, matrix):
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if pattern == matrix[i][j]:
                return subreddits[i]


# Loading All Tokens to Match


mh_subreddits = readFile("./mh_subreddits.txt")
mh_patterns = readFile("./mh_patterns.txt")
diagpatterns_negative = readFile(
    "./validations/patterns/diagpatterns_negative.txt")
diagpatterns_positive = readFile(
    "./validations/patterns/diagpatterns_positive.txt")

mh_subreddits_length = len(mh_subreddits)
mh_patterns_length = len(mh_patterns)
diagpatterns_positive_length = len(diagpatterns_positive)
diagpatterns_negative_length = len(diagpatterns_negative)

# Loading all condition tokens into an 2d array
conditions = []
condition_tokens_length = 0
conditions.append(readFile("./validations/conditions/adhd-syns.txt"))
conditions.append(readFile("./validations/conditions/anxiety-syns.txt"))
conditions.append(readFile("./validations/conditions/autism-syns.txt"))
conditions.append(readFile("./validations/conditions/bipolar-syns.txt"))
conditions.append(readFile("./validations/conditions/depression-syns.txt"))
conditions.append(readFile("./validations/conditions/eating-syns.txt"))
conditions.append(readFile("./validations/conditions/ocd-syns.txt"))
conditions.append(readFile("./validations/conditions/ptsd-syns.txt"))
conditions.append(readFile("./validations/conditions/schizophrenia-syns.txt"))


# Reddit Client Setup

reddit = praw.Reddit(client_id=client_id,
                     client_secret=client_secret, user_agent=user_agent)

# Getting Diagnosed Users

# 1. Loop Through each subreddit in mh_subreddits and get All Posts (For this test, cap at 1k posts. Reddit API will only return 1000 posts at a time)
# MyProAna, thinspo, thinspocommunity are quarantined, need to set up quarantine opt in.
total_posts = []
seen_posts = []
start = time.time()
for i in range(0, mh_subreddits_length):
    subreddit = mh_subreddits[i]
    print('subreddit: ' + subreddit)
    subreddit_posts = list(reddit.subreddit(subreddit).hot(limit=1000))
    for post in subreddit_posts:
        for condition in conditions:
            for condition_pattern in condition:
                if(condition_pattern in post.title or condition_pattern in post.selftext):
                    user_condition = getCondition(
                        condition_pattern, conditions)
                    if post.selftext not in seen_posts:
                        seen_posts.append(post.selftext)
                        total_posts.append([post.selftext, user_condition])

# Adding User Posts to the dataset
end = time.time()
# diagnosed_users = matched.items()
# print(diagnosed_users)
print(f'elapsed time: {end - start}')
# open the file in the write mode
with open('../datasets/new_finished_posts.csv', 'w', encoding='UTF8') as f:
    # create the csv writer
    writer = csv.writer(f)

    for key, value in total_posts:

        # write a row to the csv file
        writer.writerow([value, key])

