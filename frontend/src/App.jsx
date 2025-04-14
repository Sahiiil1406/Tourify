import React, { useState } from "react";
import {
	AiOutlineHome,
	AiOutlineRobot,
	AiOutlineSetting,
} from "react-icons/ai";
import { MdChat } from "react-icons/md";
import Maps from "./pages/Maps";

import Sidebar from "./components/sidebar";
import { Route, Routes } from "react-router";
import "./index.css";
import ChatInterface from "./pages/ChatInterface";
import TravelPlanner from "./pages/TravelPlanner";
import AcademicAssistant from "./pages/AcademicAssistant";
import ScheduleManager from "./pages/ScheduleManager";
import DataManagementDashboard from "./pages/ManageData";
import MapBox from "./pages/Mapbox"
import Reviews from "./pages/Reviews";

const App = () => {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="bg-[#1c1c1c] w-full h-screen	 p-4 pt-0">
				<nav className="bg-none h-16 flex items-center justify-between px-8 shadow-lg">
					{/* Logo and Name */}
					<div className="flex items-center space-x-4">
						<AiOutlineRobot className="text-purple-500" size={32} />
						<span>
							<img
								src="https://intranet.nitk.ac.in/facility/nitk_logo_white.png"
								alt=""
								className="h-8"
							/>
						</span>
						<span className="text-white text-2xl font-semibold">
							<b>NITK</b>
							<i className="opacity-70"> AI Agent</i>
						</span>
					</div>

					{/* Add any additional content like navigation links or buttons */}
					<div className="text-white">
						{/* Optional content like links/buttons */}
					</div>
				</nav>
				<div
					style={{ boxShadow: "0px 0px 20px 10px #00000008" }}
					className="w-full h-[90vh] max-h-[90vh] flex flex-col  bg-[#1c1c1c] rounded-3xl overflow-hidden  "
				>
					<Routes>
						<Route path="/" element={<ChatInterface />} />

						<Route path="/travel-planner" element={<TravelPlanner />} />
						<Route path="/academic-assistant" element={<AcademicAssistant />} />
						<Route path="/schedule-manager" element={<ScheduleManager />} />
						<Route path="/manage-data" element={<DataManagementDashboard />} />
						<Route path="/maps" element={<Maps />} />
						<Route path="/x" element={<MapBox />} />
						<Route path="/reviews" element={<Reviews />} />

					</Routes>
				</div>
			</div>
		</div>
	);
};

export default App;
