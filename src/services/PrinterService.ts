import escpos, { Adapter, Printer } from 'escpos';
import EscposUsb from 'escpos-usb';

type StringOrNumber = string | number;

export interface Instruction {
  command: string;
  args: StringOrNumber[];
}

class TestPrinter {

  font(val: string) {
    console.log(`font: ${val}`);
    return this;
  }

  align(val: string) {
    console.log(`align: ${val}`);
    return this;
  }

  text(val: string) {
    console.log(`text: ${val}`);
    return this;
  }

  barcode(val: string, type: string) {
    console.log(`barcode: ${val}, ${type}`);
    return this;
  }

  close() {
    return this;
  }
}

interface PrinterServiceOptions {
  vId: number;
  pId: number;
}

export class PrinterService {
  private readonly _printer: Printer;
  private _deviceReady: boolean;

  /**
   *
   */
  constructor(options: PrinterServiceOptions) {
    const device = new EscposUsb(options.vId, options.pId);
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
      const pipelineFunc = pipeline[instruction.command];
      pipeline = pipelineFunc.apply(pipeline, instruction.args);
    });

    return pipeline.flush();
  }
}
