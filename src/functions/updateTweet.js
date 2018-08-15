const { decode } = require("../lib/cookie"),
  { ensureNotEmpty } = require("../lib/input"),
  { updateTweet } = require("../models/tweet")

exports.handler = async (event, context) => {
  try {
    const { userId } = decode(event),
      tweetId = event.pathParameters.tweetId,
      { tweetBody, tweetTime } = JSON.parse(event.body)
    ensureNotEmpty(userId, tweetId, tweetBody, tweetTime)

    await updateTweet(userId, tweetId, tweetBody, tweetTime)

    return { statusCode: 200 }
  } catch (err) {
    return { statusCode: 401 || err.statusCode, body: err.message }
  }
}
