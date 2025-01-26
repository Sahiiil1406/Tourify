import React, { useState } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { MdChat } from "react-icons/md";

import Sidebar from "./components/sidebar";
import { Route, Routes } from "react-router";
import "./index.css";
import ChatInterface from "./pages/ChatInterface";
import TravelPlanner from "./pages/TravelPlanner";
const App = () => {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="bg-[#1c1c1c] w-full h-full pt-16  p-4">
				<div
					style={{ boxShadow: "0px 0px 20px 10px #00000008" }}
					className="w-full h-full flex flex-col  bg-[#1c1c1c] rounded-3xl overflow-hidden  "
				>
					<Routes>
						<Route path="/" element={<ChatInterface />} />

						<Route path="/travel-planner" element={<TravelPlanner />} />
						{/* <Route
								path="/academic-assistant"
								element={<AcademicAssistant />}
							/>
							<Route path="/schedule-manager" element={<ScheduleManager />} />
							<Route path="/manage-data" element={<ManageData />} /> */}
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default App;
