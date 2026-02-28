import React, { useState } from 'react';
import { LayoutDashboard, Receipt, TrendingUp, Target, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFinanceData } from './hooks/useFinanceData';
import { Dashboard } from './components/Dashboard';
import { Transactions } from './components/Transactions';
import { Investments } from './components/Investments';
import { Savings } from './components/Savings';
import { cn } from './utils/currency';

type Tab = 'dashboard' | 'transactions' | 'investments' | 'savings';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { 
    transactions, investments, savings,
    addTransaction, deleteTransaction,
    addInvestment, deleteInvestment,
    addSaving, deleteSaving
  } = useFinanceData();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'investments', label: 'Investments', icon: TrendingUp },
    { id: 'savings', label: 'Savings Goals', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Sidebar / Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-emerald-600 p-2 rounded-xl">
            <Wallet className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-black tracking-tight text-emerald-900">RupeeRoute</h1>
        </div>

        <nav className="space-y-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                activeTab === tab.id 
                  ? "bg-emerald-50 text-emerald-700 shadow-sm" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-black/5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Student Plan</p>
          <p className="text-sm font-medium text-slate-600">Free Forever</p>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 z-50 flex justify-around p-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={cn(
              "flex flex-col items-center gap-1",
              activeTab === tab.id ? "text-emerald-600" : "text-slate-400"
            )}
          >
            <tab.icon size={20} />
            <span className="text-[10px] font-bold uppercase">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-10 pb-24 lg:pb-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 capitalize tracking-tight">
              {activeTab}
            </h2>
            <p className="text-slate-500 font-medium">Welcome back! Here's your financial overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-400 uppercase">Current Session</p>
              <p className="text-sm font-bold text-slate-900">{new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && (
              <Dashboard 
                transactions={transactions} 
                investments={investments} 
                savings={savings} 
              />
            )}
            {activeTab === 'transactions' && (
              <Transactions 
                transactions={transactions} 
                onAdd={addTransaction} 
                onDelete={deleteTransaction} 
              />
            )}
            {activeTab === 'investments' && (
              <Investments 
                investments={investments} 
                onAdd={addInvestment} 
                onDelete={deleteInvestment} 
              />
            )}
            {activeTab === 'savings' && (
              <Savings 
                savings={savings} 
                onAdd={addSaving} 
                onDelete={deleteSaving} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
