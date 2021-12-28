const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  twitterId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', UserSchema)
