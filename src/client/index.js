const route = require("./route")

route.redirect()

const { getScript } = require("./browser"),
  config = require("../../config/frontend.json")

signIn = async () => {
  await getScript("https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js")
  await getScript("https://www.gstatic.com/firebasejs/5.3.0/firebase-auth.js")

  firebase.initializeApp(config.firebase)

  const result = await firebase
    .auth()
    .signInWithRedirect(new firebase.auth.TwitterAuthProvider())

  window.localStorage.setItem("displayname", result.user.displayname)

  await fetch(`${config.api}/session`, {
    method: "POST",
    body: JSON.stringify({
      userId: result.user.uid,
      accessToken: result.credential.accessToken,
      accessTokenSecret: result.credential.secret
    }),
    headers: { "Content-Type": "application/json" }
  })

  route.redirect()
}
