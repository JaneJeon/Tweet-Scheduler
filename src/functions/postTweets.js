const { scrapeTweets } = require("../models/tweet"),
  { post } = require("../lib/twitter")

exports.handler = async (event, context) => {
  // round to the nearest minute
  const time = Math.round(new Date(event.time) / 60000) * 60,
    tweetPromises = []

  // in case we need to paginate, we need to repeatedly query the database
  let result = { LastEvaluatedKey: true },
    key = undefined

  while (result.LastEvaluatedKey) {
    result = await scrapeTweets(time, key)
    key = result.LastEvaluatedKey

    result.Items.forEach(tweet =>
      tweetPromises.push(
        // add explicit error handler so that Promise.all won't fail fast
        post(tweet).catch(err => {
          console.error(`Failed to post tweet ${JSON.stringify(tweet)}: ${err}`)
          return err
        })
      )
    )
  }

  console.log(`Scraped ${tweetPromises.length} tweets`)
  await Promise.all(tweetPromises)
}
