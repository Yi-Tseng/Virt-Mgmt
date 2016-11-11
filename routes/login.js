let express = require('express')
let router = express.Router()
let User = require('../models/user').User
let userModel = new User()

router.get('/', async (req, res, next) => {
  res.render('login')
})

router.post('/', async (req, res, next) => {
  let result = await userModel.auth(req.body.username, req.body.password)
  if (result) {
    req.session.username = req.body.username
    res.redirect('/')
  } else {
    res.redirect('/')
  }
  res.end();
})

module.exports = router
