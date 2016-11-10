let express = require('express')
let router = express.Router()
let User = require('../models/user').User
let userModel = new User()

router.get('/', function(req, res, next) {
  res.render('login')
})

router.post('/', function(req, res, next) {
  userModel.auth(req.body.username,
                 req.body.password,
                 (result) => {
                   if (result) {
                     req.session.username = req.body.username
                     res.redirect('/')
                   } else {
                     res.redirect('/')
                   }
                   res.end();
                 })
})

module.exports = router
