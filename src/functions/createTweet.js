const { decode } = require("../controllers/cookie"),
  { ensureNotEmpty } = require("../controllers/input"),
  { createTweet } = require("../models/tweet")

exports.handler = async (event, context) => {
  try {
    const { userId, accessToken, accessTokenSecret } = decode(event),
      { tweetBody, tweetTime } = JSON.parse(event.body)
    ensureNotEmpty(userId, accessToken, accessTokenSecret, tweetBody, tweetTime)

    return {
      statusCode: 200,
      body: await createTweet(
        userId,
        accessToken,
        accessTokenSecret,
        tweetBody,
        tweetTime
      )
    }
  } catch (err) {
    return { statusCode: err.statusCode || 401, body: err.message }
  }
}
