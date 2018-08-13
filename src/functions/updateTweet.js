const Tweet = require("../models/tweet")

exports.handler = async (event, context) => {
  const { userId } = JSON.parse(event.requestContext.authorizer)
  const tweetId = event.pathParameters.tweetId
}
