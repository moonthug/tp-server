import mqtt, { MqttClient } from 'mqtt';
import { PrinterJobService } from './services/PrinterJobService';

interface StartMqttClientOptions {
  brokerUrl: string;
  topic: string;
  printerJobService: PrinterJobService
}

export function startMqttClient(options: StartMqttClientOptions): Promise<void> {
  const mqttClient = mqtt.connect(options.brokerUrl);

  mqttClient.on('message', (topic, message) => {
    if (topic === options.topic) {
      console.log(message.toString());
    }
  });

  return new Promise<void>((resolve, reject) => {
    mqttClient.on('connect', () => {
      mqttClient.subscribe(options.topic, (err) => {
        if (err) return reject(err);

        resolve();
      });
    });
  });
}

