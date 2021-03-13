import escpos, { Adapter, Printer } from 'escpos';
import EscposUsb from 'escpos-usb';

export interface Instruction {
  command: string;
  args: string[];
}

export class PrinterService {
  private readonly _printer: Printer;
  private _deviceReady: boolean;

  /**
   *
   */
  constructor() {
    const device = new EscposUsb();
    this._deviceReady = false;
    this._printer = new escpos.Printer(device as Adapter);
    device.open(() => {
      this._deviceReady = true;
    });
  }

  /**
   *
   * @param instructions
   */
  public print(instructions: Instruction[]) {
    let pipeline = this._printer;

    instructions.forEach(instruction => {
      // @ts-ignore
      pipeline = pipeline[instruction.command].call(null, instruction.args);
    })

   return pipeline.close();
  }

}
