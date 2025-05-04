"use client";

import {
  Home,
  User,
  DollarSign,
  FileText,
  BarChart2,
  Settings,
  HelpCircle,
} from "lucide-react";

const Sidebar = ({ activePage, setActivePage, isOpen }) => {
  const navigation = [
    { name: "Dashboard", icon: Home, id: "dashboard" },
    { name: "Profile", icon: User, id: "profile" },
    { name: "Funds Management", icon: DollarSign, id: "funds" },
    { name: "Loan Requests", icon: FileText, id: "loan-requests" },
    { name: "Active Loans", icon: BarChart2, id: "active-loans" },
    { name: "Settings", icon: Settings, id: "settings" },
    { name: "Help & Support", icon: HelpCircle, id: "help" },
  ];

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-40 w-64 bg-indigo-700 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:h-full`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-4 bg-indigo-800">
          <h1 className="text-xl font-bold text-white">LenderPro</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`${
                  activePage === item.id
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-100 hover:bg-indigo-600"
                } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full`}
              >
                <item.icon
                  className={`${
                    activePage === item.id
                      ? "text-indigo-200"
                      : "text-indigo-300"
                  } mr-3 flex-shrink-0 h-6 w-6`}
                  aria-hidden="true"
                />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 bg-indigo-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src="/placeholder.svg?height=200&width=200"
                alt="Company logo"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">LenderPro Inc.</p>
              <p className="text-xs font-medium text-indigo-200">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
