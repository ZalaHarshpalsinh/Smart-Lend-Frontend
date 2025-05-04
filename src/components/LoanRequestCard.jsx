"use client";

const LoanRequestCard = ({ request, onAccept, onDecline }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src={
                request.borrowerImage || "/placeholder.svg?height=100&width=100"
              }
              alt={request.borrowerName}
            />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">
                {request.borrowerName}
              </h3>
              <p className="text-xs text-gray-500">{request.date}</p>
            </div>
          </div>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              request.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : request.status === "approved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Amount</p>
            <p className="text-sm font-semibold">
              ${request.amount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-sm font-semibold">{request.duration} months</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Interest Rate</p>
            <p className="text-sm font-semibold">{request.interestRate}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Return</p>
            <p className="text-sm font-semibold">
              ${request.totalReturn.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-500">Purpose</p>
          <p className="text-sm">{request.purpose}</p>
        </div>

        {request.status === "pending" && (
          <div className="mt-4 flex space-x-3">
            <button
              onClick={() => onAccept(request.id)}
              className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Accept
            </button>
            <button
              onClick={() => onDecline(request.id)}
              className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanRequestCard;
