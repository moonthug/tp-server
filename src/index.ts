import { startHttpServer } from './http-server';
import { startMqttClient } from './mqttClient';
import { PrinterJobService } from './services/PrinterJobService';

async function main() {
  //await connectToDB('mongodb://tp-s3rver:tp-s3rver@192.168.1.50/home');

  const printerJobService = new PrinterJobService();

  console.log('Starting MQTT Client...');
  startMqttClient({
    brokerUrl: 'mqtt://192.168.1.50',
    topic: 'home/printer',
    printerJobService
  });

  console.log('Starting HTTP Server...');
  await startHttpServer({ port: 3000, printerJobService });
}

main().catch(err => console.error(err));
