import React from "react";
import "./LoadingAnimation.css"; // Import the CSS file

const Loader = () => {
	return (
		<div className="grotesk  h-[200vh] w-full flex justify-center items-center text-2xl font-semibold flex-col gap-8 text-blue-400">
			<img
				className="absolute top-[0] left-[0] w-[100%] pointer-events-none z-[10]"
				src="glow.svg"
				alt=""
			/>
			<span className="loader"></span>
		</div>
	);
};

export default Loader;
