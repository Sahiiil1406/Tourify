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
	const sendMessage = async (messageText = input) => {
		if (messageText.trim()) {
			const userMessage = {
				text: messageText,
				sender: "user",
				id: messages.length + 1,
			};
			setMessages((prevMessages) => [...prevMessages, userMessage]);

			const botResponse = {
				text: "Fetching academic resources...",
				sender: "bot",
				id: messages.length + 2,
			};
			setMessages((prevMessages) => [...prevMessages, botResponse]);

			// Simulate delay for fetching response
			setTimeout(() => {
				const stokesTheoremExplanation = `
                    Stokes' Theorem relates a surface integral of a vector field over a surface \( S \) to the line integral of the vector field along the boundary curve of \( S \). Mathematically, it is written as:
    
                    \[
                    \oint_{\partial S} \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}
                    \]
    
                    In simple terms, it connects the circulation of the vector field around the boundary with the curl of the field over the surface.
                `;

				const botTextMessage = {
					text: stokesTheoremExplanation,
					sender: "bot",
					id: messages.length + 3,
				};
				setMessages((prevMessages) => [...prevMessages, botTextMessage]);

				speakResponse(stokesTheoremExplanation);

				// Add a download and reference links component
				setMessages((prevMessages) => [
					...prevMessages,
					{
						component: (
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
						),
						sender: "bot",
						id: messages.length + 4,
					},
				]);

				setInput("");
			}, 3000); // Simulate 3 seconds delay
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
							className={`items-start space-x-3  ${
								message.sender === "user" ? " flex justify-end" : ""
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
						className="flex-1 p-3 rounded-l-full border-none focus:outline-none bg-[#303030]"
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
							onClick={sendMessage}
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
