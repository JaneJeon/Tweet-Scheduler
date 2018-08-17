const user = require("./user")

exports.redirect = () => {
  if (user.name) {
    if (location.pathname == "/login.html") location.href = "index.html"
  } else if (location.pathname == "/index.html") location.href = "login.html"
}
