import React, { useState, useEffect, useRef } from "react";
import CompanyAdd from "./CompanyAdd";
import Superadmin from "./SuperAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [companyRows, setCompanyRows] = useState([]);
  const [search, setSearch] = useState("");
  const dropdownRefs = useRef({});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
 const [isSuperOpen, setIsSuperOpen] = useState(false);
  const handleAddCompany = (formData) => {
    const newCompany = {
      id: companyRows.length + 1,
      name: formData.companyName,
      package: "Default (Monthly)",
      registered: "Just now",
      employees: "0/20",
      clients: 0,
      users: 0,
      lastActivity: "--",
      status: formData.status || "Active",
    };
    setCompanyRows([...companyRows, newCompany]);
    toast.success("Company added successfully!");
  };

  // SuperAdmin starts 
  <Superadmin
  isOpen={isSuperOpen}
  onClose={() => setIsSuperOpen(false)}
  onSave={(data) => console.log(data)}
/>

const handleSave = (data) => {
    console.log("Superadmin Saved:", data);
  };
  // SuperAdmin ends 


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
      }
    ]);
  }, []);

  // SuperAdmin Starts
  <button onClick={() => setIsSuperOpen(true)} className="bg-red-600 text-white px-4 py-2 rounded">
  + Add Superadmin
</button>
// SuperAdmin ends 

  const deleteCompany = (id) => {
    setCompanyRows(companyRows.filter((company) => company.id !== id));
    setDropdownOpenId(null);
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
    <>
  <Superadmin
        isOpen={isSuperOpen}
        onClose={() => setIsSuperOpen(false)}
        onSave={handleSave}
      />

      <div className="p-4">
        <button
          onClick={() => setIsSuperOpen(true)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          + Add Superadmin
        </button>
        </div>

      <ToastContainer />
      <CompanyAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleAddCompany}
      />
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

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Companies</h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setIsAddOpen(true)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                + Add Company
              </button>
            </div>

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
                    <td className="p-3">{row.name}</td>
                    <td className="p-3">{row.package}</td>
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
                          } bg-white border shadow rounded w-32 text-left z-50`}
                        >
                          <button
                            onClick={() => {
                              setSelectedCompany(row);
                              setIsViewOpen(true);
                              setDropdownOpenId(null);
                            }}
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCompany(row);
                              setIsEditOpen(true);
                              setDropdownOpenId(null);
                            }}
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-sm"
                          >
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

        {/* View Modal */}
        {isViewOpen && selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-96">
              <h2 className="text-lg font-bold mb-4">Company Details</h2>
              <p><strong>Name:</strong> {selectedCompany.name}</p>
              <p><strong>Package:</strong> {selectedCompany.package}</p>
              <p><strong>Registered:</strong> {selectedCompany.registered}</p>
              <p><strong>Employees:</strong> {selectedCompany.employees}</p>
              <p><strong>Clients:</strong> {selectedCompany.clients}</p>
              <p><strong>Users:</strong> {selectedCompany.users}</p>
              <p><strong>Status:</strong> {selectedCompany.status}</p>
              <div className="text-right mt-4">
                <button
                  onClick={() => setIsViewOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditOpen && selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-96">
              <h2 className="text-lg font-bold mb-4">Edit Company</h2>
              <input
                className="border p-2 w-full mb-2"
                value={selectedCompany.name}
                onChange={(e) =>
                  setSelectedCompany({ ...selectedCompany, name: e.target.value })
                }
              />
              <input
                className="border p-2 w-full mb-2"
                value={selectedCompany.package}
                onChange={(e) =>
                  setSelectedCompany({
                    ...selectedCompany,
                    package: e.target.value,
                  })
                }
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const updated = companyRows.map((company) =>
                      company.id === selectedCompany.id
                        ? selectedCompany
                        : company
                    );
                    setCompanyRows(updated);
                    setIsEditOpen(false);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
