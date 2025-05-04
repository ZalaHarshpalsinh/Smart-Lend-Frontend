import { useState } from 'react';
import { Bell, Menu, X, LogOut, User, Settings } from 'lucide-react';
import { logout } from "../services/authService";
import { useNavigate } from 'react-router-dom';

const Header = ({ userData, setSidebarOpen, sidebarOpen, setActivePage }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New loan request from Sarah Johnson", time: "10 minutes ago" },
    { id: 2, message: "Payment received from Michael Brown", time: "1 hour ago" },
    { id: 3, message: "Loan application approved for David Wilson", time: "3 hours ago" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <div className="hidden md:flex md:items-center">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Toggle sidebar</span>
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Lender Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                type="button"
                className="p-1 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1 divide-y divide-gray-200">
                    <div className="px-4 py-3">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="px-4 py-3 hover:bg-gray-50">
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2">
                      <button className="text-sm text-indigo-600 hover:text-indigo-500 w-full text-center">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                type="button"
                className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={userData.profileImage || "/placeholder.svg"}
                  alt="User profile"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  {userData.name}
                </span>
              </button>
              
              {showProfileMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActivePage('profile');
                        setShowProfileMenu(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <User className="mr-3 h-4 w-4" />
                      Your Profile
                    </button>
                    <button
                      onClick={() => {
                        // Handle settings
                        setShowProfileMenu(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        // Handle logout
                        logout();
                        navigate("/login");
                        setShowProfileMenu(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
