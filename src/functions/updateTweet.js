const { decode } = require("../controllers/cookie"),
  { updateTweet } = require("../models/tweet")

exports.handler = async (event, context) => {
  try {
    const { userId } = decode(event),
      tweetId = event.pathParameters.tweetId
  } catch (err) {
    return { statusCode: 401 }
  }
}
