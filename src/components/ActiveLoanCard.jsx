import { CheckCircle, AlertCircle } from "lucide-react";

const ActiveLoanCard = ({ loan }) => {
  // Calculate progress percentage
  const progressPercentage = (loan.amountPaid / loan.totalAmount) * 100;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src={
                loan.borrowerImage || "/placeholder.svg?height=100&width=100"
              }
              alt={loan.borrowerName}
            />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">
                {loan.borrowerName}
              </h3>
              <div className="flex items-center mt-1">
                <span
                  className={`flex items-center text-xs ${
                    loan.status === "on-time"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {loan.status === "on-time" ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
                  {loan.status === "on-time" ? "On time" : "Late"}
                </span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-xs text-gray-500">Loan #{loan.id}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Next payment</p>
            <p className="text-sm font-medium">{loan.nextPaymentDate}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Principal</p>
            <p className="text-sm font-semibold">
              ${loan.principal.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Interest Rate</p>
            <p className="text-sm font-semibold">{loan.interestRate}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Paid</p>
            <p className="text-sm font-semibold">
              ${loan.amountPaid.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Remaining</p>
            <p className="text-sm font-semibold">
              ${(loan.totalAmount - loan.amountPaid).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Started</p>
            <p className="text-sm">{loan.startDate}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">End Date</p>
            <p className="text-sm">{loan.endDate}</p>
          </div>
        </div>

        <button className="mt-4 w-full bg-indigo-50 text-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ActiveLoanCard;
