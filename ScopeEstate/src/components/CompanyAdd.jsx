import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function CompanyAdd({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyLogo: null,
    companyWebsite: "",
    defaultCurrency: "USD ($)",
    defaultTimezone: "Asia/Kolkata",
    language: "English",
    status: "Active",
    companyAddress: "",
    adminName: "",
    adminEmail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, companyLogo: e.target.files[0] });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      {/* Modal Panel */}
      <div
        className={`relative w-full sm:w-[95%] md:w-[85%] lg:w-[75%] xl:w-[70%]
        bg-white h-full overflow-y-auto shadow-xl transform transition-transform duration-700 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <div className="absolute top-5 -left-5 z-50">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-l-full flex items-center justify-center shadow"
            title="Close"
          >
            <Icon icon="gridicons:cross" className="text-lg" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="flex items-center p-6 border-b">
          <h2 className="text-xl font-bold">Add Company</h2>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-8">
          <h3 className="text-lg font-semibold">Company Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input type="text" name="companyName" placeholder="e.g. Acme Corporation" value={formData.companyName} onChange={handleInputChange} className="border p-2 rounded w-full" />
            <input type="email" name="companyEmail" placeholder="e.g. johndoe@example.com" value={formData.companyEmail} onChange={handleInputChange} className="border p-2 rounded w-full" />
            <input type="text" name="companyPhone" placeholder="e.g. 1234567890" value={formData.companyPhone} onChange={handleInputChange} className="border p-2 rounded w-full" />

            <input type="url" name="companyWebsite" placeholder="e.g. https://www.example.com" value={formData.companyWebsite} onChange={handleInputChange} className="border p-2 rounded w-full" />
            <select name="defaultCurrency" value={formData.defaultCurrency} onChange={handleInputChange} className="border p-2 rounded w-full">
              <option>USD ($)</option><option>EUR (€)</option><option>INR (₹)</option><option>GBP (£)</option>
            </select>
            <select name="defaultTimezone" value={formData.defaultTimezone} onChange={handleInputChange} className="border p-2 rounded w-full">
              <option>Asia/Kolkata</option><option>America/New_York</option><option>Europe/London</option><option>Asia/Dubai</option>
            </select>

            <select name="language" value={formData.language} onChange={handleInputChange} className="border p-2 rounded w-full">
              <option>English</option><option>Hindi</option><option>Spanish</option><option>French</option>
            </select>
            <select name="status" value={formData.status} onChange={handleInputChange} className="border p-2 rounded w-full">
              <option>Active</option><option>Inactive</option>
            </select>

            <textarea name="companyAddress" placeholder="e.g. 132, My Street, Kingston, New York 12401" value={formData.companyAddress} onChange={handleInputChange} className="border p-2 rounded w-full col-span-full" />

            <div className="col-span-full">
              <label className="block mb-1 font-medium">Company Logo</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full border p-2 rounded" />
            </div>
          </div>

          <h3 className="text-lg font-semibold">Account Details ( First company admin )</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="adminName" placeholder="e.g. John Doe" value={formData.adminName} onChange={handleInputChange} className="border p-2 rounded w-full" />
            <input type="email" name="adminEmail" placeholder="e.g. johndoe@example.com" value={formData.adminEmail} onChange={handleInputChange} className="border p-2 rounded w-full" />
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button onClick={handleSubmit} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Save</button>
            <button onClick={onClose} className="text-gray-600">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
