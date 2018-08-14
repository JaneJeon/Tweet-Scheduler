const { decode } = require("../controllers/cookie"),
  { createTweet } = require("../models/tweet")

exports.handler = async (event, context) => {
  try {
    const user = decode(event),
      { tweetBody, tweetTime } = JSON.parse(event.body)
  } catch (err) {
    return { statusCode: 401 }
  }
}
