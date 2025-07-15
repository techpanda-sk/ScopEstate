import React, { useState } from "react";

const CreatePackageForm = () => {
  const [formData, setFormData] = useState({
    planType: "paid",
    packageName: "",
    packageType: "Standard",
    maxEmployees: "",
    maxStorageSize: "",
    storageUnit: "MB",
    positionNo: "",
    makePrivate: false,
    recommended: false,
    currency: "USD",
    monthlyPrice: "",
    annualPrice: "",
    selectedModules: [],
    description: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modulesList = [
    "Clients",
    "Employees",
    "Projects",
    "Attendance",
    "Tasks",
    "Estimates",
    "Invoices",
    "Payments",
    "Time Logs",
    "Tickets",
    "Events",
    "Notices",
    "Leaves",
    "Leads",
    "Holidays",
    "Products",
    "Expenses",
    "Contracts",
    "Reports",
    "Orders",
    "Knowledge Base",
    "Bank Account",
    "Messages",
    "Assets",
    "Zoom",
    "Recruit",
    "Payroll",
    "Purchase",
    "Letter",
    "QR Code",
    "Biolinks",
    "Performance",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleModuleChange = (module) => {
    setFormData((prev) => {
      const selected = prev.selectedModules.includes(module)
        ? prev.selectedModules.filter((m) => m !== module)
        : [...prev.selectedModules, module];
      return { ...prev, selectedModules: selected };
    });
  };

  const selectAllModules = () => {
    setFormData((prev) => ({
      ...prev,
      selectedModules:
        prev.selectedModules.length === modulesList.length
          ? []
          : [...modulesList],
    }));
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {!isOpen && (
        <div className="fixed top-0 right-0 m-6 z-50">
          <button
            onClick={handleOpen}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform duration-300"
          >
            Open Package Creation Form
          </button>
        </div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full  transform transition-transform duration-900 ease-in-out z-40 overflow-y-auto ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >

        {/* <button
          onClick={handleClose}
          className="top-6 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 z-50"
        >
          &times;
        </button> */}
        {/* Close Button */}

        {/* Form content goes here */}
        {/* <div className="p-6"> */}
         
         <div className=" relative">
      {/* Styled Close Button Like Screenshot */}
      <button
       onClick={handleClose}
        className="absolute left-47 rounded-l-full top-6 w-15 h-10  bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 z-10"
      >
        &times;
      </button>

      {/* <div className="relative left-19 max-w-6xl mx-auto "> */}
        <div className="relative left-31 max-w-6xl mx-auto  bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Package</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Plan Type Selection */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-700 mb-3">Choose Package Type</p>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="planType" 
                      value="paid" 
                      checked={formData.planType === 'paid'} 
                      onChange={handleChange} 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-gray-700">Paid plan</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="planType" 
                      value="free" 
                      checked={formData.planType === 'free'} 
                      onChange={handleChange} 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-gray-700">Free Plan</span>
                  </label>
                </div>
              </div>

              {/* Package Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package Name *</label>
                  <input 
                    type="text" 
                    name="packageName" 
                    value={formData.packageName} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
                  <select 
                    name="packageType" 
                    value={formData.packageType} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option>Standard</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Employees *</label>
                  <input 
                    type="number" 
                    name="maxEmployees" 
                    value={formData.maxEmployees} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                    required 
                  />
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Storage Size *</label>
                    <input 
                      type="number" 
                      name="maxStorageSize" 
                      value={formData.maxStorageSize} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                      required 
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select 
                      name="storageUnit" 
                      value={formData.storageUnit} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option>MB</option>
                      <option>GB</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position No. *</label>
                  <input 
                    type="number" 
                    name="positionNo" 
                    value={formData.positionNo} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                    required 
                  />
                </div>
              </div>

              {/* Checkbox Options */}
              <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-lg">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="makePrivate" 
                    checked={formData.makePrivate} 
                    onChange={handleChange} 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded" 
                  />
                  <span className="text-gray-700">Make Private</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="recommended" 
                    checked={formData.recommended} 
                    onChange={handleChange} 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded" 
                  />
                  <span className="text-gray-700">Mark as recommended</span>
                </label>
              </div>

              {/* Payment Plans */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Gateway Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select 
                      name="currency" 
                      value={formData.currency} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="USD">$ (USD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Plan Price ($) *</label>
                    <input 
                      type="number" 
                      name="monthlyPrice" 
                      value={formData.monthlyPrice} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Plan Price ($) *</label>
                    <input 
                      type="number" 
                      name="annualPrice" 
                      value={formData.annualPrice} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Modules Selection */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Select Modules</h2>
                  <button 
                    type="button" 
                    onClick={selectAllModules}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {formData.selectedModules.length === modulesList.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {modulesList.map((mod) => (
                    <label 
                      key={mod} 
                      className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
                        formData.selectedModules.includes(mod) 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded" 
                        checked={formData.selectedModules.includes(mod)} 
                        onChange={() => handleModuleChange(mod)} 
                      />
                      <span>{mod}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows="4" 
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                  required
                ></textarea>
              </div>

              {/* Form Actions */}
              <div className="flex flex-wrap gap-4 justify-end pt-4">
                <button 
                  type="button" 
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-md text-white transition-colors ${
                    isSubmitting 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        {/* </div> */}
      </div>
    </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default CreatePackageForm;
