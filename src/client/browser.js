exports.getScript = url =>
  new Promise((resolve, reject) => {
    let script = document.createElement("script"),
      prior = document.getElementsByTagName("script")[0]
    script.async = true

    script.onload = script.onreadystatechange = (_, isAbort) => {
      if (
        isAbort ||
        !script.readyState ||
        /loaded|complete/.test(script.readyState)
      ) {
        script.onload = script.onreadystatechange = null
        script = undefined

        isAbort ? reject() : resolve()
      }
    }

    script.src = url
    prior.parentNode.insertBefore(script, prior)
  })

exports.$ = fn => document.addEventListener("DOMContentLoaded", fn)
