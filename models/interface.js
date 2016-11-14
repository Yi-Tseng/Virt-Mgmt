let virsh = require('../virsh')

class Interface {
  constructor() {
    this.virsh = new virsh.Virsh()
  }

  getInterfaces(domainName) {
    return this.virsh.getInterfaces(domainName)
  }

}

module.exports = {Interface:Interface}
