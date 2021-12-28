var TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: "OnKSjQsmPxpeakaeV8gXhbHrK",
        consumerSecret: "ATrSKvVcW0xm84L3gaRt5leVnvleJMcR7rUgiQmOCMTwKbzSEu",
        callbackURL: "https://upload43.herokuapp.com/twitter/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          twitterId: profile.id,
          displayName: profile.displayName,
        }

        try {
          let user = await User.findOne({ twitterId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
