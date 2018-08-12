const session = window.localStorage,
  signedIn = () => {
    document.getElementById("signin").style.display = "none"
    document.title = session.getItem("displayName")
  }

if (session.getItem("userId")) signedIn()
else {
  firebase.initializeApp(require("../../config/firebase.json"))

  document.getElementById("signin").onclick = () =>
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(result => {
        session.setItem("accessToken", result.credential.accessToken)
        session.setItem("accessTokenSecret", result.credential.secret)
        session.setItem("displayName", result.user.displayName)
        session.setItem("userId", result.user.uid)

        signedIn()
      })
}
