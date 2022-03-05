const bcrypt = require("bcrypt"),
  saltRounds = 10

module.exports.createHash = async (password) => {
  try {
    let hashpassword = await bcrypt.hash(password, saltRounds)
    return hashpassword
  } catch (e) {
    throw e
  }
}

module.exports.verifyHash = (password, hash) => {
  try {
    return bcrypt.compareSync(password, hash)
  } catch (e) {
    throw e
  }
}
