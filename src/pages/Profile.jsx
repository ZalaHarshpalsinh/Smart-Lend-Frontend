"use client";

import { useState } from "react";
import { User, Phone, Mail, Camera, AlertCircle } from "lucide-react";

const Profile = ({ userData, setUserData }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    profileImage: userData.profileImage,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      ...formData,
    });
    setIsEditing(false);
  };

  const handleDeactivate = () => {
    setUserData({
      ...userData,
      isActive: false,
    });
    setShowDeactivateModal(false);
  };

  const handleImageChange = (e) => {
    // In a real app, you would handle file upload here
    // For this example, we'll just use a placeholder
    setFormData({
      ...formData,
      profileImage: "/placeholder.svg?height=200&width=200",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account information and preferences
          </p>
        </div>
        <div className="mt-4 flex md:mt-0">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your personal details and contact information
            </p>
          </div>
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
              <img
                src={formData.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            {isEditing && (
              <div className="absolute bottom-0 right-0">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-indigo-600 rounded-full p-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Change profile picture</span>
                  <Camera className="h-4 w-4" aria-hidden="true" />
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200">
          <form onSubmit={handleSubmit}>
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <User className="h-5 w-5 mr-2 text-gray-400" />
                  Full name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  ) : (
                    userData.name
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-gray-400" />
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  ) : (
                    userData.email
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-gray-400" />
                  Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  ) : (
                    userData.phone
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Account status
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      userData.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {userData.isActive ? "Active" : "Inactive"}
                  </span>
                </dd>
              </div>
            </dl>

            {isEditing && (
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Account Actions
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your account settings
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Deactivate Account
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                Temporarily deactivate your account. You can reactivate it
                later.
              </p>
              <button
                onClick={() => setShowDeactivateModal(true)}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deactivate Account Modal */}
      {showDeactivateModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertCircle
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Deactivate account
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of
                        your data will be temporarily inaccessible until you
                        reactivate your account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeactivate}
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeactivateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
