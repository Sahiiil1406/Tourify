import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const StartLoader = ({ onComplete }) => {
	const [loading, setLoading] = useState(true);
	const [stateIndex, setStateIndex] = useState(0);

	const states = [
		{ color: "#001930", text: "Innovate." }, // Dark Blue
		{ color: "#000000", text: "Create." }, // Black
		{ color: "#f34c19", text: "Inspire." }, // Orange
	];

	useEffect(() => {
		// Cycle through the states every 600ms
		const interval = setInterval(() => {
			setStateIndex((prev) => {
				if (prev === states.length - 1) {
					// If we reach the last state, clear the interval
					clearInterval(interval);
					setTimeout(() => {
						setLoading(false);
						if (onComplete) onComplete(); // Call onComplete when done
					}, 100); // Allow some delay before sliding up
					return prev;
				}
				return prev + 1;
			});
		}, 600); // Change text every 600ms

		return () => {
			clearInterval(interval);
		};
	}, [onComplete]); // Add onComplete to dependencies

	return (
		<motion.div
			className="fixed z-[60] w-full h-[100vh] top-0 flex items-center justify-center"
			initial={{ y: 0, backgroundColor: states[0].color }}
			animate={{
				y: loading ? 0 : "-100vh", // Slide up after loading ends
				backgroundColor: states[stateIndex].color, // Sudden color change based on state
			}}
			transition={{
				y: { duration: 1, ease: "easeInOut" }, // Smooth slide up
				backgroundColor: { duration: 0 }, // Sudden color change
			}}
		>
			<motion.h1
				initial={{ opacity: 1 }}
				animate={{ opacity: loading ? 1 : 0 }} // Fade out when loading ends
				transition={{ duration: 1 }}
				className="md:text-8xl text-6xl font-bold text-white"
			>
				{states[stateIndex].text} {/* Display text based on current state */}
			</motion.h1>
		</motion.div>
	);
};

export default StartLoader;
