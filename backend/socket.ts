// socket.ts
import { Server, Socket } from "socket.io";

let io: Server | null = null;

const socketCors = {
  cors: {
    origin: process.env.NEXT_PUBLIC_SOCKET_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
};

function initialize(server: any) {
  if (io) {
    console.log("Socket.io already initialized.");
    return io;
  }

  console.log("Initializing socket...");
  io = new Server(server, socketCors);

  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinCourseRoom", (courseId: string) => {
      socket.join(courseId);
      console.log(`Socket ${socket.id} joined room ${courseId}`);
    });

    socket.on("leaveCourseRoom", (courseId: string) => {
      socket.leave(courseId);
      console.log(`Socket ${socket.id} left room ${courseId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

function getIO() {
  if (!io) throw new Error("Socket.io is not initialized.");
  return io;
}

export { initialize, getIO };
