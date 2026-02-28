export type TransactionType = 'income' | 'expense';
export type InvestmentType = 'FD' | 'PPF' | 'SIP' | 'Stock' | 'Mutual Fund';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  amount: number;
  currentValue: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}
