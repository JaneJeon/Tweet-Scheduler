const { post } = require("../controllers/twitter")

exports.handler = async (event, context) => {
  const { Records } = event // e.g. [{ body: "{\"foo\":\"bar\"}" }]

  for (const record of Records) {
    const { body } = record
  }
}
