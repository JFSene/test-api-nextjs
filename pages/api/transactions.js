import { verifyToken } from '../../lib/auth';

export default function handler(req, res) {
    const transactions = [
      {
        "account_id": "3230bd7e-cb4c-553c-bcd3-607f3a3f8e20",
        "company_name": "Business Example LTD",
        "amount": {
          "amount": "198395.3700",
          "currency": "USD"
        },
        "credit_debit_indicator": "Credit",
        "datetime": "2022-08-08T15:44:45.294"
      },
      {
        "account_id": "5259846c-1d53-d9e0-1865-9d3815c42c16",
        "company_name": "Business Example LTD",
        "amount": {
          "amount": "2608.1200",
          "currency": "EUR"
        },
        "credit_debit_indicator": "Credit",
        "datetime": "2022-08-08T15:44:45.200"
      }
    ];
  
    res.status(200).json(transactions);
  }
  