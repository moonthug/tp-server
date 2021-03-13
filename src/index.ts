import { startHttpServer } from './http-server';
import { startMqttClient } from './mqttClient';
import { PrinterJobService } from './services/PrinterJobService';

export interface ServerOptions {
  port: number
  brokerUrl: string
  topic: string
  printerInterface: string,
  redisUrl: string
}

export async function startServer(options: ServerOptions) {
  try {
    const [printerVId, printerPId] = options.printerInterface
      .split(':')
      .map((part: string) => parseInt(part, 16));

    const printerJobService = new PrinterJobService({
      printerVId,
      printerPId,
      redisUrl: options.redisUrl
    });

    console.log('Starting MQTT Client...');
    await startMqttClient({
      brokerUrl: options.brokerUrl,
      topic: options.topic,
      printerJobService
    });

    console.log('Starting HTTP Server...');
    await startHttpServer({
      port: options.port,
      printerJobService
    });

    console.log('Server ready');
  } catch (e) {
    console.error('Couldnt Start server', e);
  }
}
