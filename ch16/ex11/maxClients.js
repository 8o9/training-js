import net from "net";

const clients = [];
const maxClients = 10000; // 最大クライアント数(お試し)
let connectedClients = 0;// 実際

for (let i = 0; i < maxClients; i++) {
  const client = new net.Socket();
  client.connect(3000, '127.0.0.1', () => {
    connectedClients++;
    console.log(`Client ${i + 1} connected`);
  });

  client.on('error', (err) => {
    console.error(`Client ${i + 1} error: ${err.message}`);
  });

  clients.push(client);
}

setTimeout(() => {
  console.log(`Total connected clients: ${connectedClients}`);
  clients.forEach(client => client.destroy());
}, 10000);// 10秒待ち
