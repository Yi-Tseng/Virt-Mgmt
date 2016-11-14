let express = require('express')
let router = express.Router()
let Domain = require('../models/domain').Domain
let Interface = require('../models/interface').Interface
let Blk = require('../models/blk').Blk
let domainModel = new Domain()
let interfaceModel = new Interface()
let blkModel = new Blk()

router.get('/:domainName', async (req, res, next) => {
  let name = req.params.domainName
  let info = domainModel.info(name)
  let interfaces = interfaceModel.getInterfaces(name)
  let blks = blkModel.getBlks(name)
  res.render('vminfo', {vminfo: info, vmName: name, interfaces: interfaces, blks: blks})
})

module.exports = router
