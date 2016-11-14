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
    let resultString = this.exec('virsh hostname')
    return resultString.split('\n')[0]
  }

  listDomains() {
    let resultString = this.exec('virsh list --all --name')
    let result = resultString.split('\n').filter(s => s !== '')
    return result
  }

  getDomainStatus(domainName) {
    let resultString = this.exec(`virsh domstate ${domainName}`)
    return resultString.split('\n')[0]
  }

  cloneDomain(vmName, imgSource, vmMac) {
    let resultString = this.exec(`virt-clone --original ${imgSource} --name ${vmName} --mac ${vmMac} --file /var/lib/libvirt/images/${vmName}.img`)
    return resultString.split('\n')[0]
  }

}

module.exports = {Virsh:Virsh}
