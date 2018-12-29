const mongoose = require('mongoose')

module.exports = (env) => {
  mongoose.connect(
    env.MONGO_CONNECT, { useNewUrlParser: true }
  )

  return mongoose.connection
};
