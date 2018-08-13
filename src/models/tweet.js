const AWS = require("aws-sdk"),
  db = new AWS.DynamoDB.DocumentClient()

class InvalidTweetLengthError extends Error {}
class InvalidScheduleError extends Error {}

export default class Tweet {
  validate(body, time) {
    if (!body.length || body.length > 280) throw new InvalidTweetLengthError()
    if (time <= Date.now()) throw new InvalidScheduleError()
  }
}
