const { post } = require("../lib/twitter")

exports.handler = async (event, context) => {
  for (const record of event.Records) {
    const { tweet } = record

    // TODO:
  }
}
