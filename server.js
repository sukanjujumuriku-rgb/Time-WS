const http = require("http");
const WebSocket = require("ws");

const port = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("OK");
});

const wss = new WebSocket.Server({
  server,
  perMessageDeflate: false
});

server.listen(port, () => {
  console.log(`Server started on ${port}`);
});

wss.on("connection", (ws, req) => {
  console.log("Minecraft connected!");
  console.log("IP:", req.socket.remoteAddress);

  ws.on("message", (data) => {
    console.log("Received:", data.toString());
  });

  ws.on("close", (code, reason) => {
    console.log("Disconnected:", code, reason.toString());
  });

  ws.on("error", (err) => {
    console.error(err);
  });
});
