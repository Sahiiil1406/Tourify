import React, { useState } from "react";
import {
	AiOutlineHome,
	AiOutlineSetting,
	AiOutlineCompass,
	AiOutlineCalendar,
	AiOutlineDatabase,
	AiOutlineMenu,
	AiFillCode
} from "react-icons/ai";
import { MdChat, MdSchool } from "react-icons/md";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div
			style={{ backgroundColor: "#00000000" }}
			className={`text-white h-full transition-width duration-300 ${
				isCollapsed ? "w-[80px]" : "w-64"
			}`}
		>
			<button
				onClick={() => setIsCollapsed(!isCollapsed)}
				className="p-4 focus:outline-none"
			>
				<AiOutlineMenu size={24} />
			</button>
			<div className="flex flex-col space-y-4 mt-8">
				<SidebarItem
					icon={
						<span className=" p-4 mr-4 rounded-full bg-purple-800/20 ">
							<AiOutlineCompass className="text-purple-200 " />
						</span>
					}
					label="Travel Planner"
					route="/travel-planner"
					isCollapsed={isCollapsed}
				/>
				<SidebarItem
					icon={
						<span className=" p-4 mr-4 rounded-full bg-orange-800/20 ">
							<MdSchool className="text-orange-200 " />
						</span>
					}
					label="Academic Assistant"
					route="/academic-assistant"
					isCollapsed={isCollapsed}
				/>
				<SidebarItem
					icon={
						<span className=" p-4 mr-4 rounded-full bg-green-800/20">
							<AiOutlineCalendar className="text-green-200 " />
						</span>
					}
					label="Schedule Manager"
					route="/schedule-manager"
					isCollapsed={isCollapsed}
				/>
				<SidebarItem
					icon={
						<span className=" p-4 mr-4 rounded-full bg-green-800/20">
							<AiFillCode className="text-green-200 " />
						</span>
					}
					label="Reviews"
					route="/reviews"
					isCollapsed={isCollapsed}
				/>
				<SidebarItem
					icon={
						<span className=" p-4 mr-4 rounded-full bg-blue-800/20 ">
							<AiOutlineDatabase className="text-blue-200 " />
						</span>
					}
					label="Manage Data"
					route="/manage-data"
					isCollapsed={isCollapsed}
				/>
			</div>
		</div>
	);
};

const SidebarItem = ({ icon, label, route, isCollapsed }) => (
	<Link
		to={route}
		className="flex items-center space-x-4 p-4 hover:bg-gray-700 cursor-pointer bg-[#242424] border-gray-700 rounded-r-full border border-l-0 text-semibold texl-xl min-w-[80px]"
	>
		{icon}
		{!isCollapsed && <span className="font-semibold">{label}</span>}
	</Link>
);

export default Sidebar;
