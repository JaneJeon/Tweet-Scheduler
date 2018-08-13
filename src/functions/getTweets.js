const Tweet = require("../models/tweet")

exports.handler = async (event, context) => {
  const user = JSON.parse(event.requestContext.authorizer)
}
