import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import { saveMessage } from "@features/SocketMessageSaver";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if ((res.socket as any).server.io) {
    res.end();
    return;
  }

  const httpServer: NetServer = (res.socket as any).server as NetServer;
  const io = new SocketIOServer(httpServer, {
    path: "/api/socket",
    addTrailingSlash: false,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ Client connected:", socket.id);

    socket.on("joinCourseRoom", ({ courseId }) => {
      socket.join(courseId);
      console.log(`👥 Joined course room: ${courseId}`);
    });

    socket.on("sendMessage", async ({ courseId, message, sender }) => {
      const savedMessage = await saveMessage({ courseId, sender, message });
      io.to(courseId).emit("receiveMessage", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  (res.socket as any).server.io = io;
  res.end();
}

/////////////////////////
// import { Server } from "socket.io";
// import { NextApiRequest } from "next";
// import { NextApiResponseServerIO } from "@type/socket"; // You define this type

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// let io: Server;

// export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
//   if (!res.socket.server.io) {
//     io = new Server(res.socket.server, {
//       path: "/api/socketio",
//       addTrailingSlash: false,
//     });

//     res.socket.server.io = io;

//     io.on("connection", (socket) => {
//       console.log("User connected", socket.id);
//     });
//   }
//   res.end();
// }
