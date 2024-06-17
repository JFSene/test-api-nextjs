'use client'
import { useState, ChangeEvent, FormEvent } from 'react';

interface AccountDetails {
  companyName: string;
  amount: string;
  currency: string;
  creditDebitIndicator: 'Credit' | 'Debit';
  datetime: string;
}

export default function AddAccountForm() {
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    companyName: '',
    amount: '',
    currency: '',
    creditDebitIndicator: 'Credit',
    datetime: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountDetails),
      });

      if (response.ok) {
        setSuccessMessage('Account created successfully');
        setAccountDetails({
          companyName: '',
          amount: '',
          currency: '',
          creditDebitIndicator: 'Credit',
          datetime: '',
        });
      } else {
        throw new Error('Failed to create account');
      }
    } catch (error) {
      console.error('Error adding account:', error);
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={accountDetails.companyName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
          <input
            type="number"
            name="amount"
            value={accountDetails.amount}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Currency:</label>
          <input
            type="text"
            name="currency"
            value={accountDetails.currency}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Credit/Debit Indicator:</label>
          <select
            name="creditDebitIndicator"
            value={accountDetails.creditDebitIndicator}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date and Time:</label>
          <input
            type="datetime-local"
            name="datetime"
            value={accountDetails.datetime}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Adding Account...' : 'Add Account'}
          </button>
          {loading && <span className="ml-4 inline-flex rounded-md shadow-sm">
            <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5A1.5 1.5 0 0010.5 1h-3A1.5 1.5 0 006 2.5V4a8 8 0 018 8zm12 0a8 8 0 01-8 8V21.5A1.5 1.5 0 0113.5 23h3a1.5 1.5 0 001.5-1.5V20a8 8 0 01-8-8z"></path>
            </svg>
            Loading...
          </span>}
        </div>
        {successMessage && (
          <div className="text-green-500 mt-4">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
};

