import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CompanyAdd({ isOpen, onClose, onSave,isVisible, setIsVisible }) {
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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);

  // Initialize visibility state when isOpen changes
  // 

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.companyEmail.trim()) newErrors.companyEmail = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.companyEmail)) newErrors.companyEmail = "Invalid email";
    if (!formData.adminName.trim()) newErrors.adminName = "Admin name is required";
    if (!formData.adminEmail.trim()) newErrors.adminEmail = "Admin email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.adminEmail)) newErrors.adminEmail = "Invalid email";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.match("image.*")) {
      toast.error("Please upload an image file");
      return;
    }
    setFormData({ ...formData, companyLogo: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSave(formData);
      if(validate){

        toast.success("Company added successfully!");
      }
      setIsSubmitting(false);
      handleClose();
    }, 500);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  if (!isOpen) return null;

  return (
    <>
             {/* <div className=" relative"> */}

      {/* <ToastContainer closeOnClick position="top-right" autoClose={3000} /> */}
      <div
        className={`fixed top-0 right-0 h-full w-full transform transition-transform duration-900 ease-in-out z-90 overflow-y-auto ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
         {/* <div className=" relative"> */}

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute left-49 rounded-l-full top-6 w-15 h-10 bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 z-10"
        >
          &times;
        </button>

        {/* Main Form Container */}
        <div className="relative left-31 max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden h-full">
          <div className="p-6 h-full flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Company</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 flex-grow overflow-y-auto">
              {/* Company Details Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Icon icon="mdi:office-building" className="mr-2" />
                  Company Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Acme Corporation"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    />
                    {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="companyEmail"
                      placeholder="contact@example.com"
                      value={formData.companyEmail}
                      onChange={handleInputChange}
                      className={`w-full border ${errors.companyEmail ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    />
                    {errors.companyEmail && <p className="mt-1 text-sm text-red-600">{errors.companyEmail}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="companyPhone"
                      placeholder="+1 234 567 890"
                      value={formData.companyPhone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        https://
                      </span>
                      <input
                        type="text"
                        name="companyWebsite"
                        placeholder="yourcompany.com"
                        value={formData.companyWebsite}
                        onChange={handleInputChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                    <select
                      name="defaultCurrency"
                      value={formData.defaultCurrency}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>INR (₹)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Timezone</label>
                    <select
                      name="defaultTimezone"
                      value={formData.defaultTimezone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option>Asia/Kolkata</option>
                      <option>America/New_York</option>
                      <option>Europe/London</option>
                      <option>Asia/Dubai</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                    <textarea
                      name="companyAddress"
                      placeholder="132, My Street, Kingston, New York 12401"
                      value={formData.companyAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                    <div className="mt-1 flex items-center">
                      <label className="cursor-pointer">
                        <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          <Icon icon="mdi:upload" className="mr-2" />
                          Upload Image
                        </span>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                      </label>
                      {formData.companyLogo && (
                        <span className="ml-4 text-sm text-gray-500">{formData.companyLogo.name}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Details Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Icon icon="mdi:account-cog" className="mr-2" />
                  Admin Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name *</label>
                    <input
                      type="text"
                      name="adminName"
                      placeholder="John Doe"
                      value={formData.adminName}
                      onChange={handleInputChange}
                      className={`w-full border ${errors.adminName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    />
                    {errors.adminName && <p className="mt-1 text-sm text-red-600">{errors.adminName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email *</label>
                    <input
                      type="email"
                      name="adminEmail"
                      placeholder="admin@example.com"
                      value={formData.adminEmail}
                      onChange={handleInputChange}
                      className={`w-full border ${errors.adminEmail ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    />
                    {errors.adminEmail && <p className="mt-1 text-sm text-red-600">{errors.adminEmail}</p>}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-wrap gap-4 justify-end pt-4 sticky bottom-0 bg-white py-4 border-t">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-md text-white transition-colors ${
                    isSubmitting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Icon icon="mdi:loading" className="animate-spin mr-2" />
                      Saving...
                    </span>
                  ) : (
                    "Save Company"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}