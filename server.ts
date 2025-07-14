const express = require("express");
const next = require("next");
const http = require("http");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);

  // Socket logic
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("message", (msg) => {
      console.log("Message received:", msg);
      io.emit("message", msg); // Broadcast
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
