let virsh = require('../virsh')

class Blk {
  constructor() {
    this.virsh = new virsh.Virsh()
  }

  getBlks(domainName) {
    return this.virsh.getBlks(domainName)
  }

}

module.exports = {Blk:Blk}
