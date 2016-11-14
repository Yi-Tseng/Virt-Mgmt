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

}

module.exports = {Virsh:Virsh}
