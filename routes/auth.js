const express = require('express')
const passport = require('passport')
const router = express.Router()


router.get('/twitter/login', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/'
}),
    function (req, res) {
        res.redirect('/dashboard')
    });

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
