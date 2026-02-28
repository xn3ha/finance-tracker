import React, { useState } from 'react';
import { Plus, Trash2, Target } from 'lucide-react';
import { SavingsGoal } from '../types';
import { formatCurrency } from '../utils/currency';

interface Props {
  savings: SavingsGoal[];
  onAdd: (s: SavingsGoal) => void;
  onDelete: (id: string) => void;
}

export const Savings: React.FC<Props> = ({ savings, onAdd, onDelete }) => {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [current, setCurrent] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !target) return;

    onAdd({
      id: crypto.randomUUID(),
      name,
      target: parseFloat(target),
      current: parseFloat(current || '0'),
      deadline: deadline || new Date().toISOString().split('T')[0],
    });
    setName('');
    setTarget('');
    setCurrent('');
    setDeadline('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Set Savings Goal</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Goal (e.g. New Laptop)"
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Target Amount"
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <input
            type="number"
            placeholder="Current Savings"
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
          <input
            type="date"
            className="px-4 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button
            type="submit"
            className="bg-amber-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Set Goal
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savings.map((goal) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          return (
            <div key={goal.id} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm relative group">
              <button
                onClick={() => onDelete(goal.id)}
                className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={18} />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-50 rounded-xl">
                  <Target className="text-amber-600" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">{goal.name}</h4>
                  <p className="text-sm text-slate-500">Target Date: {goal.deadline}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Progress</p>
                    <p className="text-2xl font-black text-slate-900">{progress.toFixed(0)}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700">{formatCurrency(goal.current)}</p>
                    <p className="text-xs text-slate-400">of {formatCurrency(goal.target)}</p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div 
                    className="bg-amber-500 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
