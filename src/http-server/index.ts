import { createApp } from './app';
import { PrinterJobService } from '../services/PrinterJobService';

interface StartHttpServerOptions {
  port: number;
  printerJobService: PrinterJobService
}

export function startHttpServer(options: StartHttpServerOptions) {
  const app = createApp(options);

  app.listen(options.port || 3000);
}
