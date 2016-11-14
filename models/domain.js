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

  info(name) {
    return this.virsh.getDomainInfo(name)
  }
  clone(vmName, imgSource, vmMac) {
    return this.virsh.cloneDomain(vmName, imgSource, vmMac)
  }

  create(name, ram, vcpu, osVariant, isoSource, network, diskSize, description) {
    return this.virsh.create(name, ram, vcpu, osVariant, isoSource, network, diskSize, description)
  }
}

module.exports = {Domain: Domain}
