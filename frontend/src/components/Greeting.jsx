import React from "react";
import { AiOutlineRobot } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const StarterSection = () => {
	const navigate = useNavigate();

	const suggestions = [
		{
			label: "Timing of HCC",
			action: () => alert("Timing of HCC"),
			color: "bg-blue-500/20",
		},
		{
			label: "Beaches Near Me",
			action: () => alert("Beaches Near You"),
			color: "bg-green-500/20",
		},
		{
			label: "Restaurants Near Me",
			action: () => alert("Restaurants Near You"),
			color: "bg-red-500/20",
		},
		{
			label: "Help",
			action: () => navigate("/help"),
			color: "bg-yellow-500/20",
		},
	];

	return (
		<div className="flex flex-col items-center justify-center h-full space-y-8  text-white p-8">
			{/* Bot Icon */}
			<div className="text-purple-500">
				<AiOutlineRobot size={64} />
			</div>

			{/* Greeting Section */}
			<div className="text-center">
				<h1 className="text-4xl font-bold"># Welcome to the Travel Planner!</h1>
				<p className="text-xl mt-2">How can I assist you today?</p>
			</div>

			{/* Suggestion Buttons in 2x2 Grid */}
			<div className="grid grid-cols-2 gap-4">
				{suggestions.map((suggestion, index) => (
					<button
						key={index}
						onClick={suggestion.action}
						className={`p-4 rounded-lg hover:opacity-90 transition-all text-white font-semibold ${suggestion.color}`}
					>
						{suggestion.label}
					</button>
				))}
			</div>
		</div>
	);
};

export default StarterSection;
