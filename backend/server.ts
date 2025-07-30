// server.ts
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { initialize } from "./socket"; // 👈 import your socket initializer
import { connectDB } from "./lib/db";
import router from "./routes/routes";

dotenv.config();

const app = express();
const server = http.createServer(app);

connectDB();

// Normal express CORS
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_SOCKET_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/", router);

initialize(server);

const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send("Server is running!");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
