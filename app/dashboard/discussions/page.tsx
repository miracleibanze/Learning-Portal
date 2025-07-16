"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchMyCourses } from "@redux/slices/coursesSlice";
import { usePathname } from "next/navigation";
import socket from "@lib/socket";

export default function ConversationPage() {
  const { data: session } = useSession();
  const { myCourses } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch courses only once
  useEffect(() => {
    if (!myCourses.data.length) {
      dispatch(fetchMyCourses());
    }
  }, [dispatch, pathname]);

  // Handle socket join/leave and listen for messages
  useEffect(() => {
    if (!selectedCourse) return;

    socket.emit("joinCourseRoom", selectedCourse);

    const handleMessage = (msg: any) => {
      alert("received a message");
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("messageReceived", handleMessage);

    return () => {
      socket.emit("leaveCourseRoom", selectedCourse);
      socket.off("messageReceived", handleMessage);
    };
  }, [selectedCourse]);

  const handleSend = () => {
    if (newMessage.trim() && selectedCourse && session?.user) {
      const msg = {
        content: newMessage,
        sender: session.user.name,
        courseId: selectedCourse,
        timestamp: new Date().toISOString(),
      };
      alert("sending a message");
      socket.emit("sendMessage", msg);
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
    }
  };

  return (
    <main className="flex h-[calc(100vh-4rem)]">
      {/* Course Selector */}
      <aside className="w-64 border-r border-gray-300 dark:border-white/20 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">My Courses</h2>
        {!myCourses.myCourseLoading ? (
          myCourses.data.map((course) => (
            <div
              key={course._id}
              onClick={() => {
                setSelectedCourse(course._id);
                setMessages([]); // reset messages when switching
              }}
              className={`p-2 rounded cursor-pointer mb-2 transition hover:bg-blue-100 dark:hover:bg-blue-900 ${
                selectedCourse === course._id
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-zinc-800"
              }`}
            >
              {course.title}
            </div>
          ))
        ) : (
          <div className="text-center text-zinc-500 dark:text-white/80 font-bold">
            Loading...
          </div>
        )}
      </aside>

      {/* Conversation */}
      <section className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-300 dark:border-white/20">
          <h2 className="text-lg font-semibold">
            {selectedCourse
              ? myCourses.data.find((c) => c._id === selectedCourse)?.title
              : "Select a course to start chatting"}
          </h2>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-zinc-700 p-2 rounded-md"
            >
              <p className="text-sm font-semibold">{msg.sender}</p>
              <p className="text-base">{msg.content}</p>
              <p className="text-xs text-right text-gray-500">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
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
              className="bg-blue-600 text-white px-4 py-2 rounded"
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
