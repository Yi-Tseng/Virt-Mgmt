let express = require('express')
let router = express.Router()
let Domain = require('../models/domain').Domain
let Host = require('../models/host').Host

let domainModel = new Domain()
let hostModel = new Host()

router.get('/', async (req, res, next) => {
  res.render('index', { domains: domainModel.list(), hostname: hostModel.getHostname() })
  res.end()
});

module.exports = router;
