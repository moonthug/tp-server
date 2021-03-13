import mqtt from 'mqtt';
import { PrinterJobService } from './services/PrinterJobService';

interface StartMqttClientOptions {
  printerJobService: PrinterJobService
}

export function startMqttClient(options: StartMqttClientOptions) {
  const mqttClient = mqtt.connect('mqtt://192.168.1.50')

  mqttClient.on('connect', function () {
    mqttClient.subscribe('presence', function (err) {
      if (!err) {
        mqttClient.publish('presence', 'Hello mqtt')
      }
    })
  });

  mqttClient.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    mqttClient.end()
  });

  return mqttClient;
}

