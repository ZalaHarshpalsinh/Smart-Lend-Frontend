import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import LoanRequestCard from "../components/LoanRequestCard";

const LoanRequests = () => {
  // Mock data for loan requests
  const [loanRequests, setLoanRequests] = useState([
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
    {
      id: 3,
      borrowerName: "Emily Davis",
      borrowerImage: "/placeholder.svg?height=100&width=100",
      date: "May 2, 2023",
      amount: 10000,
      duration: 24,
      interestRate: 12,
      totalReturn: 12400,
      purpose: "Business expansion",
      status: "approved",
    },
    {
      id: 4,
      borrowerName: "James Wilson",
      borrowerImage: "/placeholder.svg?height=100&width=100",
      date: "May 1, 2023",
      amount: 3000,
      duration: 12,
      interestRate: 9,
      totalReturn: 3270,
      purpose: "Car repair",
      status: "declined",
    },
    {
      id: 5,
      borrowerName: "Jessica Taylor",
      borrowerImage: "/placeholder.svg?height=100&width=100",
      date: "April 30, 2023",
      amount: 7500,
      duration: 18,
      interestRate: 11,
      totalReturn: 8325,
      purpose: "Medical expenses",
      status: "pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const handleAcceptRequest = (requestId) => {
    setLoanRequests(
      loanRequests.map((request) =>
        request.id === requestId ? { ...request, status: "approved" } : request
      )
    );
  };

  const handleDeclineRequest = (requestId) => {
    setLoanRequests(
      loanRequests.map((request) =>
        request.id === requestId ? { ...request, status: "declined" } : request
      )
    );
  };

  // Filter and sort loan requests
  const filteredRequests = loanRequests
    .filter((request) => {
      // Filter by search term
      const matchesSearch =
        request.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.purpose.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by status
      const matchesStatus =
        statusFilter === "all" || request.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "amount") {
        return b.amount - a.amount;
      } else if (sortBy === "duration") {
        return b.duration - a.duration;
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Loan Requests</h2>
        <p className="mt-1 text-sm text-gray-500">
          Review and manage loan requests from borrowers
        </p>
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
              placeholder="Search by name or purpose"
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
                  {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
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
                    onClick={() => setStatusFilter("pending")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setStatusFilter("approved")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setStatusFilter("declined")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Declined
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
                  {sortBy === "date"
                    ? "Date"
                    : sortBy === "amount"
                    ? "Amount"
                    : "Duration"}
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
                  aria-labelledby="sort-by"
                >
                  <button
                    onClick={() => setSortBy("date")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Date
                  </button>
                  <button
                    onClick={() => setSortBy("amount")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Amount
                  </button>
                  <button
                    onClick={() => setSortBy("duration")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Duration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Requests Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRequests.map((request) => (
          <LoanRequestCard
            key={request.id}
            request={request}
            onAccept={handleAcceptRequest}
            onDecline={handleDeclineRequest}
          />
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No loan requests match your filters.</p>
        </div>
      )}
    </div>
  );
};

export default LoanRequests;
