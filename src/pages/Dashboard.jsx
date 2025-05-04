import { useState } from "react";
import {
  DollarSign,
  Users,
  CreditCard,
  TrendingUp,
  Calendar,
  ArrowRight,
} from "lucide-react";
import StatCard from "../components/StatCard";
import LoanRequestCard from "../components/LoanRequestCard";
import ActiveLoanCard from "../components/ActiveLoanCard";

const Dashboard = ({ userData }) => {
  // Mock data for statistics
  const stats = [
    {
      id: 1,
      title: "Total Worth",
      value: `$${userData.worth.toLocaleString()}`,
      icon: DollarSign,
      change: "12%",
      changeType: "increase",
    },
    {
      id: 2,
      title: "Active Borrowers",
      value: "24",
      icon: Users,
      change: "8%",
      changeType: "increase",
    },
    {
      id: 3,
      title: "Monthly Earnings",
      value: "$4,200",
      icon: CreditCard,
      change: "5%",
      changeType: "increase",
    },
    {
      id: 4,
      title: "Interest Rate",
      value: "12.5%",
      icon: TrendingUp,
      change: "2%",
      changeType: "increase",
    },
  ];

  // Mock data for recent loan requests
  const [recentRequests, setRecentRequests] = useState([
    {
      id: 1,
      borrowerName: "Sarah Johnson",
      borrowerImage: "/placeholder.svg?height=100&width=100",
      date: "May 4, 2023",
      amount: 5000,
      duration: 12,
      interestRate: 10,
      totalReturn: 5500,
      purpose: "Home renovation",
      status: "pending",
    },
    {
      id: 2,
      borrowerName: "Michael Brown",
      borrowerImage: "/placeholder.svg?height=100&width=100",
      date: "May 3, 2023",
      amount: 2000,
      duration: 6,
      interestRate: 8,
      totalReturn: 2080,
      purpose: "Education expenses",
      status: "pending",
    },
  ]);

  // Mock data for active loans
  const activeLoans = [
    {
      id: "L1001",
      borrowerName: "David Wilson",
      borrowerImage: "/placeholder.svg?height=100&width=100",
      status: "on-time",
      nextPaymentDate: "May 15, 2023",
      principal: 10000,
      interestRate: 12,
      amountPaid: 4000,
      totalAmount: 11200,
      startDate: "Jan 10, 2023",
      endDate: "Jan 10, 2024",
    },
    {
      id: "L1002",
      borrowerName: "Emily Davis",
      borrowerImage: "/placeholder.svg?height=100&width=100",
      status: "late",
      nextPaymentDate: "May 5, 2023",
      principal: 5000,
      interestRate: 10,
      amountPaid: 1000,
      totalAmount: 5500,
      startDate: "Feb 15, 2023",
      endDate: "Aug 15, 2023",
    },
  ];

  const handleAcceptRequest = (requestId) => {
    setRecentRequests(
      recentRequests.map((request) =>
        request.id === requestId ? { ...request, status: "approved" } : request
      )
    );
  };

  const handleDeclineRequest = (requestId) => {
    setRecentRequests(
      recentRequests.map((request) =>
        request.id === requestId ? { ...request, status: "declined" } : request
      )
    );
  };

  // Mock data for upcoming payments
  const upcomingPayments = [
    { id: 1, borrower: "David Wilson", amount: 1000, date: "May 15, 2023" },
    { id: 2, borrower: "Emily Davis", amount: 500, date: "May 20, 2023" },
    { id: 3, borrower: "James Taylor", amount: 750, date: "May 25, 2023" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's an overview of your lending activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Loan Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Loan Requests
            </h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <LoanRequestCard
                key={request.id}
                request={request}
                onAccept={handleAcceptRequest}
                onDecline={handleDeclineRequest}
              />
            ))}
          </div>
        </div>

        {/* Active Loans */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Active Loans</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {activeLoans.map((loan) => (
              <ActiveLoanCard key={loan.id} loan={loan} />
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Upcoming Payments
          </h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
            View calendar <Calendar className="ml-1 h-4 w-4" />
          </button>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {upcomingPayments.map((payment) => (
              <li key={payment.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {payment.borrower}
                      </p>
                      <p className="ml-2 flex-shrink-0 text-xs text-gray-500">
                        Due on {payment.date}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        ${payment.amount}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
