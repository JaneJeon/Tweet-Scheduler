const twitter = require("../controllers/twitter"),
  { sign } = require("../controllers/cookie")

exports.handler = async (event, context) => {
  const { userId, accessToken, accessTokenSecret } = JSON.parse(event.body)

  try {
    if (userId && accessToken && accessTokenSecret)
      await twitter.verify(accessToken, accessTokenSecret)
    else throw new Error()

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
    return { statusCode: 401 }
  }
}
