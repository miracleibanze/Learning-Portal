import { io } from "socket.io-client";

const socket = io({
  path: "/api/socket.ts",
});

export default socket;
