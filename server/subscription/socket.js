// serrver chat
const { createServer } = require('http');
const express = require('express');
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected =>"+ socket.id)

  socket.on("disconnect", () => {
    console.log("User deconnecté", socket.id)
  })
})

module.exports={ io, server, app}
