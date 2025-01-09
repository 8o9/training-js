import net from "net";

export const createServer = () => {
  // 404, 405を返す際の判定などに利用するため、許可されたメソッドとルートをまとめる
  const allowedRoutes = {
    GET: ["/"],
    POST: ["/greeting"],
  };
  const server = net.createServer((socket) => {
    socket.on("data", (data) => {
      const request = data.toString();
      console.log(`req: ${request}`);

      const [header, body] = request.split("\r\n\r\n");
      const [requestLine] = header.split("\r\n");
      const [method, path] = requestLine.split(" ");

      if (allowedRoutes[method] && allowedRoutes[method].includes(path)) {
        if (method === "GET" && path === "/") {
          const response = `HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="greeting">Name:</label>
      <input type="text" id="name" name="name" />
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
`;
          socket.write(response);
          socket.end();
        } else if (method === "POST" && path === "/greeting") {
          // Content-Type: application/x-www-form-urlencoded
          // body for example, name=%E3%81%82%E3%81%82%E3%81%82&greeting=%E3%81%8A%E3%81%AF%E3%82%88%E3%83%BC
          const params = body.split("&").reduce((acc, param) => {
            const [key, value] = param.split("=");
            acc[key] = decodeURIComponent(value);
            return acc;
          }, {});
          const name = params["name"];
          const greeting = params["greeting"];
          const response = `HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <p>Hello ${name}. ${greeting}!</p>
  </body>
</html>
`;
          socket.write(response);
          socket.end();
        } else if (allowedRoutes[method]) {
          const response = `HTTP/1.1 404 Not Found
Content-Type: text/html; charset=UTF-8

404 Not Found
`;
          socket.write(response);
          socket.end();
        } else {
          const response = `HTTP/1.1 405 Method Not Allowed
Content-Type: text/html; charset=UTF-8

405 Method Not Allowed
`;
          socket.write(response);
          socket.end();
        }
      }
    });
  });

  return server;
};

// 直接実行したときはサーバを動かす
if (import.meta.url === new URL(import.meta.url).href) {
  const server = createServer();
  server.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
}
