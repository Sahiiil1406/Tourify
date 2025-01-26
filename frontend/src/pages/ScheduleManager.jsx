import React, { useState, useEffect } from "react";
import { Calendar, Send, Moon, Sun } from "lucide-react"; // Icons from Lucide
import { format } from "date-fns"; // For formatting dates
import { motion } from "framer-motion"; // For animations
import ReactCalendar from "react-calendar"; // React Calendar
import "react-calendar/dist/Calendar.css"; // Calendar styles

// Simple event parser function to get the event name, date, and time from input
const parseEventDetails = (input) => {
	const eventDetails = {
		name: input.split("on")[0]?.trim(),
		date: null,
		time: null,
	};

	const dateMatch = input.match(/\d{1,2}(st|nd|rd|th)?\s\w+\s\d{4}?/i);
	const timeMatch = input.match(/\d{1,2}(AM|PM)/i);

	if (dateMatch) {
		eventDetails.date = new Date(Date.parse(dateMatch[0]));
	}

	if (timeMatch) {
		eventDetails.time = timeMatch[0];
	}

	return eventDetails;
};

export default function ScheduleManager() {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState([]);
	const [calendarEvents, setCalendarEvents] = useState([]);
	const [darkMode, setDarkMode] = useState(false); // Dark mode toggle
	const [selectedDate, setSelectedDate] = useState(new Date()); // For calendar date selection

	// Handle adding events after a delay
	useEffect(() => {
		if (input.trim()) {
			const delayId = setTimeout(() => {
				const newEvent = parseEventDetails(input);
				setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
				setTodos((prevTodos) => [...prevTodos, newEvent]);
				setInput(""); // Reset input field
			}, 2000); // Simulated delay of 2 seconds
			return () => clearTimeout(delayId);
		}
	}, [input]);

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			setInput(e.target.value);
		}
	};

	const sendMessage = () => {
		const newEvent = parseEventDetails(input);
		setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
		setTodos((prevTodos) => [...prevTodos, newEvent]);
		setInput(""); // Reset input after sending
	};

	// Toggle dark mode
	const toggleDarkMode = () => setDarkMode(!darkMode);

	return (
		<div
			className={`${
				darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
			} p-8 min-h-screen`}
		>
			{/* Schedule Manager Heading */}
			<h1 className="text-3xl font-bold flex items-center mb-6">
				<Calendar size={32} className="mr-2" /> Schedule Manager
			</h1>

			{/* Dark Mode Toggle */}
			<div className="flex justify-end mb-4">
				<button
					onClick={toggleDarkMode}
					className="p-3 rounded-full hover:bg-gray-300 transition"
				>
					{darkMode ? <Sun size={24} /> : <Moon size={24} />}
				</button>
			</div>

			{/* Input Section */}
			<div className="flex items-center mb-4">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="Add event (e.g., Club meet on 31st Jan 2025 8PM)"
					className={`p-3 border ${
						darkMode
							? "border-gray-700 bg-gray-800 text-white"
							: "border-gray-300"
					} rounded-md w-full mr-2`}
				/>
				<button
					onClick={sendMessage}
					className={`p-3 ${
						darkMode ? "bg-blue-700" : "bg-blue-500"
					} text-white rounded-md hover:bg-blue-600 transition`}
				>
					<Send size={20} />
				</button>
			</div>
			<div className="flex gap-20 w-full justify-center mt-8">
				{" "}
				{/* Calendar Section */}
				<div className="mb-8 bg">
					<h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
					<div className="space-y-4">
						{calendarEvents.map((event, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className={`p-4 ${
									darkMode ? "bg-gray-800" : "bg-blue-100"
								} rounded-lg`}
							>
								<h3 className="text-lg font-medium">{event.name}</h3>
								<p>
									{event.date
										? format(event.date, "MMMM d, yyyy")
										: "31st Jan 2025"}{" "}
									- {event.time ? event.time : "8PM"}
								</p>
							</motion.div>
						))}
					</div>
				</div>
				{/* React Calendar */}
				<div className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Calendar</h2>
					<ReactCalendar
						className={`rounded-lg shadow-md p-4 ${
							darkMode ? "bg-gray-800 text-white" : ""
						}`}
						onChange={setSelectedDate}
						value={selectedDate}
						tileClassName="p-2"
					/>
				</div>
				<div>
					<h2 className="text-2xl font-semibold mb-4">To-Do List</h2>
					<ul className="list-disc list-inside">
						{todos.map((todo, index) => (
							<motion.li
								key={index}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="mb-2"
							>
								{todo.name} -{" "}
								{todo.date ? format(todo.date, "MMMM d, yyyy") : "No Date"}{" "}
								{todo.time ? todo.time : ""}
							</motion.li>
						))}
					</ul>
				</div>
			</div>

			{/* To-Do List Section */}
		</div>
	);
}
