const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// Inicializa Express
const app = express();
const port = 1234;

// Sirve archivos estáticos desde el directorio "public"
app.use(express.static("public"));

// Crea un servidor HTTP y asócialo con WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configura los WebSockets
wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on("message", (message) => {
    const text = `Mensaje recibido: ${message}`;
    // Ensure you're sending a text string
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text); // Sending a string
        console.log(text);
      }
    });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

// Inicia el servidor HTTP+WebSocket
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
