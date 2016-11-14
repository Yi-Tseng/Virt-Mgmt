let childProcess = require('child_process')
let sfl = require('string-first-line')
let sls = require('string-lines')

class Virsh {
  constructor() {

  }

  exec(cmd) {
    return childProcess.execSync(cmd).toString()
  }

  getHostname() {
    let resStr = this.exec('virsh hostname')
    return resStr.firstLine
  }

  listDomains() {
    let resStr = this.exec('virsh list --all --name')
    let result = resStr.lines.filter(s => s !== '')
    return result
  }

  getDomainStatus(domainName) {
    let resStr = this.exec(`virsh domstate ${domainName}`)
    return resStr.firstLine
  }

  cloneDomain(vmName, imgSource, vmMac) {
    let resStr = this.exec(`virt-clone --original ${imgSource} --name ${vmName} --mac ${vmMac} --file /var/lib/libvirt/images/${vmName}.img`)
    return resStr.firstLine
  }

}

module.exports = {Virsh:Virsh}
