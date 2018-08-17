const { expire } = require("../lib/cookie")

exports.handler = async (event, context) => ({
  statusCode: 200,
  headers: { "Set-Cookie": expire }
})
