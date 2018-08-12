const Tweet = require("../models/tweet")

exports.getTweets = async (event, context) => {
  const user = JSON.parse(event.requestContext.authorizer)
}

exports.scheduleTweet = async (event, context) => {
  const { userId } = JSON.parse(event.requestContext.authorizer)
}

exports.modifyTweet = async (event, context) => {
  const { userId } = JSON.parse(event.requestContext.authorizer)
  const tweetId = event.pathParameters.tweetId
}

exports.deleteTweet = async (event, context) => {
  const { userId } = JSON.parse(event.requestContext.authorizer)
  const tweetId = event.pathParameters.tweetId
}
