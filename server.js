const WebSocket = require("ws");

const port = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port });

console.log(`WebSocket server started on ${port}`);

wss.on("connection", (ws, req) => {
console.log("Minecraft connected!");
console.log("IP:", req.socket.remoteAddress);

ws.on("message", (data) => {
try {
const text = data.toString();
console.log("Received:", text);

```
  // JSONならパースして見やすく表示
  try {
    const obj = JSON.parse(text);
    console.log(
      "Purpose:",
      obj.header?.messagePurpose,
      "Type:",
      obj.header?.messageType
    );
  } catch (_) {}
} catch (err) {
  console.error("Message error:", err);
}
```

});

ws.on("close", (code, reason) => {
console.log(
"Disconnected:",
code,
reason ? reason.toString() : ""
);
});

ws.on("error", (err) => {
console.error("Socket error:", err);
});
});
