import React, { useState } from 'react';
import { Plus, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/currency';
import { cn } from '../utils/currency';

interface Props {
  transactions: Transaction[];
  onAdd: (t: Transaction) => void;
  onDelete: (id: string) => void;
}

export const Transactions: React.FC<Props> = ({ transactions, onAdd, onDelete }) => {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !amount) return;

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      description: desc,
      amount: parseFloat(amount),
      type,
      category,
    };

    onAdd(newTransaction);
    setDesc('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Add Transaction</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Description (e.g. Mess Fees)"
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food & Drinks</option>
            <option value="Transport">Transport</option>
            <option value="Education">Education</option>
            <option value="Rent">Rent</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary/Pocket Money</option>
            <option value="Other">Other</option>
          </select>
          <button
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Add
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-6 border-bottom border-black/5">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Description</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold text-right">Amount</th>
                <th className="px-6 py-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No transactions yet. Start by adding one!
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">{t.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {t.type === 'income' ? (
                          <ArrowUpCircle className="text-emerald-500" size={20} />
                        ) : (
                          <ArrowDownCircle className="text-rose-500" size={20} />
                        )}
                        <span className="font-medium text-slate-900">{t.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                        {t.category}
                      </span>
                    </td>
                    <td className={cn(
                      "px-6 py-4 text-right font-semibold",
                      t.type === 'income' ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => onDelete(t.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
