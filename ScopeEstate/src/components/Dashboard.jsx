import React, { useState, useEffect, useRef } from "react";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [companyRows, setCompanyRows] = useState([]);
  const [search, setSearch] = useState("");
  const dropdownRefs = useRef({});

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleDropdown = (id) =>
    setDropdownOpenId(dropdownOpenId === id ? null : id);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideAny = Object.entries(dropdownRefs.current).some(
        ([key, ref]) => {
          if (!ref) return false;
          return (
            ref.contains(event.target) ||
            ref.querySelector("button")?.contains(event.target)
          );
        }
      );
      if (!isClickInsideAny) {
        setDropdownOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCompanyRows([
      {
        id: 1,
        name: "staryush Co",
        package: "Default (Monthly)",
        registered: "1 month ago",
        employees: "12/20",
        clients: 11,
        users: 23,
        lastActivity: "34 minutes ago",
        status: "Active",
      },
      {
        id: 2,
        name: "Suraj & Co",
        package: "Default (Monthly)",
        registered: "6 months ago",
        employees: "12/20",
        clients: 11,
        users: 23,
        lastActivity: "--",
        status: "Active",
      },
      {
        id: 3,
        name: "Deepak Worksuite",
        package: "Default (Monthly)",
        registered: "1 month ago",
        employees: "12/20",
        clients: 11,
        users: 23,
        lastActivity: "34 minutes ago",
        status: "Active",
      },
      {
        id: 4,
        name: "Feest PLC",
        package: "Default (Monthly)",
        registered: "6 months ago",
        employees: "12/20",
        clients: 11,
        users: 23,
        lastActivity: "--",
        status: "Active",
      },
    ]);
  }, []);

  const addCompany = () => {
    const newCompany = {
      id: companyRows.length + 1,
      name: "New Company",
      package: "Default (Monthly)",
      registered: "Just now",
      employees: "0/20",
      clients: 0,
      users: 0,
      lastActivity: "--",
      status: "Active",
    };
    setCompanyRows([...companyRows, newCompany]);
  };

  const deleteCompany = (id) => {
    setCompanyRows(companyRows.filter((company) => company.id !== id));
  };

  const filteredRows = companyRows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const navItems = [
    { label: "Dashboard", icon: "🏠" },
    { label: "Packages", icon: "📦" },
    { label: "Companies", icon: "🏢" },
    { label: "Billing", icon: "💳" },
    { label: "Admin FAQ", icon: "❓" },
    { label: "Support Ticket", icon: "🎫" },
    { label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className={`bg-white shadow-md transition-[width] duration-500 ease-in-out p-4 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-center mb-6">
          <div className="text-pink-600 font-bold text-xl">
            {sidebarOpen ? "Worksuite" : "W"}
          </div>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded cursor-pointer"
            >
              <span>{item.icon}</span>
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Companies</h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
          <div className="flex gap-2">
            <button
              onClick={addCompany}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              + Add Company
            </button>
            <button className="bg-white border px-4 py-2 rounded shadow-sm">
              Export
            </button>
          </div>

          {/* Search input with Clear button */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border rounded w-full pr-8"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 text-sm"
                title="Clear search"
              >
                ❌
              </button>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Company Name</th>
                <th className="p-3 text-left">Package</th>
                <th className="p-3 text-left">Details</th>
                <th className="p-3 text-left">Last Activity</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{row.id}</td>
                  <td className="p-3">
                    <a href="#" className="text-blue-600 hover:underline">
                      {row.name}
                    </a>
                  </td>
                  <td className="p-3">
                    <div>{row.package}</div>
                    <button className="text-sm mt-1 border border-black text-black px-2 py-0.5 rounded hover:bg-black hover:text-white">
                      Change
                    </button>
                  </td>
                  <td className="p-3">
                    <div>Register Date: {row.registered}</div>
                    <div>Employees: {row.employees}</div>
                    <div>Clients: {row.clients}</div>
                    <div>Total Users: {row.users}</div>
                  </td>
                  <td className="p-3">{row.lastActivity}</td>
                  <td className="p-3">
                    <span className="text-green-600 font-semibold">
                      ● {row.status}
                    </span>
                  </td>
                  <td
                    className="p-3 text-center relative"
                    ref={(el) => (dropdownRefs.current[row.id] = el)}
                  >
                    <button
                      className="px-2 py-1 text-lg hover:bg-gray-200 rounded"
                      onClick={() => handleDropdown(row.id)}
                    >
                      ⋮
                    </button>
                    {dropdownOpenId === row.id && (
                      <div
                        className={`absolute right-2 ${
                          index === filteredRows.length - 1
                            ? "bottom-10"
                            : "top-8"
                        } bg-white border shadow rounded w-32 text-left z-10`}
                      >
                        <button className="block px-4 py-2 hover:bg-gray-100 w-full text-sm">
                          View
                        </button>
                        <button className="block px-4 py-2 hover:bg-gray-100 w-full text-sm">
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCompany(row.id)}
                          className="block px-4 py-2 hover:bg-gray-100 w-full text-sm text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
