import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Send, User, Bot } from "lucide-react";
import { motion } from "framer-motion";

const ChatInterface = () => {
	const [messages, setMessages] = useState([
		{
			text: "# Welcome to the Chatbot UI!",
			sender: "bot",
			id: 1,
		},
		{
			text: "**How can I assist you today?**",
			sender: "bot",
			id: 2,
		},
	]);
	const [input, setInput] = useState("");
	const messagesEndRef = useRef(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const sendMessage = () => {
		if (input.trim()) {
			const userMessage = {
				text: input,
				sender: "user",
			};
			setMessages((prevMessages) => [...prevMessages, userMessage]);

			const botResponse = {
				text: `This is a placeholder response.`,
				sender: "bot",
			};

			setInput("");
			setMessages((prevMessages) => [...prevMessages, botResponse]);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			sendMessage();
		}
	};

	return (
		<div className="relative w-full h-full pb-10">
			<div className="flex flex-col  mx-auto bg-[#242424] rounded-3xl shadow-xl overflow-hidden w-full h-full ">
				{/* Header
       <div className="bg-gray-400 text-white py-3 px-4 flex items-center justify-between">
           <h1 className="text-lg font-semibold">Chatbot</h1>
           <div className="flex items-center space-x-2">
               <Bot size={24} />
               <p className="text-sm">Online</p>
           </div>
       </div> */}

				{/* Chat Messages */}
				<div className=" relative flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar px-16 ">
					{messages.map((message) => (
						<motion.div
							key={message.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className={`flex items-start space-x-3  ${
								message.sender === "user" ? "justify-end" : "justify-start "
							}`}
						>
							{message.sender === "bot" && (
								<div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center">
									<Bot size={20} />
								</div>
							)}
							<div
								className={`max-w-[80%] p-3 rounded-3xl ${
									message.sender === "user"
										? "bg-[#303030] text-white shadow-md "
										: " text-white border-[#494949] border-[0.1px]"
								}`}
							>
								<ReactMarkdown
									components={{
										h1: ({ node, ...props }) => (
											<h1 className="text-xl font-bold mb-2" {...props} />
										),
										strong: ({ node, ...props }) => (
											<strong className="font-bold" {...props} />
										),
										em: ({ node, ...props }) => (
											<em className="italic" {...props} />
										),
									}}
								>
									{message.text}
								</ReactMarkdown>
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
			</div>
			<div className="p-2 absolute bottom-0 left-0 bg-[#303030] flex items-center mx-16  mb-2 mt-2 rounded-full w-full max-w-[1100px]  justify-center">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyPress={handleKeyPress}
					className="flex-1 p-3 rounded-l-full border border-none focus:outline-none focus:ring-2 focus:ring-none bg-[#303030]"
					placeholder="Type your message..."
				/>
				<button
					onClick={sendMessage}
					className="p-3 bg-[#808080] text-white rounded-full hover:bg-blue-600 transition-all flex items-center"
				>
					<Send size={20} className="mr-2" /> Send
				</button>
			</div>
		</div>
	);
};

export default ChatInterface;
