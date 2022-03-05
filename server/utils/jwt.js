const jwt = require("jsonwebtoken")
const accessTokenConfig = require("./accessTokenConfig.json")

// function will create access token
module.exports.createAccessToken = (params) => {
  try {
    return jwt.sign(
      {
        uid: params.uid,
        role: params.role,
      },
      global.accessTokenSecret,
      accessTokenConfig
    )
  } catch (e) {
    throw e
  }
}

module.exports.verify = (token) => {
  try {
    return jwt.verify(token, global.accessTokenSecret)
  } catch (e) {
    throw e
  }
}
