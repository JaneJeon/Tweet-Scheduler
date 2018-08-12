const jwt = require("jsonwebtoken")

class InvalidCredentialsError extends Error {}

exports.signIn = async (event, context) => {
  const { userId, accessToken, accessTokenSecret } = JSON.parse(event.body)

  if (!(userId && accessToken && accessTokenSecret))
    throw new InvalidCredentialsError()

  return jwt.sign(event.body, process.env.JWT_SECRET)
}

exports.authorize = async (event, context) => {
  try {
    // the "authorization" is mostly here to validate the JWT
    const decoded = jwt.verify(event.authorizationToken, process.env.JWT_SECRET)

    // delay checking access until the actual operation is done
    return {
      principalId: decoded.userId,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: event.methodArn
          }
        ]
      },
      context: decoded
    }
  } catch (err) {
    return "Unauthorized"
  }
}
