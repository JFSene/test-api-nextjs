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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountDetails),
    });

    if (response.ok) {
      alert('Account created successfully');
    } else {
      alert('Failed to create account');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={accountDetails.companyName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={accountDetails.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Currency:</label>
        <input
          type="text"
          name="currency"
          value={accountDetails.currency}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Credit/Debit Indicator:</label>
        <select
          name="creditDebitIndicator"
          value={accountDetails.creditDebitIndicator}
          onChange={handleChange}
        >
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
      </div>
      <div>
        <label>Date and Time:</label>
        <input
          type="datetime-local"
          name="datetime"
          value={accountDetails.datetime}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Account</button>
    </form>
  );
}
