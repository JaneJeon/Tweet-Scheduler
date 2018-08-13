const jwt = require("jsonwebtoken")

class InvalidCredentialsError extends Error {}

exports.handler = async (event, context) => {
  const { userId, accessToken, accessTokenSecret } = JSON.parse(event.body)

  if (!(userId && accessToken && accessTokenSecret))
    throw new InvalidCredentialsError()

  return jwt.sign(event.body, process.env.JWT_SECRET)
}
