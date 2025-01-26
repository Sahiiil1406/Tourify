import React from "react";
import { Home, User, Settings } from "lucide-react"; // Import icons from Lucide React

export default function Navbar() {
	return (
		<nav className="bg-black text-white p-4 flex items-center justify-between">
			{/* Main Name/Brand */}
			<div className="text-xl font-bold">DevDao</div>

			{/* Icons */}
			<div className="flex space-x-6">
				<a href="#" className="hover:text-gray-300">
					<Home size={24} />
				</a>
				<a href="#" className="hover:text-gray-300">
					<User size={24} />
				</a>
				<a href="#" className="hover:text-gray-300">
					<Settings size={24} />
				</a>
			</div>
		</nav>
	);
}
