// @lib/socket.ts
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
