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
  console.log(req.body)
  domainModel.clone(vmName, cloneSource, vmMac)
  res.redirect('/')
})

module.exports = router
