const { decode } = require("../controllers/cookie"),
  { getTweets } = require("../models/tweet")

exports.handler = async (event, context) => {
  try {
    const { userId } = decode(event)
  } catch (err) {
    return { statusCode: 401 }
  }
}
