const { decode } = require("../lib/cookie"),
  { ensureNotEmpty } = require("../lib/input"),
  { deleteTweet } = require("../models/tweet")

exports.handler = async (event, context) => {
  try {
    const { userId } = decode(event),
      tweetId = event.pathParameters.tweetId
    ensureNotEmpty(userId, tweetId)

    await deleteTweet(userId, tweetId)

    return { statusCode: 200 }
  } catch (err) {
    return { statusCode: 401 || err.statusCode, body: err.message }
  }
}
