const jwt = require("jsonwebtoken"),
  { ensureNotEmpty } = require("./input")

exports.sign = credentials =>
  `token=${jwt.sign(
    credentials,
    process.env.JWT_SECRET
  )}; Secure; HttpOnly; SameSite=Strict`

exports.decode = event => {
  ensureNotEmpty(event.headers.Cookie)

  // strip off 'token='
  return jwt.verify(event.headers.Cookie.substr(6), process.env.JWT_SECRET)
}

exports.expire = "; expires=Thu, 01 Jan 1970 00:00:00 GMT"
