import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function SuperadminAdd({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Superadmin",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/40">
      <div
        className={`relative w-full sm:w-[95%] md:w-[85%] lg:w-[75%] xl:w-[70%] 
        bg-white h-full overflow-y-auto shadow-xl transform transition-transform duration-700 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 -left-6 w-11 h-11 bg-red-600 hover:bg-red-700 text-white 
            rounded-l-full flex items-center justify-center shadow-lg z-50"
          title="Close"
        >
          <Icon icon="gridicons:cross" className="text-xl" />
        </button>

        {/* Header */}
        <div className="border-b px-6 py-5">
          <h2 className="text-xl font-bold">Create Superadmin</h2>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-6">Create Superadmin</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="e.g. johndoe@example.com"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <p className="text-xs text-gray-500 mt-1">
                (Login details will be emailed to this email)
              </p>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">User Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option>Superadmin</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Upload your picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded flex items-center gap-2"
            >
              <Icon icon="material-symbols:check" className="text-lg" />
              Save
            </button>
            <button onClick={onClose} className="text-gray-600">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
