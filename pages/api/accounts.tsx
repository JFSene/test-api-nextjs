// pages/api/accounts.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { companyName, amount, currency, creditDebitIndicator, datetime } = req.body;

      // Create an Amount entry
      const amountEntry = await prisma.amount.create({
        data: {
          amount: parseFloat(amount),
          currency,
        },
      });

      // Generate a unique account_id
      const newAccountId = uuidv4();

      // Create an Account entry
      const account = await prisma.account.create({
        data: {
          account_id: newAccountId,
          company_name: companyName,
          amountId: amountEntry.id,
          credit_debit_indicator: creditDebitIndicator,
          datetime: new Date(datetime),
        },
      });

      res.status(200).json({ message: 'Account created', account });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
