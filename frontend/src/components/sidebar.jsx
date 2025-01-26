import React, { useState } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { MdChat } from "react-icons/md";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div
			style={{ backgroundColor: "#00000000" }}
			className={`text-white h-full transition-width duration-300 ${
				isCollapsed ? "w-16" : "w-64"
			}`}
		>
			<button
				onClick={() => setIsCollapsed(!isCollapsed)}
				className="p-4 focus:outline-none"
			>
				{isCollapsed ? "▶" : "◀"}
			</button>
			<div className="flex flex-col space-y-4 mt-8">
				<SidebarItem
					icon={<AiOutlineHome />}
					label="Travel Planner"
					route="/travel-planner"
					isCollapsed={isCollapsed}
				/>
				<SidebarItem
					icon={<MdChat />}
					label="Academic Assistant"
					route="/academic-assistant"
					isCollapsed={isCollapsed}
				/>
				<SidebarItem
					icon={<AiOutlineSetting />}
					label="Schedule Manager"
					route="/schedule-manager"
					isCollapsed={isCollapsed}
				/>
				<SidebarItem
					icon={<AiOutlineSetting />}
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
		className="flex items-center space-x-4 p-4 hover:bg-gray-700 cursor-pointer bg-[#242424]"
	>
		{icon}
		{!isCollapsed && <span>{label}</span>}
	</Link>
);

export default Sidebar;
