import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import { LayoutContext } from "./LayoutProvider";

const Layout = () => {
  const { darkMode, sidebarOpen } = useContext(LayoutContext);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      {/* Fixed Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50  ${sidebarOpen ? "md:ml-64" : "ml-24"}`}>
        <Navbar />
      </div> 

      {/* Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Scrollable Sidebar */}
        <div 
          className={`fixed h-full top-0 transition-all duration-300 ease-in-out 
          ${sidebarOpen ? "w-60 left-0" : "w-20 left-0"} 
          ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
        >
          <Sidebar />
        </div>

        {/* Scrollable Main Content */}
        <main
          className={`flex-1 overflow-y-auto thin-scrollbar h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out ${
            sidebarOpen ? "md:ml-60" : "ml-20"
          } ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
        >
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;