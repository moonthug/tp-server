import Bull, { DoneCallback, Job, Queue } from 'bull';

import { parseJobData } from '../helpers/parseJobData';
import { Instruction, PrinterService } from './PrinterService';

interface PrinterJob {
  instructions: Instruction[];
  raw: string;
}

export class PrinterJobService {
  private readonly _printerService: PrinterService;
  private readonly _queue: Queue<PrinterJob>;

  /**
   *
   */
  constructor() {
    this._printerService = new PrinterService();
    this._queue = new Bull<PrinterJob>('print', {
      redis: 'redis://192.168.1.50:6379',
      prefix: 'tp-server',
      limiter: {
        max: 1,
        duration: 5000
      }
    });
    this._queue.process(this._processQueue.bind(this));
  }

  /**
   *
   * @param jobData
   */
  public async addJob(jobData: string) {
    const { error, instructions } = parseJobData(jobData);

    if (error) {
      throw new Error(error);
    }

    return await this._queue.add({
      instructions,
      raw: jobData
    });
  }

  /**
   *
   * @private
   */
  private async _processQueue(job: Job<PrinterJob>, done: DoneCallback) {
    console.log(`Process Job: ${job.id}`);
    this._printerService.print(job.data.instructions);
    return done(null, true);
  }
}
