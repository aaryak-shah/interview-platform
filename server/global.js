const mongoConfig = require("./db/config.json")

global.mongoURI = mongoConfig.uri
  .replace("<host>", process.env.DB_HOST_NAME)
  .replace("<password>", process.env.MONGO_PASSWORD)
  .replace("<cluster>", process.env.MONGO_CLUSTER)
  .replace("<db>", process.env.DB_NAME)

global.cookieSecret = process.env.COOKIE_SECRET
global.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
global.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
