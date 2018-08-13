const config = require("../../config/frontend"),
  signedIn = () => {
    document.getElementById("signin").style.display = "none"
    document.title = session.getItem("displayName")
  }

if (session.getItem("userId")) signedIn()
else {
  firebase.initializeApp(config.firebase)

  document.getElementById("signin").onclick = () =>
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(result => {
        window.localStorage.setItem("displayName", result.user.displayname)
        /* userId => result.user.uid
         * accessToken => result.credential.accessToken
         * accessTokenSecret => result.credential.secret */

        signedIn()
      })
}
