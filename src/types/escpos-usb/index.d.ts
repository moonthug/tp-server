declare module 'escpos-usb' {
  export default class EscposUsb {
    constructor(vid: number, pid: number);
    open(callback: () => void): void;
  }
}
