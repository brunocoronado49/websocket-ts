import WebSocket, { WebSocketServer } from 'ws';
import { envs } from './config/envs';

const wss = new WebSocketServer({ port: envs.PORT });

wss.on('connection', function connection(ws) {
  console.log('Client connected!');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString(),
    });

    // ws.send(JSON.stringify(payload));

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`Server running on port http://localhost:${envs.PORT}`);
