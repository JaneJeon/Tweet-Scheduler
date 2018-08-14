const Twitter = require("twitter")

const client = (accessToken, accessTokenSecret) =>
  new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
  })

exports.verify = async (accessToken, accessTokenSecret) =>
  client(accessToken, accessTokenSecret).get("/account/verify_credentials")

exports.post = async (accessToken, accessTokenSecret, tweetBody) =>
  client(accessToken, accessTokenSecret).post("statuses/update", {
    status: tweetBody
  })
