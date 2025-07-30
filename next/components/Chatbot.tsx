import { useState, useEffect, useContext, useRef } from "react";
import axiosInstance from "../features/axiosInstance";
import { AppContext } from "../features/AppContext";

const Chatbot = () => {
  const [chat, setChat] = useState(false);
  const context = useContext(AppContext);
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const refDisplayText = useRef(""); // Ref to store display text
  const chatContainerRef = useRef(null); // Ref for controlling scroll behavior

  const toggleChat = () => {
    setChat(!chat);
  };

  const sendPrompt = async () => {
    if (!prompt) return; // Avoid sending empty prompts
    setGenerating(true);

    setConversation((prev) => [...prev, { prompt }]); // Add user message to conversation

    try {
      const response = await axiosInstance.post("/recommendations", { prompt });
      if (response.data.recommendations) {
        setConversation((prev) => [
          ...prev,
          { answer: response.data?.recommendations },
        ]);
        animateText(response.data?.recommendations); // Trigger typing animation for the response
      } else {
        setConversation((prev) => [
          ...prev,
          {
            problem:
              "Something went wrong, please ask again or refresh the page. If the problem persists, try again later or find our contact page for more info.",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
      setPrompt(""); // Clear the input field
    }
  };
  const animateText = (text) => {
    if (!text) {
      console.error("Received undefined or empty text for animation.");
      return;
    }

    let index = 0;
    refDisplayText.current = ""; // Reset display text

    const interval = setInterval(() => {
      if (text.charAt(index)) {
        refDisplayText.current += text.charAt(index); // Append next character
        setDisplayText(refDisplayText.current); // Update the state
        index++;
      }

      if (index >= text.length) {
        clearInterval(interval); // Stop when all characters are displayed
      }
    }, 100); // Adjust typing speed
  };

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      // Check if the user is at the bottom
      const isAtBottom =
        chatContainer.scrollHeight - chatContainer.scrollTop ===
        chatContainer.clientHeight;

      if (isAtBottom) {
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
      }
    }
  }, [conversation]); // Trigger scroll when conversation changes

  useEffect(() => {
    if (!chat) {
      setConversation([]); // Reset conversation when chat is closed
    }
  }, [chat]);

  return (
    <div
      className={`fixed bottom-12 right-8 h-16 w-16 bg-primary rounded-full finger ${
        !chat && "animate-bounce"
      }`}
    >
      <span
        className="w-full h-full flex items-center justify-center"
        onClick={toggleChat}
      >
        <i className="fas fa-comments text-2xl text-white"></i>
      </span>
      {chat && (
        <div className="absolute bottom-full right-0 min-h-96 max-h-[35rem] w-[25rem] max-w-[100vw] bg-primary rounded-md p-3 flex flex-col">
          <header className="w-full flex items-center mb-2">
            <span className="h-14 w-14 border flex place-content-center rounded-full p-2 bg-white">
              <i className="fas fa-brain text-4xl"></i>
            </span>
            <div className="flex-1 px-2">
              <p className="body-1 leading-none font-bold">Chat with AI</p>
              <p className="body-2">Ask any question you want here.</p>
            </div>
          </header>
          <main
            ref={chatContainerRef} // Reference to the chat container
            className="w-full rounded-t-2xl flex-1 bg-zinc-200 p-2 overflow-y-scroll flex flex-col justify-end"
          >
            {conversation.map((item, index) => (
              <p
                key={index}
                className={`${
                  item.answer && "w-full flex pt-4 pb-8 border-b"
                } ${item.problem && "w-full flex pt-4 pb-8 border-b gap-2"} ${
                  item.prompt && "w-full flex items-end px-2 flex-col"
                }`}
              >
                <span className={`${item.prompt && "text-sm"}`}>
                  {item.answer && <i className="fas fa-brain text-2xl"></i>}
                  {item.problem && <i className="fas fa-brain text-2xl"></i>}
                </span>
                <span
                  className={`${
                    item.prompt &&
                    "w-max max-w-[80%] bg-white py-1 rounded-lg px-4"
                  } ${item.answer && "px-4"} ${
                    generating && index === conversation.length - 1 && "hidden"
                  }`}
                >
                  {item.answer
                    ? index === conversation.length - 1
                      ? displayText
                      : item.answer
                    : item.prompt}
                </span>
                {item.problem && (
                  <p className="border border-red-400 flex-1 p-2 pl-4 mr-3 rounded-2xl">
                    {item.problem && item.problem}
                  </p>
                )}
                {generating && index === conversation.length - 1 && "..."}
              </p>
            ))}
          </main>
          <footer className="w-full bg-white rounded-b-md h-12 border-t border-zinc-500 flex items-center px-4">
            <input
              type="text"
              name="text"
              value={prompt}
              className="flex-1 p-1 border border-primary outline-none rounded-s-md h-10"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              disabled={generating}
              className="text-white bg-primary h-10 py-0 rounded-s-none"
              onClick={sendPrompt}
            >
              Send
            </button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
