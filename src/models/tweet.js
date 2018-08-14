const AWS = require("aws-sdk"),
  db = new AWS.DynamoDB.DocumentClient(),
  uuid = require("uuid/v4")

const validate = tweet => {
  if (
    !tweet.tweetBody ||
    tweet.tweetBody > 280 ||
    tweet.tweetTime <= Math.round(Date.now() / 1000)
  )
    throw new Exception()
}

exports.createTweet = async (user, tweetBody, tweetTime) => {
  const tweet = {
    userId: user.userId,
    tweetId: uuid(),
    tweetTime: tweetTime,
    tweetBody: tweetBody,
    accessToken: user.accessToken,
    accessTokenSecret: user.accessTokenSecret
  }

  validate()

  await db.put({ TableName: process.env.TWEETS_TABLE, Item: tweet }).promise()

  return tweet
}

exports.getTweets = async userId =>
  db
    .query({
      TableName: process.env.TWEETS_TABLE,
      KeyConditionExpression: "userId = :id",
      ExpressionAttributeValues: { ":id": userId },
      ProjectionExpression: "tweetId, tweetTime, tweetBody"
    })
    .promise()

exports.updateTweet = async (userId, tweetId, tweetBody, tweetTime) => {
  validate()

  return db
    .update({
      TableName: process.env.TWEETS_TABLE,
      Key: { userId: userId, tweetId: tweetId },
      UpdateExpression: "set tweetBody = :body, tweetTime = :time",
      ExpressionAttributeValues: { ":body": tweetBody, ":time": tweetTime }
    })
    .promise()
}

exports.deleteTweet = async (userId, tweetId) =>
  db
    .delete({
      TableName: process.env.TWEETS_TABLE,
      Key: { userId: userId, tweetId: tweetId }
    })
    .promise()

exports.scrapeTweets = async time =>
  db.query({
    TableName: process.env.TWEETS_TABLE,
    IndexName: process.env.TWEET_TIME_INDEX,
    KeyConditionExpression: "tweetTime = :time",
    ExpressionAttributeValues: { ":time": time }
  })
