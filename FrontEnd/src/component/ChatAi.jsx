import React from 'react'
import { useState } from 'react'
import Markdown from "react-markdown"
import axios from 'axios'

const ChatAi = ({code}) => {

    const [chatInput, setChatInput] = useState("");
const [chatResponse, setChatResponse] = useState("");
const [chatLoading, setChatLoading] = useState(false);


async function askAI() {
  if (!chatInput.trim()) return;
  setChatLoading(true);
  setChatResponse("Thinking...");

  try {
    const response = await axios.post("http://localhost:3000/ai/chat", {message: chatInput,code });
    setChatResponse(response.data);
  } catch (error) {
    setChatResponse("⚠️ Error: Unable to fetch AI response.");
  } finally {
    setChatLoading(false);
  }
}

  return (
    <div>
        <hr style={{ margin: "1rem 0", borderColor: "#555" }} />
<div className="chat-container">
  <h3>💬 Ask AI About Your Code</h3>
  <textarea
    placeholder="Ask something like: 'How can I improve this code?'"
    value={chatInput}
    onChange={(e) => setChatInput(e.target.value)}
  />
  <button onClick={askAI} disabled={chatLoading}>
    {chatLoading ? "Thinking..." : "Ask"}
  </button>

  <div className="chat-response">
    <Markdown>{chatResponse}</Markdown>
  </div>
</div>

      
    </div>
  )
}

export default ChatAi
