declare module 'escpos-usb' {
  export default class EscposUsb {
    open(callback: () => void): void;
  }
}
