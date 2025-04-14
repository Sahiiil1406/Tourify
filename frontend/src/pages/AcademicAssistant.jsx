import React, { useState, useEffect, useRef } from "react";
import { Send, User, Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

import AcademicStarterSection from "@/components/AcademicGreeting";

const AcademicAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [resources, setResources] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);

  // Speech Recognition Setup
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    } else {
      console.warn("Web Speech API is not supported in this browser");
    }

    // Text-to-Speech Setup
    if ("speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  const fetchResources = async (question = "resources") => {
    try {
      const response = await axios.post(
        "http://localhost:5000/ai",
        { question: question },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = response.data;
      setResources(data);
      return data;
    } catch (error) {
      console.error("Error fetching resources:", error);
      throw error;
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakResponse = (text) => {
    if (!synthesisRef.current) {
      console.warn("Text-to-speech is not supported");
      return;
    }

    synthesisRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthesisRef.current.speak(utterance);
  };

  // Helper function to generate response based on user input
  const generateResponse = (messageText) => {
    const lowerInput = messageText.toLowerCase();
    
    // Case 1: Stokes' Law/Theorem
    if (lowerInput.includes("stokes") || lowerInput.includes("stoke's")) {
      return {
        text: `Stokes' Theorem relates a surface integral of a vector field over a surface \( S \) to the line integral of the vector field along the boundary curve of \( S \). Mathematically, it is written as:

\[
\oint_{\partial S} \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}
\]

In simple terms, it connects the circulation of the vector field around the boundary with the curl of the field over the surface.`,
        additionalComponent: (
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Download Resource</h3>
              <p>
                Here is a detailed PDF on Stokes' Theorem for further
                reading.
              </p>
              <a
                href="#"
                download="stokes_theorem.pdf"
                className="text-blue-400 underline mt-2 inline-block"
              >
                Download PDF
              </a>
            </div>

            <div className="bg-gray-800 text-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Reference Links</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Stokes%27_theorem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Stokes' Theorem on Wikipedia
                  </a>
                </li>
                <li>
                  <a
                    href="https://mathinsight.org/stokes_theorem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Stokes' Theorem Explanation - Math Insight
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.khanacademy.org/math/multivariable-calculus/greens-theorem-and-stokes-theorem/stokes-theorem/v/overview-of-stokes-theorem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Khan Academy: Stokes' Theorem Video
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )
      };
    }
    
    // Case 2: Credits
    else if (lowerInput.includes("credit")) {
      return {
        text: `Credit Requirements for Degree Completion:

• 160 Total Credits Required
• 100 Credits from Mandatory Courses
• 20 Credits from Modern Learning Components (MLC)
• 40 Credits from Core Subject Courses

Credits are allocated based on course difficulty, contact hours, and academic value. Most core courses are worth 4 credits, while laboratory components typically add 2 additional credits.`,
        additionalComponent: (
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow mt-4">
            <h3 className="text-lg font-semibold">Credit Distribution Overview</h3>
            <div className="mt-3">
              <div className="flex justify-between border-b border-gray-600 pb-2">
                <span>Mandatory Courses:</span>
                <span className="font-medium">100 Credits</span>
              </div>
              <div className="flex justify-between border-b border-gray-600 py-2">
                <span>Modern Learning Components:</span>
                <span className="font-medium">20 Credits</span>
              </div>
              <div className="flex justify-between border-b border-gray-600 py-2">
                <span>Core Subject Courses:</span>
                <span className="font-medium">40 Credits</span>
              </div>
              <div className="flex justify-between pt-2 font-semibold">
                <span>Total Required:</span>
                <span>160 Credits</span>
              </div>
            </div>
          </div>
        )
      };
    }
    
    // Case 3: Minor Courses
    else if (lowerInput.includes("minor")) {
      return {
        text: `Minor courses allow students to explore secondary fields of interest outside their major. To earn a minor, you typically need to complete 20-24 credits in the chosen discipline.

Available Minor Programs:
• Computer Science
• Data Science
• Business Administration
• Robotics
• Material Science
• Physics
• Mathematics
• Renewable Energy

Requirements for a minor typically include 5-6 courses in the selected discipline, with at least 2 courses at the advanced level.`,
        additionalComponent: (
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Popular Minor Combinations</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>Engineering major + Computer Science minor</li>
                <li>Physics major + Mathematics minor</li>
                <li>Environmental Science major + Renewable Energy minor</li>
                <li>Computer Science major + Business Administration minor</li>
              </ul>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Application Process</h3>
              <ol className="list-decimal pl-5 mt-2">
                <li>Complete at least 40 credits in your major program</li>
                <li>Submit the Minor Declaration Form to the Registrar's Office</li>
                <li>Meet with the minor program advisor to plan your course sequence</li>
                <li>Complete all required courses with a minimum GPA of 2.5</li>
              </ol>
            </div>
          </div>
        )
      };
    }
    
    // Case 4: Course Drop
    else if (lowerInput.includes("drop") && (lowerInput.includes("course") || lowerInput.includes("class"))) {
      return {
        text: `Course Drop Process:

1. During Add/Drop Period (First 2 weeks):
   - No academic penalty
   - Full tuition refund
   - No record on transcript

2. During Withdrawal Period (Weeks 3-10):
   - "W" grade on transcript
   - Partial tuition refund (based on withdrawal date)
   - Does not affect GPA

3. After Week 10:
   - Requires dean's approval
   - "WF" grade (counts as F in GPA)
   - No tuition refund`,
        additionalComponent: (
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow mt-4">
            <h3 className="text-lg font-semibold">How to Drop a Course</h3>
            <ol className="list-decimal pl-5 mt-2 space-y-2">
              <li>Log in to the Student Portal</li>
              <li>Navigate to "Registration & Records" section</li>
              <li>Select "Add/Drop Courses"</li>
              <li>Choose the course you wish to drop</li>
              <li>Submit the request</li>
              <li>Confirm with your academic advisor</li>
              <li>Check for confirmation email</li>
            </ol>
            <div className="mt-4 p-3 bg-yellow-800 rounded-lg">
              <p className="font-semibold">Important Note:</p>
              <p>Dropping below 12 credits may affect your full-time status, financial aid eligibility, and on-campus housing status.</p>
            </div>
          </div>
        )
      };
    }
    
    // Default response if none of the cases match
    else {
      return {
        text: `I'm your academic assistant. I can help with information about:

• Stokes' theorem and other academic concepts
• Credit requirements for graduation
• Minor programs and requirements
• Course drop procedures

Please ask me about any of these topics!`,
        additionalComponent: null
      };
    }
  };

  const sendMessage = async (messageText = input) => {
    if (messageText.trim()) {
      // Add user message
      const userMessage = {
        text: messageText,
        sender: "user",
        id: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Add processing message
      const botProcessingMessage = {
        text: "Processing your request...",
        sender: "bot",
        id: Date.now() + 1,
      };
      setMessages((prevMessages) => [...prevMessages, botProcessingMessage]);

      // Generate response based on input
      setTimeout(() => {
        // Remove processing message
        setMessages((prevMessages) => 
          prevMessages.filter(msg => msg.id !== botProcessingMessage.id)
        );
        
        // Generate and add the actual response
        const response = generateResponse(messageText);
        
        // Add text response
        const botTextMessage = {
          text: response.text,
          sender: "bot",
          id: Date.now() + 2,
        };
        setMessages((prevMessages) => [...prevMessages, botTextMessage]);
        
        // Read the message aloud
        speakResponse(response.text);
        
        // Add additional component if available
        if (response.additionalComponent) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              component: response.additionalComponent,
              sender: "bot",
              id: Date.now() + 3,
            },
          ]);
        }
        
        setInput("");
      }, 1500); // Simulate 1.5 seconds processing time
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="relative w-full h-full pb-10">
      <div className="flex flex-col mx-auto bg-[#242424] rounded-3xl shadow-xl overflow-hidden w-full h-full">
        {/* Chat Messages */}
        <div className="relative flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar px-16">
          <div>
            <AcademicStarterSection />
          </div>

          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`items-start space-x-3 ${
                message.sender === "user" ? "flex justify-end" : ""
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-3xl ${
                  message.sender === "user"
                    ? "bg-[#303030] text-white shadow-md"
                    : "text-white border-[#494949] border-[0.1px]"
                }`}
              >
                {message.component ? (
                  message.component
                ) : (
                  <p className="whitespace-pre-wrap">{message.text}</p>
                )}
              </div>
              {message.sender === "user" && (
                <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Area */}
        <div className="p-2 absolute bottom-0 left-0 bg-[#303030] flex items-center mx-16 mb-2 mt-2 rounded-full w-full max-w-[1100px] justify-center z-[1000]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-3 rounded-l-full border-none focus:outline-none bg-[#303030] text-white"
            placeholder="Type your message..."
          />
          <div className="flex items-center">
            <button
              onClick={toggleVoiceInput}
              className={`p-3 text-white rounded-full mr-2 transition-all ${
                isListening ? "bg-red-600" : "bg-gray-600"
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button
              onClick={() => sendMessage()}
              className="p-3 bg-[#808080] text-white rounded-full hover:bg-blue-600 transition-all flex items-center"
            >
              <Send size={20} className="mr-2" /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicAssistant;