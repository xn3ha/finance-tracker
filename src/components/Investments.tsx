import React, { useState } from 'react';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { Investment, InvestmentType } from '../types';
import { formatCurrency } from '../utils/currency';

interface Props {
  investments: Investment[];
  onAdd: (i: Investment) => void;
  onDelete: (id: string) => void;
}

export const Investments: React.FC<Props> = ({ investments, onAdd, onDelete }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [type, setType] = useState<InvestmentType>('SIP');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    onAdd({
      id: crypto.randomUUID(),
      name,
      amount: parseFloat(amount),
      currentValue: parseFloat(currentValue || amount),
      type,
    });
    setName('');
    setAmount('');
    setCurrentValue('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Log Investment</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Investment Name (e.g. SBI Bluechip)"
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Invested Amount"
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="number"
            placeholder="Current Value"
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={type}
            onChange={(e) => setType(e.target.value as InvestmentType)}
          >
            <option value="SIP">SIP / Mutual Fund</option>
            <option value="Stock">Stock</option>
            <option value="FD">Fixed Deposit (FD)</option>
            <option value="PPF">PPF</option>
          </select>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Log
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((inv) => (
          <div key={inv.id} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm relative group">
            <button
              onClick={() => onDelete(inv.id)}
              className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={18} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Briefcase className="text-indigo-600" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{inv.name}</h4>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{inv.type}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500">Invested</p>
                <p className="font-semibold text-slate-700">{formatCurrency(inv.amount)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Current</p>
                <p className="font-semibold text-indigo-600">{formatCurrency(inv.currentValue)}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-black/5 flex justify-between items-center">
              <span className="text-xs text-slate-500">Total Returns</span>
              <span className={inv.currentValue >= inv.amount ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
                {((inv.currentValue - inv.amount) / inv.amount * 100 || 0).toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
