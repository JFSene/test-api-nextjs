import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const transactions = await prisma.account.findMany({
        include: {
          // Assuming amount is a related model, this should be an object or array
          amount: true, // Ensure that 'amount' is correctly defined in your schema
        },
      });

      const formattedTransactions = transactions.map((transaction) => ({
        account_id: transaction.account_id,
        company_name: transaction.company_name,
        amount: {
          // Assuming transaction.amount is an object
          amount: transaction.amount?.amount.toFixed(4), // Optional chaining in case amount is null or undefined
          currency: transaction.amount?.currency,
        },
        credit_debit_indicator: transaction.credit_debit_indicator,
        datetime: transaction.datetime.toISOString(),
      }));

      res.status(200).json(formattedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'An error occurred while fetching transactions.' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}