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

  create(name, ram, vcpu, osVariant, isoSource, network, diskSize, description) {
    let cmd = `virt-install --hvm --name=${name} --ram=${ram} --vcpus=${vcpu} --os-variant ${osVariant} --location=${isoSource} --network network=${network},model=virtio --disk path=/var/lib/libvirt/images/${name}.img,size=${diskSize},bus=virtio,format=qcow2 --graphics none --extra-args='console=tty0 console=ttyS0,115200n8 serial' --force --cpu host --description "${description}"`
    let resStr = this.exec(cmd)
    return resStr.firstLine
  }

  listNetworks() {
    let cmd =`virsh net-list --all`
    let resStr = this.exec(cmd)
    let resultLines = resStr.lines
    let result = resultLines.map((line) => line.split(' '))
                   .map((tarr) => tarr[1])
                   .filter((e, i, a) => i >= 2)
                   .filter((e) => e !== undefined)
    return result
  }

  getDomainInfo(name) {
    let cmd = `virsh dominfo ${name}`
    let resStr = this.exec(cmd)
    let vminfo = {}
    let lines = resStr.lines
                  .map((line) => line.split(':').map((e) => e.trim()))
    lines.forEach((e) => {
      if (e.length === 2) {
        vminfo[e[0]] = e[1]
      }
    })

    return vminfo
  }

  getInterfaces(domainName) {
    let cmd = `virsh domiflist ${domainName}`
    let resStr = this.exec(cmd)
    return resStr.lines
      .filter((l) => l !== '')
      .filter((e, i, a) => i >= 2)
      .map((line) => line.split(' ').filter((e) => e !== ''))
      .map((info) => ({name: info[0], type: info[1], source: info[2], model: info[3], mac: info[4]}))
  }

  getBlks(domainName) {
    let cmd = `virsh domblklist ${domainName}`
    let resStr = this.exec(cmd)
    return resStr.lines.filter((e, i, a) => i >= 2)
      .filter((l) => l !== '')
      .map((l) => l.split(' ').filter((e) => e !== ''))
      .map((info) => ({target: info[0], source: info[1]}))
  }
}

module.exports = {Virsh:Virsh}
