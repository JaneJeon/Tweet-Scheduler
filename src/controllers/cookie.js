const jwt = require("jsonwebtoken")

exports.sign = credentials =>
  `token=${jwt.sign(
    credentials,
    process.env.JWT_SECRET
  )}; Secure; HttpOnly; SameSite=Strict`

exports.decode = event =>
  // strip off 'token='
  jwt.verify(event.headers.Cookie.substr(6), process.env.JWT_SECRET)
