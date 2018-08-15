const { ensureNotEmpty } = require("../controllers/input"),
  { verify } = require("../controllers/twitter"),
  { sign } = require("../controllers/cookie")

exports.handler = async (event, context) => {
  try {
    const { userId, accessToken, accessTokenSecret } = JSON.parse(event.body)
    ensureNotEmpty(userId, accessToken, accessTokenSecret)

    await verify(accessToken, accessTokenSecret)

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": sign({
          userId: userId,
          accessToken: accessToken,
          accessTokenSecret: accessTokenSecret
        })
      }
    }
  } catch (err) {
    return { statusCode: 401, body: err.message }
  }
}
