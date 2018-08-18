const AWS = require("aws-sdk"),
  db = new AWS.DynamoDB.DocumentClient(),
  uuid = require("uuid/v4")

const ensureValidTweet = (tweetBody, tweetTime) => {
  if (
    tweetBody.length > 280 ||
    tweetTime % 60 ||
    tweetTime <= Math.round(Date.now() / 1000)
  )
    throw new Error("Invalid tweet parameter(s)")
}

// returns the tweet Id, and nothing else
exports.createTweet = async (
  userId,
  accessToken,
  accessTokenSecret,
  tweetBody,
  tweetTime
) => {
  ensureValidTweet(tweetBody, tweetTime)

  const tweet = {
    userId: userId,
    tweetId: uuid(),
    tweetBody: tweetBody,
    tweetTime: tweetTime,
    accessToken: accessToken,
    accessTokenSecret: accessTokenSecret
  }

  await db.put({ TableName: process.env.TWEETS_TABLE, Item: tweet }).promise()

  return tweet.tweetId
}

exports.getTweets = async userId =>
  (await db
    .query({
      TableName: process.env.TWEETS_TABLE,
      IndexName: process.env.LOCAL_TIME_INDEX,
      KeyConditionExpression: "userId = :id",
      ExpressionAttributeValues: { ":id": userId }
    })
    .promise()).Items

exports.updateTweet = async (userId, tweetId, tweetBody, tweetTime) => {
  ensureValidTweet(tweetBody, tweetTime)

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

exports.scrapeTweets = async time => {
  const params = {
    TableName: process.env.TWEETS_TABLE,
    IndexName: process.env.GLOBAL_TIME_INDEX,
    KeyConditionExpression: "tweetTime = :time",
    ExpressionAttributeValues: { ":time": time }
  }

  const result = await db.query(params).promise()

  // TODO: continuously re-run queries while still providing output
  if (result.LastEvaluatedKey)
    params.ExclusiveStartKey = result.LastEvaluatedKey

  return result.Items
}
