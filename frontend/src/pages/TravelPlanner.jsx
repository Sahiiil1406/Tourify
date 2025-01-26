import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Send, User, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import StarterSection from "@/components/Greeting";

const TravelPlanner = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [plan, setPlan] = useState(null);
	const [isListening, setIsListening] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const messagesEndRef = useRef(null);
	const recognitionRef = useRef(null);
	const synthesisRef = useRef(null);

	// Speech Recognition Setup
	useEffect(() => {
		// Check browser support for Web Speech API
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

	const fetchPlan = async (question = "hello") => {
		try {
			const response = await axios.post(
				"http://localhost:5000/ai",
				{
					question: question,
				},
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			const data = response.data;
			setPlan(data);
			return data;
		} catch (error) {
			console.error("Error fetching plan:", error);
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

		// Cancel any ongoing speech
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
				text: "Fetching your travel plan...",
				sender: "bot",
				id: messages.length + 2,
			};
			setMessages((prevMessages) => [...prevMessages, botResponse]);

			const response = await fetchPlan(messageText);
			const textualExplanation = response.textualExplanation;
			const plan = response.plan;

			// Add bot's textual response
			const botTextMessage = {
				text: textualExplanation,
				sender: "bot",
				id: messages.length + 3,
			};
			setMessages((prevMessages) => [...prevMessages, botTextMessage]);

			// Speak the response
			speakResponse(textualExplanation);

			// Display the plan in a table
			setMessages((prevMessages) => [
				...prevMessages,
				{
					component: (
						<table className="w-full bg-gray-800 text-white rounded-lg overflow-hidden">
							<thead>
								<tr className="bg-gray-700">
									<th className="py-2 px-4">Time</th>
									<th className="py-2 px-4">Location</th>
									<th className="py-2 px-4">Notes</th>
								</tr>
							</thead>
							<tbody>
								{plan.map((item, index) => (
									<tr key={index} className="border-t border-gray-600 ">
										<td className="py-2 px-4 ">{item.time}</td>
										<td className="py-2 px-4">{item.location}</td>
										<td className="py-2 px-4">{item.notes}</td>
									</tr>
								))}
							</tbody>
						</table>
					),
					sender: "bot",
					id: messages.length + 4,
				},
			]);

			// Display the plan on a map
			setMessages((prevMessages) => [
				...prevMessages,
				{
					component: (
						<div style={{ height: "400px", width: "100%" }}>
							<MapContainer
								center={[12.9712, 74.7925]}
								zoom={15}
								style={{ height: "100%", width: "100%" }}
							>
								<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
								{plan.map((item, index) => (
									<Marker
										key={index}
										position={[
											item.coordinates?.lat | "0",
											item.coordinates?.lng | "0",
										]}
										icon={customIcon}
									>
										<Popup>{item.location}</Popup>
									</Marker>
								))}
							</MapContainer>
						</div>
					),
					sender: "bot",
					id: messages.length + 5,
				},
			]);

			setInput("");
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			sendMessage();
		}
	};

	const customIcon = new L.Icon({
		iconUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
	});

	return (
		<div className="relative w-full h-full pb-10">
			<div className="flex flex-col mx-auto bg-[#242424] rounded-3xl shadow-xl overflow-hidden w-full h-full">
				{/* Chat Messages */}
				<div className="relative flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar px-16">
					<div>
						<StarterSection />
					</div>

					{messages.map((message) => (
						<motion.div
							key={message.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className={` items-start space-x-3  ${
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

export default TravelPlanner;
