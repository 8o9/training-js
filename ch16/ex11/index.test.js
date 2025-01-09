//!
//! still WIP(404, 405のところがタイムアウトする)
//!
import net from "net";
import { createServer } from "./index.js";

describe("HTTP Server", () => {
  let server;
  let client;

  beforeAll((done) => {
    server = createServer();
    server.listen(3333, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    client = new net.Socket();
  });

  afterEach(() => {
    client.destroy();
  });

  test("GET / should return 200 OK with HTML form", (done) => {
    client.connect(3333, "127.0.0.1", () => {
      client.write("GET / HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("HTTP/1.1 200 OK");
      expect(response).toContain('<form action="/greeting" method="POST">');
      done();
    });
  });

  test("POST /greeting should return 200 OK with name and greeting(message like おはよー)", (done) => {
    client.connect(3333, "127.0.0.1", () => {
      const body =
        "name=%E3%81%82%E3%81%82%E3%81%82&greeting=%E3%81%8A%E3%81%AF%E3%82%88%E3%83%BC";
      client.write(
        `POST /greeting HTTP/1.1\r\nHost: localhost\r\nContent-Length: ${body.length}\r\nContent-Type: application/x-www-form-urlencoded\r\n\r\n${body}`,
      );
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("HTTP/1.1 200 OK");
      expect(response).toContain(`
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <p>Hello あああ. おはよー!</p>
  </body>
</html>
`);
      done();
    });
  });

  test("GET /greeting should return 404 Not Found", (done) => {
    client.connect(3333, "127.0.0.1", () => {
      client.write("GET /greeting HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("HTTP/1.1 404 Not Found");
      done();
    });
  });

  test("PUT /greeting should return 405 Method Not Allowed", (done) => {
    client.connect(3333, "127.0.0.1", () => {
      client.write("PUT /greeting HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("HTTP/1.1 405 Method Not Allowed");
      done();
    });
  });
});
