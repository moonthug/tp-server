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
    const device = new EscposUsb(0x04b8, 0x0e15);
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
    let pipeline: Record<string, any> = this._printer;

    instructions.forEach(instruction => {
      console.log('call: ', instruction.command, instruction.args);
      pipeline = pipeline[instruction.command].apply(null, instruction.args);
    });

    return pipeline.close();
  }
}
