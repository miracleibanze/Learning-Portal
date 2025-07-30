"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchMyCourses } from "@redux/slices/coursesSlice";
import { usePathname } from "next/navigation";
import { connectSocket, getSocket } from "@lib/socket";
import axios from "axios";
import { MessageType } from "@type/MessageType";
import {
  addUnreadMessage,
  removeUnreadMessage,
} from "@redux/slices/NotificationsSlice";
import { ChevronsDown } from "lucide-react";

export default function ConversationPage() {
  const { data: session } = useSession();
  const { myCourses } = useSelector((state: RootState) => state.courses);
  const { unreadMessages } = useSelector(
    (state: RootState) => state.notifications
  );
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Fetch courses
  useEffect(() => {
    if (!myCourses.data.length) dispatch(fetchMyCourses());
  }, [dispatch, pathname]);

  const handleScroll = () => {
    const container = messageContainerRef.current;
    if (!container) return;

    const threshold = 50;
    const atBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <=
      threshold;

    setIsAtBottom(atBottom);
    if (atBottom) {
      setShowScrollButton(false);
    }
  };

  // Attach scroll listener
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]);

  // Socket connection
  useEffect(() => {
    connectSocket();

    const socket = getSocket();
    if (!socket) return;

    const handleMessage = (msg: MessageType) => {
      if (msg.courseId === selectedCourse) {
        if (msg.senderId !== session?.user._id) {
          setMessages((prev) => [...prev, msg]);
          if (!isAtBottom) setShowScrollButton(true);
        }
      } else {
        dispatch(addUnreadMessage(msg.courseId));
      }
    };

    socket.on("messageReceived", handleMessage);

    return () => {
      socket.off("messageReceived", handleMessage);
    };
  }, [selectedCourse, session?.user._id, isAtBottom]);

  const checkIfAtBottom = () => {
    const container = messageContainerRef.current;
    if (!container) return;

    const threshold = 40; // tolerance for considering as "at bottom"
    const isUserAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <=
      threshold;

    setIsAtBottom(isUserAtBottom);
    setShowScrollButton(!isUserAtBottom);
  };

  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkIfAtBottom);
    return () => container.removeEventListener("scroll", checkIfAtBottom);
  }, []);

  const scrollToBottom = () => {
    const container = messageContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
    setShowScrollButton(false);
  };

  const handleChangeSelectedCourse = async (id: string) => {
    setSelectedCourse(id);
    setMessages([]);
    dispatch(removeUnreadMessage(id));
    try {
      const res = await axios.get(`http://localhost:5000/get-messages/${id}`);
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedCourse || !session?.user) return;

    const msg: MessageType = {
      content: newMessage,
      sender: session.user.name,
      senderId: session.user._id,
      courseId: selectedCourse,
      isImage: false,
      timestamp: new Date(),
    };

    try {
      await axios.post("http://localhost:5000/send-message", msg, {
        headers: { "Content-Type": "application/json" },
      });

      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
    } catch (err) {
      setError(true);
      console.error("Message send error:", err);
    }
  };

  return (
    <main className="flex max-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-300 dark:border-white/20 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">My Courses</h2>
        {!myCourses.myCourseLoading ? (
          myCourses.data.map((course) => {
            const isUnread = unreadMessages.includes(course._id);
            const isSelected = selectedCourse === course._id;

            return (
              <div
                key={course._id}
                onClick={() => handleChangeSelectedCourse(course._id)}
                className={`relative p-2 rounded cursor-pointer mb-2 transition hover:bg-opacityPrimary ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-white dark:bg-zinc-800 dark:hover:bg-opacityPrimary"
                } ${
                  isUnread ? "border border-lightPrimary bg-opacityPrimary" : ""
                }`}
              >
                {course.title}
                {isUnread && (
                  <span className="absolute bottom-0 right-2 text-primary text-[10px]">
                    Unread messages
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center text-zinc-500 dark:text-white/80 font-bold">
            Loading...
          </div>
        )}
      </aside>

      {/* Chat Area */}
      <section className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-300 dark:border-white/20">
          <h2 className="text-lg font-semibold">
            {selectedCourse
              ? myCourses.data.find((c) => c._id === selectedCourse)?.title
              : "Select a course to start chatting"}
          </h2>
        </header>

        <div
          ref={messageContainerRef}
          className="flex-1 p-4 space-y-3 overflow-y-auto relative scroll-design"
        >
          {messages.length > 0 ? (
            messages.map((msg, index) => {
              const isMine = msg.senderId === session?.user._id;
              return (
                <div
                  key={index}
                  className={`py-1 px-2 rounded-md ${
                    isMine ? "flex justify-end" : ""
                  }`}
                >
                  <div
                    className={`w-max md:min-w-[10rem] p-2 px-4 rounded-2xl ${
                      isMine
                        ? "bg-opacityPrimary rounded-tr-none"
                        : "bg-zinc-300 dark:bg-white/10 rounded-tl-none"
                    }`}
                  >
                    {!isMine && (
                      <p className="text-sm text-darkPrimary dark:text-lightPrimary">
                        {msg.sender}
                      </p>
                    )}
                    <p className="text-base font-semibold">{msg.content}</p>
                    <p className="text-[10px] text-right text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              );
            })
          ) : selectedCourse ? (
            <div className="w-full h-40 flex-center flex-col font-semibold gap-3">
              <span>Loading...</span>
              <div className="w-32 h-1 bg-zinc-300 relative">
                <div className="h-full bg-darkPrimary dark:bg-secondary animate80" />
              </div>
            </div>
          ) : (
            <p className="bg-gray-100 dark:bg-zinc-700 p-2 rounded-md flex-center font-semibold">
              No messages yet
            </p>
          )}
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Failed to join conversation. Try again later!
            </p>
          )}
          {showScrollButton && (
            <div className="fixed bottom-20 right-6 z-50">
              <button
                onClick={scrollToBottom}
                className="bg-primary text-white px-4 py-2 rounded shadow-md hover:bg-opacityPrimary transition"
              >
                <ChevronsDown />
              </button>
            </div>
          )}
        </div>

        {selectedCourse && (
          <footer className="p-4 border-t border-gray-300 dark:border-white/20 flex gap-2">
            <input
              type="text"
              className="flex-1 rounded border px-3 py-2 dark:bg-zinc-800 dark:border-white/30"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="bg-darkPrimary text-white px-4 py-2 rounded"
              onClick={handleSend}
            >
              Send
            </button>
          </footer>
        )}
      </section>
    </main>
  );
}
