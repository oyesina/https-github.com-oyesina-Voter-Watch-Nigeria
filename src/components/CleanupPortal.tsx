import React, { useState, useEffect } from 'react';
import { STATES_DATA } from '../data/electionData';
import { CrowdsourcedReport, ReportType } from '../types';
import { ShieldCheck, UserCheck, Plus, Trash2, Printer, AlertTriangle, CheckCircle2, ChevronRight, Download } from 'lucide-react';

export default function CleanupPortal() {
  const [reports, setReports] = useState<CrowdsourcedReport[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // Form states
  const [reporterName, setReporterName] = useState('');
  const [email, setEmail] = useState('');
  const [reportType, setReportType] = useState<ReportType>('deceased');
  const [stateName, setStateName] = useState('Lagos');
  const [lgaName, setLgaName] = useState('Alimosho');
  const [puName, setPuName] = useState('');
  const [puCode, setPuCode] = useState('');
  const [description, setDescription] = useState('');
  const [evidenceDetails, setEvidenceDetails] = useState('');

  // Find active state details to adapt the LGA array in the form
  const activeStateObj = STATES_DATA.find(s => s.name === stateName) || STATES_DATA[0];

  // Load from localStorage or seed
  useEffect(() => {
    const saved = localStorage.getItem('voterwatch_objections');
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local objections:", e);
      }
    } else {
      // Seed initial mock reports representing realistic disputes
      const mockSeeds: CrowdsourcedReport[] = [
        {
          id: 'OB-2026-10492',
          reporterName: 'Ayo Adebayo',
          email: 'ayo.ade@gmail.com',
          reportType: 'deceased',
          state: 'Osun',
          lga: 'Osogbo',
          puName: 'Osogbo Town Hall Square',
          puCode: 'PU-OSO-001',
          description: 'Verified deceased voter Chief Joseph Alabi is still listed on the register. Verified via obituary and hospital records dated July 2024.',
          evidenceDetails: 'Attached official birth registry release and memorial bulletin details.',
          timestamp: '2026-05-18T10:14:00Z',
          status: 'verified'
        },
        {
          id: 'OB-2026-21840',
          reporterName: 'Emeka Nwosu',
          email: 'emeka.nwosu@gmail.com',
          reportType: 'multiple',
          state: 'Lagos',
          lga: 'Alimosho',
          puName: 'Baptist Primary School Roster',
          puCode: 'PU-ALI-004',
          description: 'Identical name and identical photo uploaded under two registrations. Biometric capture error or multiple registry attempt.',
          evidenceDetails: 'Voter registry online listings matches duplicated voter ID registration: LG-345-X and LG-349-Y.',
          timestamp: '2026-06-01T15:32:00Z',
          status: 'under_review'
        }
      ];
      setReports(mockSeeds);
      localStorage.setItem('voterwatch_objections', JSON.stringify(mockSeeds));
    }
  }, []);

  const saveToLocal = (newReports: CrowdsourcedReport[]) => {
    setReports(newReports);
    localStorage.setItem('voterwatch_objections', JSON.stringify(newReports));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporterName || !email || !puName || !puCode || !description) {
      alert("Please populate all required fields.");
      return;
    }

    const newReport: CrowdsourcedReport = {
      id: `OB-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      reporterName,
      email,
      reportType,
      state: stateName,
      lga: lgaName,
      puName,
      puCode,
      description,
      evidenceDetails: evidenceDetails || 'No auxiliary documents listed.',
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    const updated = [newReport, ...reports];
    saveToLocal(updated);
    setSelectedReportId(newReport.id);
    setIsFormOpen(false);

    // Reset fields
    setReporterName('');
    setEmail('');
    setPuName('');
    setPuCode('');
    setDescription('');
    setEvidenceDetails('');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to retract this objection? This is irreversible.")) {
      const updated = reports.filter(r => r.id !== id);
      saveToLocal(updated);
      if (selectedReportId === id) setSelectedReportId(null);
    }
  };

  const handlePrintBrief = () => {
    window.print();
  };

  const activeReport = reports.find(r => r.id === selectedReportId) || reports[0];

  return (
    <div className="space-y-8 text-slate-100">
      
      {/* Intro banner */}
      <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <span className="px-2.5 py-0.5 bg-red-400/10 text-red-500 font-mono text-[10px] uppercase rounded-full border border-red-500/20">
            Section 19 Mechanism
          </span>
          <h3 className="text-xl font-bold font-display">Section 19 Crowdsourced Cleanup Portal</h3>
          <p className="text-sm text-slate-400">
            Objections under **Section 19** must be filed within 14 days of the voter register's display. Report multiple registrations, underaged voters, and deceased electors to compile public accountability reports.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <ShieldCheck size={120} className="text-slate-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left pane: Roster of submissions and additions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-900 pb-3">
            <h4 className="text-sm font-bold font-display text-slate-200">Active Register Objections</h4>
            <button
              onClick={() => {
                setIsFormOpen(true);
                setSelectedReportId(null);
              }}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus size={14} /> File Objection
            </button>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {reports.map((report) => {
              const isSelected = selectedReportId === report.id || (!selectedReportId && report.id === reports[0]?.id);

              return (
                <div
                  key={report.id}
                  onClick={() => {
                    setSelectedReportId(report.id);
                    setIsFormOpen(false);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-red-500/40'
                      : 'bg-slate-950 border-slate-800 hover:bg-slate-900/30'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-blue-400 font-bold">{report.id}</span>
                      <h5 className="font-bold text-slate-200 text-xs mt-1 truncate max-w-[180px]">
                        {report.puName}
                      </h5>
                    </div>
                    {report.status === 'verified' && (
                      <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded text-[9px] font-bold font-mono">
                        VERIFIED
                      </span>
                    )}
                    {report.status === 'under_review' && (
                      <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded text-[9px] font-bold font-mono">
                        REVIEW
                      </span>
                    )}
                    {report.status === 'pending' && (
                      <span className="px-1.5 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-[9px] font-bold font-mono">
                        PENDING
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-zinc-400 mt-2 line-clamp-2">
                    {report.description}
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>{report.state} ({report.lga})</span>
                    <button
                      onClick={(e) => handleDelete(report.id, e)}
                      className="text-slate-600 hover:text-red-500 p-1 rounded hover:bg-slate-800 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}

            {reports.length === 0 && (
              <div className="p-8 text-center text-slate-500 border border-slate-800 rounded-xl bg-slate-950">
                No active objections registered. File one to start!
              </div>
            )}
          </div>
        </div>

        {/* Right pane: View full report OR Add Form */}
        <div className="lg:col-span-7">
          {isFormOpen ? (
            /* Creation Form */
            <form onSubmit={handleSubmit} className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <div className="border-b border-slate-900 pb-3">
                <h4 className="text-base font-bold font-display">Submit New Section 19 Objection Case</h4>
                <p className="text-xs text-slate-500 mt-0.5">Please provide factual coordinates and describe the evidence clearly.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-red-500"
                    placeholder="e.g. Kolawole Alao"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-red-500"
                    placeholder="kola@domain.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Objection Type *</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value as ReportType)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-red-500"
                  >
                    <option value="deceased">Deceased Electors</option>
                    <option value="underaged">Underaged Voters</option>
                    <option value="multiple">Double Registrations</option>
                    <option value="noncitizen">Non-Citizen Registrees</option>
                    <option value="other">Other Offenses</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">State Coordinates *</label>
                  <select
                    value={stateName}
                    onChange={(e) => {
                      setStateName(e.target.value);
                      const matching = STATES_DATA.find(s => s.name === e.target.value);
                      if (matching && matching.lgas.length > 0) {
                        setLgaName(matching.lgas[0].name);
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-red-500"
                  >
                    {STATES_DATA.map(s => (
                      <option key={s.id} value={s.name}>{s.name} ({s.region})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Local Gov (LGA) *</label>
                  <select
                    value={lgaName}
                    onChange={(e) => setLgaName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-red-500"
                  >
                    {activeStateObj.lgas.map(l => (
                      <option key={l.name} value={l.name}>{l.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Polling Unit Name *</label>
                  <input
                    type="text"
                    required
                    value={puName}
                    onChange={(e) => setPuName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-red-500"
                    placeholder="e.g. Town Square Court"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Polling Unit Code *</label>
                  <input
                    type="text"
                    required
                    value={puCode}
                    onChange={(e) => setPuCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-red-500"
                    placeholder="e.g. PU-OSO-014"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Detailed Objection Description *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-2 px-3 text-xs outline-none focus:border-red-500 family-sans resize-none"
                  placeholder="Precisely specify why this registration violates physical demographics (e.g. Joseph Alabi, DOB 1948, deceased July 12, 2024)..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Evidence / Auxiliary Documents</label>
                <input
                  type="text"
                  value={evidenceDetails}
                  onChange={(e) => setEvidenceDetails(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-red-500"
                  placeholder="e.g. National Obituary index, hospital registration ref"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-slate-800 hover:bg-slate-900 rounded-lg text-xs font-semibold text-slate-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 shadow cursor-pointer transition-colors"
                >
                  Confirm Objections
                </button>
              </div>
            </form>
          ) : activeReport ? (
            /* Selected Objection Document Details */
            <div id="print-area" className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-slate-900 pb-4">
                  <div>
                    <span className="text-xs font-bold font-mono text-red-500 uppercase">OFFICIAL COMPLIANCE BRIEF</span>
                    <h4 className="text-base font-bold font-display text-slate-100 flex items-center gap-2 mt-1">
                      Case: {activeReport.id}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-mono mt-1">
                      Compiled: {new Date(activeReport.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={handlePrintBrief}
                    className="p-2 border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-300 flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Printer size={14} /> Print Brief
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 border-b border-slate-920">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">State Focus</span>
                    <strong className="text-xs text-slate-200">{activeReport.state}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">LGA Region</span>
                    <strong className="text-xs text-slate-200">{activeReport.lga}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">Polling Code</span>
                    <strong className="text-xs text-slate-200 font-mono">{activeReport.puCode}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">Audit Type</span>
                    <strong className="text-xs text-red-400 capitalize">{activeReport.reportType}</strong>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wide block">Factual Objections Details</span>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 border border-slate-900 rounded-xl">
                      {activeReport.description}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wide block">Verifiable Exhibits</span>
                    <p className="text-slate-400 italic bg-slate-900/10 p-3 border border-slate-920 rounded-lg">
                      {activeReport.evidenceDetails || 'No supporting documents specified.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Document footer template ready for print */}
              <div className="border-t border-slate-900 pt-4 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Authorized Reporter: {activeReport.reporterName} ({activeReport.email})</span>
                  <span className="text-zinc-500">Ref: EA_2022_S19_PETITION</span>
                </div>

                <div className="p-3 bg-red-950/20 border border-red-900/20 rounded-xl text-[11px] text-red-400/90 leading-relaxed flex items-start gap-2">
                  <AlertTriangle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Objection Filing Mandate</strong>: Under **Section 19(2)**, false reports or fraudulent documentation carry civil liabilities and fines up to ₦100,000. Verify the exhibits physically prior to launching local litigation.
                  </span>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-48 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
              Select or file an objection to examine records
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
