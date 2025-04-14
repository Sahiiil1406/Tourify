import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { Send, User, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import StarterSection from "@/components/Greeting";

// Component to handle map view update when location changes
const LocationMarker = ({ position, setPosition }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);
  
  return null;
};

const MapBox = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [plan, setPlan] = useState(null);
	const [isListening, setIsListening] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [currentLocation, setCurrentLocation] = useState(null);
	const [locationError, setLocationError] = useState(null);
	const [isLoadingLocation, setIsLoadingLocation] = useState(true);
	const messagesEndRef = useRef(null);
	const recognitionRef = useRef(null);
	const synthesisRef = useRef(null);
	const mapRef = useRef(null);

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

	// Separate useEffect for geolocation to make it more reliable
	useEffect(() => {
		setIsLoadingLocation(true);
		setLocationError(null);
		
		// Get current location with updated error handling
		const getLocation = () => {
			if (!navigator.geolocation) {
				setLocationError("Geolocation is not supported by your browser");
				setIsLoadingLocation(false);
				// Set default location
				setCurrentLocation({ lat: 13.007858646548794, lng: 74.79507212291739 });
				return;
			}
			
			const success = (position) => {
				const { latitude, longitude } = position.coords;
				console.log("Location found:", latitude, longitude);
				setCurrentLocation({ lat: latitude, lng: longitude });
				setIsLoadingLocation(false);
			};
			
			const error = (err) => {
				console.error("Error getting location:", err);
				setLocationError(`Error getting location: ${err.message}`);
				setIsLoadingLocation(false);
				// Set default location on error
				setCurrentLocation({ lat: 13.007858646548794, lng: 74.79507212291739 });
			};
			
			// Options to get more accurate position
			const options = {
				enableHighAccuracy: true, // Use GPS if available
				timeout: 10000,          // Time to wait before error (10 seconds)
				maximumAge: 0            // Don't use cached position
			};
			
			// Request position with improved options
			navigator.geolocation.getCurrentPosition(success, error, options);
		};
		
		getLocation();
		
		// Add event listener for when the device changes location (useful for mobile)
		const watchId = navigator.geolocation && navigator.geolocation.watchPosition(
			(position) => {
				setCurrentLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
				setIsLoadingLocation(false);
			},
			(err) => {
				console.warn("Error watching position:", err);
			},
			{ enableHighAccuracy: true }
		);
		
		// Cleanup watchPosition
		return () => {
			if (watchId && navigator.geolocation) {
				navigator.geolocation.clearWatch(watchId);
			}
		};
	}, []);

	const fetchPlan = async (question = "hello") => {
		try {
			const response = await axios.post(
				"http://localhost:5000/ai",
				{
					question: question,
					location: currentLocation // Send current location to backend
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

	// Create custom icons for current location (blue) and destinations (red)
	const blueIcon = new L.Icon({
		iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
		shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

	const redIcon = new L.Icon({
		iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
		shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

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

			try {
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

				// Calculate map center - use the first destination or current location if available
				const mapCenter = plan.length > 0 && plan[0].coordinates ? 
					[plan[0].coordinates.lat, plan[0].coordinates.lng] : 
					currentLocation ? [currentLocation.lat, currentLocation.lng] : [13.007858646548794, 74.79507212291739];
				
				// Create map component with paths
				const MapWithPaths = () => {
					return (
						<MapContainer
							center={mapCenter}
							zoom={13} // Reduced zoom level for better visibility
							style={{
								height: "100%",
								width: "100%",
								borderRadius: "30px",
								overflow: "hidden",
							}}
							ref={mapRef}
						>
							<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
							
							{/* Add LocationMarker component to update view when location changes */}
							<LocationMarker 
								position={currentLocation ? [currentLocation.lat, currentLocation.lng] : null}
								setPosition={setCurrentLocation}
							/>
							
							{/* Current location marker (blue) */}
							{currentLocation && (
								<Marker
									position={[currentLocation.lat, currentLocation.lng]}
									icon={blueIcon}
								>
									<Popup>Your Current Location</Popup>
								</Marker>
							)}
							
							{/* Destination markers (red) */}
							{plan.map((item, index) => {
								if (!item.coordinates) return null;
								
								return (
									<React.Fragment key={index}>
										<Marker
											position={[
												item.coordinates.lat || 0,
												item.coordinates.lng || 0,
											]}
											icon={redIcon}
										>
											<Popup>{item.location}</Popup>
										</Marker>
										
										{/* Polyline from current location to this destination */}
										{currentLocation && (
											<Polyline
												positions={[
													[currentLocation.lat, currentLocation.lng],
													[item.coordinates.lat || 0, item.coordinates.lng || 0]
												]}
												pathOptions={{ color: 'blue', weight: 4 }}
											/>
										)}
									</React.Fragment>
								);
							})}
						</MapContainer>
					);
				};

				// Display the map
				setMessages((prevMessages) => [
					...prevMessages,
					{
						component: (
							<div style={{ height: "400px", width: "100%" }}>
								{locationError ? (
									<div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
										<p>{locationError}</p>
										<p>Using default location instead.</p>
									</div>
								) : isLoadingLocation ? (
									<div className="flex justify-center items-center h-full">
										<p>Loading your location...</p>
									</div>
								) : (
									<MapWithPaths />
								)}
							</div>
						),
						sender: "bot",
						id: messages.length + 5,
					},
				]);

			} catch (error) {
				console.error("Error in sendMessage:", error);
				// Add error message
				setMessages((prevMessages) => [
					...prevMessages,
					{
						text: "Sorry, I couldn't process your request. Please try again.",
						sender: "bot",
						id: messages.length + 3,
					},
				]);
			}

			setInput("");
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

export default MapBox;