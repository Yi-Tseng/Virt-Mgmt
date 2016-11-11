let express = require('express')
let router = express.Router()

router.get('/', async (req, res, next) => {
  req.session.username = ''
  res.redirect('/')
})

module.exports = router
