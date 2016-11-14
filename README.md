Virt Manager
====
Virsh with web graphic user interface

## Before setup:

Make sure your libvirt/virsh and kvm works correctly.

## Setup:

```bash
$ npm install
```

Init database
```bash
$ cp virt-mgmt.sample virt-mgmt
```

You can modify database by using sqlite3 cli tool

## Features:

- Manage VMs
- Clone VM
- Manage Networks
- Manage Storages

## To use:
Go to login page:
```
http://HOSTNAME:3000/login
```

Default username and password is root/toor

## TODO:
- [ ] Better UI(Text, Buttoms)
- [ ] VM management
  - [x] Information
  - [ ] Start/Stop VM
  - [ ] Edit VM configuration
  - [ ] Undefine(Delete) VM
  - [ ] Attach/Deatch network
  - [ ] Attach/Detach volume
- [ ] Network management
  - [ ] Information
  - [ ] Create/remove Network
  - [ ] Network UI
- [ ] Storage management
  - [ ] Information
  - [ ] Create/delete pool
  - [ ] Create/delete volume

## Screenshots:
![index](https://raw.githubusercontent.com/TakeshiTseng/Virt-Mgmt/master/screenshots/screenshot1.png)
![information](https://raw.githubusercontent.com/TakeshiTseng/Virt-Mgmt/master/screenshots/screenshot2.png)


## License:
MIT




