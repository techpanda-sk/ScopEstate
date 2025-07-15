import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Superadmin({ isOpen, onClose, onSave, isVisible, setIsVisible }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Superadmin",
    avatar: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.match("image.*")) {
      toast.error("Please upload an image file");
      return;
    }
    setFormData(prev => ({ ...prev, avatar: file }));
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
      toast.success("Superadmin created successfully!");
      setIsSubmitting(false);
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className={`fixed top-0 right-0 h-full w-full transform transition-transform duration-900 ease-in-out z-80 overflow-y-auto ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute left-47 rounded-l-full top-6 w-15 h-10 bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 z-10"
        >
          &times;
        </button>

        {/* Main Form Container */}
        <div className="relative left-31 max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden h-full">
          <div className="p-6 h-full flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Superadmin</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 flex-grow overflow-y-auto">
              {/* Superadmin Details Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Icon icon="mdi:account-supervisor" className="mr-2" />
                  Superadmin Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="superadmin@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      (Login details will be emailed to this address)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option>Superadmin</option>
                    </select>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                    <div className="mt-1 flex items-center">
                      <label className="cursor-pointer">
                        <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          <Icon icon="mdi:upload" className="mr-2" />
                          Upload Image
                        </span>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                      </label>
                      {formData.avatar && (
                        <span className="ml-4 text-sm text-gray-500">{formData.avatar.name}</span>
                      )}
                    </div>
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
                    "Create Superadmin"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}