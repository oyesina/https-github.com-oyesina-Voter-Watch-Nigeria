import { useState } from 'react';
import { COMPLIANCE_DEADLINES } from '../data/electionData';
import { ComplianceItem } from '../types';
import { Scale, CheckCircle2, AlertCircle, XCircle, Clock, Save, FileText, Landmark } from 'lucide-react';

export default function ComplianceTracker() {
  const [selectedSection, setSelectedSection] = useState<string>('sect19');
  
  // Local checklists for interactive tracking
  const [userCheckedCivicProtests, setUserCheckedCivicProtests] = useState<Record<string, boolean>>({
    yiaga_proposal_1: true,
    yiaga_proposal_2: false,
    yiaga_proposal_3: false
  });

  const activeSection = COMPLIANCE_DEADLINES.find(c => c.id === selectedSection) || COMPLIANCE_DEADLINES[0];

  const handleToggleProposal = (id: string) => {
    setUserCheckedCivicProtests(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-8 text-slate-100">
      
      {/* Intro section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-950 border border-slate-800 rounded-2xl p-6">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2 text-red-500 font-bold">
            <Scale size={20} />
            <span className="font-display">Electoral Act 2022 Compliance Dashboard</span>
          </div>
          <p className="text-sm text-slate-400">
            Technology is no longer a luxury—it is a statutorily protected mandate. The <strong>Electoral Act 2022</strong> gives electronic accreditation (BVAS) and continuous public inspection both legal and forensic legitimacy.
          </p>
        </div>
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col justify-center">
          <span className="text-[10px] font-mono text-slate-500 uppercase">National Assembly Status</span>
          <h4 className="text-sm font-bold text-slate-200 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Amended Bill 2025 Active
          </h4>
          <p className="text-[11px] text-slate-500 mt-1">CSO-lobbying active for 2027 technical code of conduct updates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Compliance checklist ledger */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <h4 className="text-base font-bold font-display">Statutory Deadlines & Fines</h4>
            <span className="text-[10px] text-slate-500 font-mono">Electoral Compliance Score: 83%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPLIANCE_DEADLINES.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedSection(item.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  selectedSection === item.id
                    ? 'bg-slate-900 border-red-500/50 shadow-md shadow-red-500/5'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/30'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold font-mono text-slate-400">{item.section}</span>
                    {item.status === 'compliant' && (
                      <span className="p-1 bg-emerald-500/10 text-emerald-500 rounded text-[9px] font-bold uppercase flex items-center gap-0.5">
                        <CheckCircle2 size={10} /> Compliant
                      </span>
                    )}
                    {item.status === 'delayed' && (
                      <span className="p-1 bg-amber-500/10 text-amber-500 rounded text-[9px] font-bold uppercase flex items-center gap-0.5">
                        <Clock size={10} /> Delayed ({item.daysRemainingOrDelayed}D)
                      </span>
                    )}
                    {item.status === 'failed' && (
                      <span className="p-1 bg-red-500/10 text-red-500 rounded text-[9px] font-bold uppercase flex items-center gap-0.5">
                        <XCircle size={10} /> Failed
                      </span>
                    )}
                  </div>

                  <h5 className="font-bold font-display text-slate-100 mt-2 text-sm">{item.title}</h5>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {item.mandate}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>Enforcement Code: EC_22_0{item.id === 'sect9' ? '1' : item.id === 'sect10' ? '2' : '3'}</span>
                  <span className="text-red-400/80 group-hover:text-red-400">View Audits</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed statutory view drawer */}
        <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-6">
          <div>
            <div className="border-b border-slate-900 pb-4 space-y-1">
              <span className="text-xs text-red-500 font-mono font-bold uppercase">{activeSection.section}</span>
              <h4 className="text-base font-bold font-display text-slate-100 leading-snug">{activeSection.title}</h4>
            </div>

            <div className="space-y-4 my-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider block">Explicit Mandate</span>
                <p className="text-slate-300 leading-relaxed font-sans mt-0.5 bg-slate-900/10 border border-slate-900 p-2.5 rounded-lg">
                  {activeSection.mandate}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider block">Penalty of Breach</span>
                <p className="text-red-400 font-semibold leading-relaxed font-sans bg-red-950/20 border border-red-900/30 p-2.5 rounded-lg flex items-start gap-1.5">
                  <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                  {activeSection.penalty}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider block">Timeline details / Display scope</span>
                <p className="text-slate-400 font-mono italic">
                  {activeSection.deadlineDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-4 text-[11px] text-slate-500 font-mono leading-relaxed space-y-2">
            <span className="block font-bold text-slate-400 uppercase tracking-wide">Tribunal Jurisdictions</span>
            <p>Under Section 137, these records establish explicit legitimacy in active election petitions tribunals across Lagos, Osun, and the Federal Court of Appeals.</p>
          </div>
        </div>

      </div>

      {/* proposed reforms ledger (Civil society proposals tracker) */}
      <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl">
        <div className="border-b border-slate-800 pb-4 mb-6">
          <h4 className="text-lg font-bold font-display flex items-center gap-2 text-slate-100">
            <Landmark size={20} className="text-slate-400" />
            CSO Proposed Reforms (Next Electoral Act Amendments)
          </h4>
          <p className="text-xs text-slate-400 mt-1">Civic coalitions (Yiaga Africa, Kimpact Initiative) are actively drafting amendments. Check off completed actions to track policy pressure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div 
            onClick={() => handleToggleProposal('yiaga_proposal_1')}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 space-y-3 ${
              userCheckedCivicProtests.yiaga_proposal_1 
                ? 'bg-slate-900 border-red-600/30' 
                : 'bg-slate-950 border-slate-900 hover:border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-red-500 font-bold uppercase">PROPOSAL 01</span>
              <input 
                type="checkbox" 
                checked={userCheckedCivicProtests.yiaga_proposal_1}
                readOnly
                className="rounded text-red-600 accent-red-600 focus:ring-red-500 h-4 w-4 bg-slate-800 border-slate-700" 
              />
            </div>
            <h5 className="font-bold text-slate-100 font-display">Periodic Independent Register Audits</h5>
            <p className="text-slate-400 leading-relaxed">
              Mandate independent technology coalitions to do continuous, public third-party database cleansing to flag deceased electors prior to standard verification schedules.
            </p>
          </div>

          <div 
            onClick={() => handleToggleProposal('yiaga_proposal_2')}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 space-y-3 ${
              userCheckedCivicProtests.yiaga_proposal_2 
                ? 'bg-slate-900 border-red-600/30' 
                : 'bg-slate-950 border-slate-900 hover:border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-slate-400 font-bold uppercase">PROPOSAL 02</span>
              <input 
                type="checkbox" 
                checked={userCheckedCivicProtests.yiaga_proposal_2}
                readOnly
                className="rounded text-red-600 accent-red-600 focus:ring-red-500 h-4 w-4 bg-slate-800 border-slate-700" 
              />
            </div>
            <h5 className="font-bold text-slate-100 font-display">Alternative Voter Identification</h5>
            <p className="text-slate-400 leading-relaxed">
              Amend Section 47(1) allowing driver\'s licenses, NIMC biometric profiles, or international passports to substantiate registration validity in the event of persistent BVAS card failures.
            </p>
          </div>

          <div 
            onClick={() => handleToggleProposal('yiaga_proposal_3')}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 space-y-3 ${
              userCheckedCivicProtests.yiaga_proposal_3 
                ? 'bg-slate-900 border-red-600/30' 
                : 'bg-slate-950 border-slate-900 hover:border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-slate-400 font-bold uppercase">PROPOSAL 03</span>
              <input 
                type="checkbox" 
                checked={userCheckedCivicProtests.yiaga_proposal_3}
                readOnly
                className="rounded text-red-600 accent-red-600 focus:ring-red-500 h-4 w-4 bg-slate-800 border-slate-700" 
              />
            </div>
            <h5 className="font-bold text-slate-100 font-display">Early Voting Framework (Staff)</h5>
            <p className="text-slate-400 leading-relaxed">
              Allow security operatives, INEC technical staff, and accredited civil journalists to vote 72 hours early—preventing chaotic station crowding that forces field coordinators to skip ABIS scans.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
