const { decode } = require("../lib/cookie"),
  { ensureNotEmpty } = require("../lib/input"),
  { getTweets } = require("../models/tweet")

exports.handler = async (event, context) => {
  try {
    const { userId } = decode(event)
    ensureNotEmpty(userId)

    return { statusCode: 200, body: JSON.stringify(await getTweets(userId)) }
  } catch (err) {
    return { statusCode: 401 || err.statusCode, body: err.message }
  }
}
