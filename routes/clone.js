let express = require('express')
let router = express.Router()
let Domain = require('../models/domain').Domain

let domainModel = new Domain()

router.get('/', async (req, res, next) => {
  res.render('clone', {domains: domainModel.list()})
  res.end()
})

router.post('/', async (req, res, next) => {
  let vmName = req.body.vm_name;
  let cloneSource = req.body.clone_source
  let vmMac = req.body.vm_mac
  domainModel.clone(vmName, cloneSource, vmMac)
  res.render('msg', {message: "Success"})
})

module.exports = router
