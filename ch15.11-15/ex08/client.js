const ws = new WebSocket('ws://localhost:3003');

export const sendRequest = (requestBody, requestId) => {
  const timeout = 6000; // msec
  return new Promise((resolve, reject) => {
    // const requestId = Math.random().toString(36).substring(2, 9);
    const message = JSON.stringify({ id: requestId, body: requestBody });

    const handleMessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.id === requestId) {
        clearTimeout(timer);
        ws.removeEventListener('message', handleMessage);
        resolve(response.body);
      }
    };

    const handleClose = () => {
      ws.removeEventListener('message', handleMessage);
      reject(new Error('WebSocket connection closed'));
    };

    const timer = setTimeout(() => {
      ws.removeEventListener('message', handleMessage);
      reject(new Error('Request timed out'));
    }, timeout);

    ws.addEventListener('message', handleMessage);
    ws.addEventListener('close', handleClose);

    ws.send(message);
  });
};

export const receiveRequest = (event) => {
  const request = JSON.parse(event.data);
  const response = {
    id: request.id,
    body: `Hello, ${request.body}`
  };
  ws.send(JSON.stringify(response));
};

ws.addEventListener('open', () => {
  console.log('Connected to the server');

  sendRequest('Hello Server!, Im n00bie here, pizza!')
    .then(response => {
      console.log('Received response:', response);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

ws.addEventListener('message', receiveRequest);

ws.addEventListener('close', () => {
  console.log('Disconnected from the server');
});