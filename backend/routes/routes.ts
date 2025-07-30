import { Router } from "express";
import { createNewMessage, getAllMessage } from "../controllers/SendMessaging";

const router = Router();

// You should use POST to send a message, not GET.
router.post("/send-message", createNewMessage);
router.get("/get-messages/:courseId", getAllMessage);

export default router;
