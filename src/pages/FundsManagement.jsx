"use client";

import { useState } from "react";
import {
  DollarSign,
  CreditCard,
  ArrowUp,
  ArrowDown,
  AlertCircle,
} from "lucide-react";

const FundsManagement = ({ userData, setUserData }) => {
  const [amount, setAmount] = useState("");
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [error, setError] = useState("");

  // Mock data for monthly limit
  const monthlyLimit = 20000;
  const currentMonthAdded = 5000;
  const remainingLimit = monthlyLimit - currentMonthAdded;

  // Mock transaction history
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "deposit",
      amount: 5000,
      date: "May 1, 2023",
      status: "completed",
      description: "Added funds",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 2000,
      date: "Apr 25, 2023",
      status: "completed",
      description: "Withdrawal to bank account",
    },
    {
      id: 3,
      type: "deposit",
      amount: 10000,
      date: "Apr 15, 2023",
      status: "completed",
      description: "Added funds",
    },
    {
      id: 4,
      type: "loan",
      amount: 5000,
      date: "Apr 10, 2023",
      status: "completed",
      description: "Loan to Sarah Johnson",
    },
    {
      id: 5,
      type: "repayment",
      amount: 1100,
      date: "Apr 5, 2023",
      status: "completed",
      description: "Repayment from Michael Brown",
    },
  ]);

  const handleAddFunds = () => {
    const amountNum = Number.parseFloat(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amountNum > remainingLimit) {
      setError(
        `You can only add up to $${remainingLimit.toLocaleString()} this month`
      );
      return;
    }

    // Add funds to user's worth
    setUserData({
      ...userData,
      worth: userData.worth + amountNum,
    });

    // Add transaction to history
    setTransactions([
      {
        id: transactions.length + 1,
        type: "deposit",
        amount: amountNum,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: "completed",
        description: "Added funds",
      },
      ...transactions,
    ]);

    // Reset and close modal
    setAmount("");
    setError("");
    setShowAddFundsModal(false);
  };

  const handleWithdraw = () => {
    const amountNum = Number.parseFloat(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amountNum > userData.worth) {
      setError("Insufficient funds");
      return;
    }

    // Subtract funds from user's worth
    setUserData({
      ...userData,
      worth: userData.worth - amountNum,
    });

    // Add transaction to history
    setTransactions([
      {
        id: transactions.length + 1,
        type: "withdrawal",
        amount: amountNum,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: "completed",
        description: "Withdrawal to bank account",
      },
      ...transactions,
    ]);

    // Reset and close modal
    setAmount("");
    setError("");
    setShowWithdrawModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Funds Management</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your funds, add money, and track your transactions
        </p>
      </div>

      {/* Balance Card */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Current Balance
              </h3>
              <div className="mt-2 text-3xl font-bold text-gray-900">
                ${userData.worth.toLocaleString()}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Available for lending
              </p>
            </div>
            <div className="mt-5 sm:mt-0 sm:flex sm:space-x-3">
              <button
                type="button"
                onClick={() => {
                  setAmount("");
                  setError("");
                  setShowAddFundsModal(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <DollarSign className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Add Funds
              </button>
              <button
                type="button"
                onClick={() => {
                  setAmount("");
                  setError("");
                  setShowWithdrawModal(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <CreditCard className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Limit Card */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Monthly Deposit Limit
          </h3>
          <div className="mt-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Used: ${currentMonthAdded.toLocaleString()}</span>
              <span>Limit: ${monthlyLimit.toLocaleString()}</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{
                  width: `${(currentMonthAdded / monthlyLimit) * 100}%`,
                }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              You can add up to ${remainingLimit.toLocaleString()} more this
              month
            </p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">
          Transaction History
        </h3>
        <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                          transaction.type === "deposit"
                            ? "bg-green-100"
                            : transaction.type === "withdrawal"
                            ? "bg-red-100"
                            : transaction.type === "loan"
                            ? "bg-yellow-100"
                            : "bg-blue-100"
                        }`}
                      >
                        {transaction.type === "deposit" && (
                          <ArrowUp className={`h-5 w-5 text-green-600`} />
                        )}
                        {transaction.type === "withdrawal" && (
                          <ArrowDown className={`h-5 w-5 text-red-600`} />
                        )}
                        {transaction.type === "loan" && (
                          <ArrowUp className={`h-5 w-5 text-yellow-600`} />
                        )}
                        {transaction.type === "repayment" && (
                          <ArrowDown className={`h-5 w-5 text-blue-600`} />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.description}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.date}
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <div
                        className={`text-sm font-medium ${
                          transaction.type === "deposit" ||
                          transaction.type === "repayment"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "deposit" ||
                        transaction.type === "repayment"
                          ? "+"
                          : "-"}
                        ${transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddFundsModal && (
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
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <DollarSign
                      className="h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add Funds
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Enter the amount you want to add to your account.
                        Monthly limit: ${monthlyLimit.toLocaleString()}
                      </p>
                      <div className="mt-4">
                        <label
                          htmlFor="amount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Amount
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="amount"
                            id="amount"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        {error && (
                          <div className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {error}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddFunds}
                >
                  Add Funds
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowAddFundsModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
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
                    <CreditCard
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Withdraw Funds
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Enter the amount you want to withdraw from your account.
                        Available balance: ${userData.worth.toLocaleString()}
                      </p>
                      <div className="mt-4">
                        <label
                          htmlFor="withdraw-amount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Amount
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="withdraw-amount"
                            id="withdraw-amount"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        {error && (
                          <div className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {error}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleWithdraw}
                >
                  Withdraw
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowWithdrawModal(false)}
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

export default FundsManagement;
