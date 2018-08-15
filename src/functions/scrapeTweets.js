const { scrapeTweets } = require("../models/tweet"),
  AWS = require("aws-sdk"),
  sqs = new AWS.SQS()

exports.handler = async (event, context) => {
  // round to the nearest minute
  const tweets = await scrapeTweets(
    Math.round(new Date(event.time) / 60000) * 60
  )

  // TODO:
}
