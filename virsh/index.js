
let childProcess = require('child_process');


class Virsh {
  constructor() {

  }

  execSync(cmd) {
    return childProcess.execSync(cmd).toString()
  }

  getHostname() {
    let resultString = this.execSync('virsh hostname')
    return resultString.split('\n')[0]
  }

  listDomains() {
    let resultString = this.execSync('virsh list --all --name')
    let result = resultString.split('\n').filter(s => s !== '')
    return result
  }

  getDomainStatus(domainName) {
    try {
      let resultString = this.execSync(`virsh domstate ${domainName}`)
      return resultString.split('\n')[0]
    } catch (err) {
      return 'error'
    }
  }

}

module.exports = {Virsh:Virsh}
