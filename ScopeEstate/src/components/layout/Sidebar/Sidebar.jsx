import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutContext } from "../LayoutProvider";
import { FiChevronLeft, FiChevronRight, FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen,darkMode } = useContext(LayoutContext);
   const [openedByHover, setOpenedByHover] = useState(false);
  const location = useLocation();
  
   const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
    setOpenedByHover(false); 
  };

   const handleMouseEnter = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      setOpenedByHover(true);
    }
  };
    const handleMouseLeave = () => {
    if (openedByHover) {
      setSidebarOpen(false);
      setOpenedByHover(false);
    }
  };

  // Removed handleMouseLeave since we don't want to close on mouse leave

  const navItems = [
    { label: "Dashboard", icon: "🏠", path: "/dashboard" },
    { label: "Packages", icon: "📦", path: "/packages" },
    { label: "Companies", icon: "🏢", path: "/companies" },
    { label: "Billing", icon: "💳", path: "/billing" },
    { label: "Admin FAQ", icon: "❓", path: "/faq" },
    { label: "Super Admin", icon: "👑", path: "/super-admin" },
    { label: "Offline Request", icon: "📴", path: "/offline-request" },
    { label: "Support Ticket", icon: "🎫", path: "/support" },
    { label: "Front Settings", icon: "🌐", path: "/front-settings" },
    { label: "Settings", icon: "⚙️", path: "/settings" },
  ];

  return (
    <div className="flex flex-col h-full">
      <aside
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  className={`bg-white shadow-md transition-[width] duration-500 ease-in-out flex flex-col overflow-hidden ${
    sidebarOpen ? "w-64" : "w-20"
  }`}
  aria-label="Main navigation"
>
  {/* Static Top Section */}
  <div className="flex-shrink-0 p-4">
    <div className="flex items-center justify-center mb-6">
      <Link to="/" className="text-pink-600 font-bold text-xl hover:text-pink-700">
        {sidebarOpen ? "Worksuite" : "W"}
      </Link>
    </div>

    {/* User Profile */}
    <div className={`flex items-center ${sidebarOpen ? "gap-3" : "justify-center"} mb-2 p-2`}>
      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
        MS
      </div>
      {sidebarOpen && (
        <div>
          <div className="font-medium">Matt Strosin</div>
          <div className="text-xs text-gray-500">Admin</div>
        </div>
      )}
    </div>
  </div>

  {/* Scrollable Nav Section */}
  <nav className="flex-1 overflow-y-auto overflow-x-hidden thin-scrollbar py-2 px-3 space-y-1">
    {navItems.map((item) => (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center ${
          sidebarOpen ? "gap-3 px-3 py-2" : "justify-center p-2"
        } rounded-md transition-colors ${
          location.pathname === item.path
            ? "bg-blue-100 text-blue-600 font-medium"
            : "hover:bg-gray-100 text-gray-700"
        }`}
        title={item.label}
      >
        <span aria-hidden="true" className="text-lg">
          {item.icon}
        </span>
        {sidebarOpen && (
          <span className="text-sm">
            {item.label}
            {location.pathname === item.path && <span className="sr-only">(current)</span>}
          </span>
        )}
      </Link>
    ))}
  </nav>
</aside>


      {/* Toggle Button */}
     <div className="flex-shrink-0 p-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleSidebar}
          className={`rounded-full p-1 shadow-md transition-colors ${
            darkMode 
              ? "bg-gray-700 border-gray-600 hover:bg-gray-600" 
              : "bg-white border-gray-200 hover:bg-gray-100"
          } border ${
            sidebarOpen ? "ml-auto" : "mx-auto"
          }`}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? (
            <FiChevronLeft className={`w-4 h-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`} />
          ) : (
            <FiChevronRight className={`w-4 h-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`} />
          )}
        </button>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed  left-2 top-4 z-20 bg-white border border-gray-200 rounded-full  shadow-md hover:bg-gray-100"
        aria-label="Toggle sidebar"
      >
        <FiMenu className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};

export default Sidebar;