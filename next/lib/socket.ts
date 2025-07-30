// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
const joinedRooms = new Set<string>();

export const connectSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      withCredentials: true,
    });
  }
  return socket;
};

export const joinRoom = (roomId: string) => {
  const sock = connectSocket();
  if (!joinedRooms.has(roomId)) {
    sock.emit("joinRoom", roomId);
    joinedRooms.add(roomId);
    console.log("Joined room:", roomId);
  }
};

export const getSocket = () => socket;
