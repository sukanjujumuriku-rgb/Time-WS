const WebSocket = require("ws");

const port = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port });

console.log(`WebSocket server started on ${port}`);

wss.on("connection", (ws, req) => {
console.log("Minecraft connected!");
console.log("IP:", req.socket.remoteAddress);

ws.on("message", (data) => {
const text = data.toString();
console.log("Received:", text);

```
try {
  const obj = JSON.parse(text);
  console.log(
    "Purpose:",
    obj.header?.messagePurpose,
    "Type:",
    obj.header?.messageType
  );
} catch (err) {
  console.log("Not JSON.");
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
