import praw
import time
import csv

LIMIT = 9
matched = {}

diagnosedSentences = []
foundCloseMatch = False
client_id, client_secret, user_agent = 'KSzTSG5IaNHzWFIe4SJxXw', 'HMs5f4V9FAct1vSX1QUYWWV_u9D-dw', 'crawler'


def readFile(fileName):
    fileObj = open(fileName, "r")  # opens the file in read mode
    words = fileObj.read().splitlines()  # puts the file into an array
    fileObj.close()
    return words


mh_subreddits = readFile("./mh_subreddits.txt")
mh_subreddits_length = len(mh_subreddits)

# Praw Setup

reddit = praw.Reddit(client_id=client_id,
                     client_secret=client_secret, user_agent=user_agent)

# Getting Control Users (9 Max)

# 1. For each diagnosed user, get the list of all different subreddits to which the user belongs to.

# 2. For each Subreddit, get the list of all the users in the subreddit.

# 3. For each user, get all the posts the user has postted.

# 4. Validate that the user has made at least one post on the current subreddit.

# 5. Validate if any post has been made in any subreddit that matches any of the mh_subreddits

# 6. Validate that the user has at least 50 posts acrross all subreddits.

# 7. Validate that the candidate control user does not have more than twice the amount of posts (> 2 * totalPosts['diagnosedUser']) or less than half the amount of posts (< totalPosts['diagnosedUser'] / 2) of the diagnosed user.

# 8. If everything has passed, add the corresponding control user to the 'matched' dictionary.
