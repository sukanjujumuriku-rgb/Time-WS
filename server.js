const WebSocket = require("ws");

const port = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port });

console.log(`WebSocket server started on ${port}`);

wss.on("connection", (ws) => {
console.log("Minecraft connected!");

function sendCommand(cmd) {
const packet = {
header: {
version: 1,
requestId: Date.now().toString(),
messagePurpose: "commandRequest",
messageType: "commandRequest"
},
body: {
version: 1,
commandLine: cmd,
origin: {
type: "player"
}
}
};

```
ws.send(JSON.stringify(packet));
```

}

// 初回のみObjectiveを作成
sendCommand("scoreboard objectives add clock dummy");

const timer = setInterval(() => {
const now = new Date();

```
const h = now.getHours();
const m = now.getMinutes();

sendCommand(`scoreboard players set Hour clock ${h}`);
sendCommand(`scoreboard players set Minute clock ${m}`);

sendCommand(`titleraw @a actionbar {"rawtext":[{"text":"現在時刻 ${h}:${String(m).padStart(2,"0")}"}]}`);
```

}, 1000);

ws.on("close", () => {
clearInterval(timer);
console.log("Disconnected");
});
});
