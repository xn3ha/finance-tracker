import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Wallet, TrendingUp, Target, CreditCard } from 'lucide-react';
import { Transaction, Investment, SavingsGoal } from '../types';
import { formatCurrency, cn } from '../utils/currency';

interface Props {
  transactions: Transaction[];
  investments: Investment[];
  savings: SavingsGoal[];
}

export const Dashboard: React.FC<Props> = ({ transactions, investments, savings }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalInvested = investments.reduce((acc, i) => acc + i.amount, 0);
  const currentInvestValue = investments.reduce((acc, i) => acc + i.currentValue, 0);
  const netWorth = (totalIncome - totalExpenses) + currentInvestValue;

  const investmentData = investments.reduce((acc: any[], inv) => {
    const existing = acc.find(a => a.name === inv.type);
    if (existing) {
      existing.value += inv.currentValue;
    } else {
      acc.push({ name: inv.type, value: inv.currentValue });
    }
    return acc;
  }, []);

  const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Net Worth" 
          value={formatCurrency(netWorth)} 
          icon={<Wallet className="text-emerald-600" />} 
          color="bg-emerald-50"
        />
        <StatCard 
          title="Total Invested" 
          value={formatCurrency(currentInvestValue)} 
          icon={<TrendingUp className="text-indigo-600" />} 
          color="bg-indigo-50"
          subValue={`${((currentInvestValue - totalInvested) / totalInvested * 100 || 0).toFixed(1)}% Returns`}
        />
        <StatCard 
          title="Monthly Expenses" 
          value={formatCurrency(totalExpenses)} 
          icon={<CreditCard className="text-rose-600" />} 
          color="bg-rose-50"
        />
        <StatCard 
          title="Savings Goals" 
          value={savings.length.toString()} 
          icon={<Target className="text-amber-600" />} 
          color="bg-amber-50"
          subValue={`${savings.filter(s => s.current >= s.target).length} Completed`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Investment Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Investment Allocation</h3>
          <div className="h-[300px] w-full">
            {investmentData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={investmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {investmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 italic">
                No investment data to display
              </div>
            )}
          </div>
        </div>

        {/* Savings Progress */}
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Savings Goals</h3>
          <div className="space-y-6">
            {savings.length === 0 ? (
              <p className="text-slate-400 text-center py-10 italic">No goals set yet</p>
            ) : (
              savings.map(goal => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{goal.name}</span>
                    <span className="text-slate-500">{formatCurrency(goal.current)} / {formatCurrency(goal.target)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, subValue }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-start gap-4">
    <div className={cn("p-3 rounded-xl", color)}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h4 className="text-2xl font-bold text-slate-900 mt-1">{value}</h4>
      {subValue && <p className="text-xs text-emerald-600 font-medium mt-1">{subValue}</p>}
    </div>
  </div>
);
