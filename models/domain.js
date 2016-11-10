let Virsh = require('../virsh').Virsh

class Domain {
  constructor() {
    this.virsh = new Virsh()
  }

  list() {
    return this.virsh
               .listDomains()
               .map(e => ({'name': e, 'status': this.virsh.getDomainStatus(e)}))
  }

}

module.exports = {Domain: Domain}
