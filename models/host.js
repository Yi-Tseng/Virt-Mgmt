let virsh = require('../virsh')

class Host {
  constructor() {
    this.virsh = new virsh.Virsh()
  }

  getHostname() {
    return this.virsh.getHostname()
  }

}

module.exports = {Host:Host}
