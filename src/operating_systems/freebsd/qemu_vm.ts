import {Vm} from '../../qemu_vm'

export class QemuVm extends Vm {
  protected get hardDriverFlags(): string[] {
    // prettier-ignore
    return [
      '-device', 'virtio-blk-pci,drive=drive0,bootindex=0',
      '-drive', `if=none,file=${this.configuration.diskImage},id=drive0,cache=writeback,discard=ignore,format=raw`,

      '-device', 'virtio-blk-pci,drive=drive1,bootindex=1',
      '-drive', `if=none,file=${this.configuration.resourcesDiskImage},id=drive1,cache=writeback,discard=ignore,format=raw`,
    ]
  }

  protected override async shutdown(): Promise<void> {
    await this.execute('sudo shutdown -p now')
  }
}
