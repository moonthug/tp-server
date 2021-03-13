import { createApp } from './app';
import { PrinterJobService } from '../services/PrinterJobService';

interface StartHttpServerOptions {
  printerJobService: PrinterJobService
}

export function startHttpServer(options: StartHttpServerOptions) {
  const app = createApp(options);

  app.listen(3000);
}
