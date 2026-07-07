import { useState } from 'react';
import { Landmark, TrendingUp, ShieldAlert, BookOpen, UserCheck, Sparkles, Scale, Clock, Wifi } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PUMap from './components/PUMap';
import AnomalyDetector from './components/AnomalyDetector';
import ComplianceTracker from './components/ComplianceTracker';
import CleanupPortal from './components/CleanupPortal';
import AIConsultant from './components/AIConsultant';

type TabType = 'dashboard' | 'map' | 'anomaly' | 'compliance' | 'cleanup' | 'ai';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-red-500/25 selection:text-white">
      
      {/* Header Segment */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 rounded-xl text-white shadow-lg shadow-red-600/10 flex items-center justify-center">
              <Landmark size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-display tracking-tight text-slate-50 uppercase">VoterWatch</h1>
                <span className="px-1.5 py-0.5 bg-red-500/10 text-red-500 font-mono text-[9px] uppercase rounded border border-red-500/20 font-bold">
                  NGR_AUDIT
                </span>
              </div>
              <p className="text-xs text-slate-400">Independent Voter Registration & Electoral Integrity Analytics Platform</p>
            </div>
          </div>

          {/* Environmental parameters & UTC clocks */}
          <div className="flex flex-wrap items-center gap-4 md:self-center text-xs font-mono text-slate-500 bg-slate-900/35 border border-slate-900 rounded-xl p-2 px-3">
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-slate-400" />
              <span>UTC: <strong className="text-slate-300">2026-06-02</strong></span>
            </div>
            <div className="h-3 w-[1px] bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Wifi size={12} className="text-slate-400 animate-pulse" />
              <span>Telemetry: <strong className="text-emerald-500">Active</strong></span>
            </div>
          </div>

        </div>
      </header>

      {/* Primary Section Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-6">
        
        {/* Horizontal Navigation sub-tabs */}
        <div className="flex flex-wrap border-b border-slate-900 pb-px gap-1 overflow-x-auto scrollbar-none">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 text-xs font-bold font-display rounded-t-lg transition-all duration-300 border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'border-red-500 bg-slate-950/40 text-slate-50 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/10'
            }`}
          >
            <TrendingUp size={13} />
            Electoral Pulse & Funnels
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2.5 text-xs font-bold font-display rounded-t-lg transition-all duration-300 border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'map'
                ? 'border-red-500 bg-slate-950/40 text-slate-50 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/10'
            }`}
          >
            <Clock size={13} />
            PU Search & Connectivity
          </button>

          <button
            onClick={() => setActiveTab('anomaly')}
            className={`px-4 py-2.5 text-xs font-bold font-display rounded-t-lg transition-all duration-300 border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'anomaly'
                ? 'border-red-500 bg-slate-950/40 text-slate-50 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/10'
            }`}
          >
            <ShieldAlert size={13} />
            Velocity Sandbox
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-2.5 text-xs font-bold font-display rounded-t-lg transition-all duration-300 border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'compliance'
                ? 'border-red-500 bg-slate-950/40 text-slate-50 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/10'
            }`}
          >
            <Scale size={13} />
            Act Compliance Ledger
          </button>

          <button
            onClick={() => setActiveTab('cleanup')}
            className={`px-4 py-2.5 text-xs font-bold font-display rounded-t-lg transition-all duration-300 border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'cleanup'
                ? 'border-red-500 bg-slate-950/40 text-slate-50 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/10'
            }`}
          >
            <UserCheck size={13} />
            Section 19 Objections
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2.5 text-xs font-bold font-display rounded-t-lg transition-all duration-300 border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'ai'
                ? 'border-red-500 bg-slate-950/40 text-slate-50 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/10'
            }`}
          >
            <Sparkles size={13} className="text-red-500" />
            AI Forensic Auditor
          </button>

        </div>

        {/* Modular Route Content */}
        <div className="min-h-[450px]">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'map' && <PUMap />}
          {activeTab === 'anomaly' && <AnomalyDetector />}
          {activeTab === 'compliance' && <ComplianceTracker />}
          {activeTab === 'cleanup' && <CleanupPortal />}
          {activeTab === 'ai' && <AIConsultant />}
        </div>

      </main>

      {/* Humble Legal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/40 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <div className="space-y-1">
            <p>VoterWatch Nigeria © 2026. All analytics compiled independently.</p>
            <p className="text-[10px] text-slate-600">Referencing Electoral Act 2022, INEC Public Bulletins, and CSO coalition parameters.</p>
          </div>
          <div>
            <span className="px-2 py-1 border border-slate-900 rounded-md text-[10px] uppercase font-bold text-slate-400 bg-slate-900/15">
              EC_SEC_19_COMPLIANT
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
