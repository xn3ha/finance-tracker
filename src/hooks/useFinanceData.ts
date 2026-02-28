import { useState, useEffect } from 'react';
import { Transaction, Investment, SavingsGoal } from '../types';

export function useFinanceData() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [savings, setSavings] = useState<SavingsGoal[]>([]);

  useEffect(() => {
    const t = localStorage.getItem('finance_transactions');
    const i = localStorage.getItem('finance_investments');
    const s = localStorage.getItem('finance_savings');

    if (t) setTransactions(JSON.parse(t));
    if (i) setInvestments(JSON.parse(i));
    if (s) setSavings(JSON.parse(s));
  }, []);

  const saveTransactions = (data: Transaction[]) => {
    setTransactions(data);
    localStorage.setItem('finance_transactions', JSON.stringify(data));
  };

  const saveInvestments = (data: Investment[]) => {
    setInvestments(data);
    localStorage.setItem('finance_investments', JSON.stringify(data));
  };

  const saveSavings = (data: SavingsGoal[]) => {
    setSavings(data);
    localStorage.setItem('finance_savings', JSON.stringify(data));
  };

  return {
    transactions,
    investments,
    savings,
    addTransaction: (t: Transaction) => saveTransactions([t, ...transactions]),
    deleteTransaction: (id: string) => saveTransactions(transactions.filter(t => t.id !== id)),
    addInvestment: (inv: Investment) => saveInvestments([inv, ...investments]),
    deleteInvestment: (id: string) => saveInvestments(investments.filter(i => i.id !== id)),
    addSaving: (s: SavingsGoal) => saveSavings([s, ...savings]),
    deleteSaving: (id: string) => saveSavings(savings.filter(sv => sv.id !== id)),
  };
}
