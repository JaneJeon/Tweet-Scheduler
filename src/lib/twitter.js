const Twitter = require("twitter")

const client = (accessToken, accessTokenSecret) =>
  new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
  })

exports.verify = (accessToken, accessTokenSecret) =>
  new Promise((resolve, reject) =>
    client(accessToken, accessTokenSecret).get(
      "account/verify_credentials",
      err => {
        if (err) reject()
        else resolve()
      }
    )
  )

exports.post = (accessToken, accessTokenSecret, tweetBody) =>
  new Promise((resolve, reject) =>
    client(accessToken, accessTokenSecret).post(
      "statuses/update",
      {
        status: tweetBody
      },
      err => {
        if (err) reject()
        else resolve()
      }
    )
  )
