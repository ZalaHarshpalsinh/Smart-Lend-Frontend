import { useState } from "react";
import { Search, Filter, ChevronDown, ArrowUpDown } from "lucide-react";
import ActiveLoanCard from "../components/ActiveLoanCard";

const ActiveLoans = () => {
  // Mock data for active loans
  const [activeLoans, setActiveLoans] = useState([
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
    {
      id: "L1003",
      borrowerName: "Michael Brown",
      borrowerImage: "/placeholder.svg?height=100&width=100",
      status: "on-time",
      nextPaymentDate: "May 20, 2023",
      principal: 8000,
      interestRate: 11,
      amountPaid: 2000,
      totalAmount: 8880,
      startDate: "Mar 1, 2023",
      endDate: "Mar 1, 2024",
    },
    {
      id: "L1004",
      borrowerName: "Sarah Johnson",
      borrowerImage: "/placeholder.svg?height=100&width=100",
      status: "on-time",
      nextPaymentDate: "May 25, 2023",
      principal: 15000,
      interestRate: 13,
      amountPaid: 3000,
      totalAmount: 16950,
      startDate: "Dec 5, 2022",
      endDate: "Dec 5, 2023",
    },
    {
      id: "L1005",
      borrowerName: "James Taylor",
      borrowerImage: "/placeholder.svg?height=100&width=100",
      status: "late",
      nextPaymentDate: "May 1, 2023",
      principal: 3000,
      interestRate: 9,
      amountPaid: 1000,
      totalAmount: 3270,
      startDate: "Apr 1, 2023",
      endDate: "Oct 1, 2023",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("nextPayment");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter and sort active loans
  const filteredLoans = activeLoans
    .filter((loan) => {
      // Filter by search term
      const matchesSearch =
        loan.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.id.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by status
      const matchesStatus =
        statusFilter === "all" || loan.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      let comparison = 0;

      if (sortBy === "nextPayment") {
        comparison = new Date(a.nextPaymentDate) - new Date(b.nextPaymentDate);
      } else if (sortBy === "amount") {
        comparison = a.principal - b.principal;
      } else if (sortBy === "progress") {
        const progressA = (a.amountPaid / a.totalAmount) * 100;
        const progressB = (b.amountPaid / b.totalAmount) * 100;
        comparison = progressA - progressB;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Calculate summary statistics
  const totalLent = activeLoans.reduce((sum, loan) => sum + loan.principal, 0);
  const totalOutstanding = activeLoans.reduce(
    (sum, loan) => sum + (loan.totalAmount - loan.amountPaid),
    0
  );
  const totalInterestEarned = activeLoans.reduce(
    (sum, loan) =>
      sum +
      (loan.amountPaid - (loan.amountPaid * loan.principal) / loan.totalAmount),
    0
  );
  const lateLoans = activeLoans.filter((loan) => loan.status === "late").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Active Loans</h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage your active loans
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v2"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Lent
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      ${totalLent.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Outstanding Balance
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      ${totalOutstanding.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Interest Earned
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      ${totalInterestEarned.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Late Payments
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {lateLoans}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by name or loan ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative inline-block text-left">
              <div className="flex">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="status-filter"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <Filter
                    className="mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Status:{" "}
                  {statusFilter === "all"
                    ? "All"
                    : statusFilter === "on-time"
                    ? "On Time"
                    : "Late"}
                  <ChevronDown
                    className="ml-2 -mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="status-filter"
                >
                  <button
                    onClick={() => setStatusFilter("all")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStatusFilter("on-time")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    On Time
                  </button>
                  <button
                    onClick={() => setStatusFilter("late")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Late
                  </button>
                </div>
              </div>
            </div>

            <div className="relative inline-block text-left">
              <div className="flex">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="sort-by"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Sort by:{" "}
                  {sortBy === "nextPayment"
                    ? "Next Payment"
                    : sortBy === "amount"
                    ? "Amount"
                    : "Progress"}
                  <ArrowUpDown
                    className="ml-2 -mr-1 h-5 w-5 text-gray-400 cursor-pointer"
                    aria-hidden="true"
                    onClick={toggleSortOrder}
                  />
                </button>
              </div>
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="sort-by"
                >
                  <button
                    onClick={() => setSortBy("nextPayment")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Next Payment
                  </button>
                  <button
                    onClick={() => setSortBy("amount")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Amount
                  </button>
                  <button
                    onClick={() => setSortBy("progress")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Loans Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLoans.map((loan) => (
          <ActiveLoanCard key={loan.id} loan={loan} />
        ))}
      </div>

      {filteredLoans.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No active loans match your filters.</p>
        </div>
      )}
    </div>
  );
};

export default ActiveLoans;
