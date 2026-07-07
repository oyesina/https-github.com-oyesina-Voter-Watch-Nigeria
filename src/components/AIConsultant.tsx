import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, Send, BookOpen, AlertCircle, FileText, ChevronRight, Loader2, RefreshCw, Scale } from 'lucide-react';
import { STATES_DATA } from '../data/electionData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export default function AIConsultant() {
  const [activeSubTab, setActiveSubTab] = useState<'consult' | 'wizard'>('consult');
  
  // Chat States
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Greetings. I am the VoterWatch AI Forensic Advocate. I can advise you about the **Electoral Act 2022**, clarify how **ABIS biometric matching** prevents multiple registries, review state turnout paradox analytics, and assist in compiling Section 19 objections. Ask me anything.",
      timestamp: new Date().toISOString()
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Wizard States
  const [wizardState, setWizardState] = useState('Lagos');
  const [wizardLga, setWizardLga] = useState('Alimosho');
  const [wizardClaim, setWizardClaim] = useState('');
  const [wizardReport, setWizardReport] = useState<string | null>(null);
  const [isWizardLoading, setIsWizardLoading] = useState(false);
  const [wizardError, setWizardError] = useState<string | null>(null);

  const activeStateObj = STATES_DATA.find(s => s.name === wizardState) || STATES_DATA[0];

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  // Suggested Prompts
  const handleSuggestedPrompt = (prompt: string) => {
    handleSendChatMessage(prompt);
  };

  const handleSendChatMessage = async (textToSend?: string) => {
    const rawText = textToSend || chatInput;
    if (!rawText.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: rawText,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: rawText })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'API responded with an issue');

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        text: data.text || "I was unable to assemble a report. Please verify your workspace setup.",
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        sender: 'ai',
        text: `⚠️ **Auditor Connection Failed**: ${err.message || 'Could not verify Gemini authorization.'} Please confirm that you have updated **GEMINI_API_KEY** in the Secrets drawer.`,
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleRunWizard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wizardClaim.trim()) {
      alert("Please specify the observed voter registration claim.");
      return;
    }

    setIsWizardLoading(true);
    setWizardReport(null);
    setWizardError(null);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: wizardState,
          lga: wizardLga,
          claim: wizardClaim
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Auditor experienced a pipeline crash');

      setWizardReport(data.text);
    } catch (err: any) {
      console.error(err);
      setWizardError(err.message || "Failed to reach the AI engine.");
    } finally {
      setIsWizardLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-slate-100">
      
      {/* Sub tabs nav */}
      <div className="flex border-b border-slate-900 pb-1 gap-2">
        <button
          onClick={() => setActiveSubTab('consult')}
          className={`px-4 py-2 text-xs font-bold font-display rounded-t-lg transition-all duration-200 border-b-2 flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'consult'
              ? 'border-red-500 text-slate-50 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-slate-100'
          }`}
        >
          <MessageSquare size={13} />
          Consult AI Advocate
        </button>
        <button
          onClick={() => setActiveSubTab('wizard')}
          className={`px-4 py-2 text-xs font-bold font-display rounded-t-lg transition-all duration-200 border-b-2 flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'wizard'
              ? 'border-red-500 text-slate-50 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-slate-100'
          }`}
        >
          <Sparkles size={13} />
          Forensic Claim Auditor
        </button>
      </div>

      {activeSubTab === 'consult' ? (
        /* CONSULT TAB: General legal / statistics consultation */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[550px]">
          
          {/* Chat main space */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between h-full overflow-hidden">
            <div className="p-4 border-b border-slate-900 flex justify-between items-center bg-slate-900/10">
              <span className="text-xs font-bold font-display flex items-center gap-1.5">
                <Scale size={14} className="text-red-500" />
                VoterWatch AI Legal Advisor (Gemini 3.5-flash)
              </span>
              <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/15 border border-emerald-500/10 px-2 py-0.5 rounded-full">
                ONLINE
              </span>
            </div>

            {/* Chat message listing scrollable block */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] p-3.5 rounded-xl border leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 border-slate-800 text-zinc-100 rounded-tr-none'
                        : 'bg-slate-910 border-slate-920 text-slate-300 rounded-tl-none markdown-body'
                    }`}
                  >
                    {msg.text.split('\n').map((para, i) => {
                      if (para.startsWith('- ') || para.startsWith('* ')) {
                        return <li key={i} className="ml-4 list-disc text-slate-400 my-1">{para.substring(2)}</li>;
                      }
                      if (para.includes('**')) {
                        // Very simple strong text parsing
                        const parts = para.split('**');
                        return (
                          <p key={i} className="my-1.5">
                            {parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx} className="text-red-400 font-bold">{part}</strong> : part)}
                          </p>
                        );
                      }
                      return <p key={i} className="my-1.5">{para}</p>;
                    })}
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="p-4 bg-slate-910 border border-slate-920 rounded-xl rounded-tl-none flex items-center gap-2 text-slate-500">
                    <Loader2 size={13} className="animate-spin text-red-500" />
                    <span>AI Forensic Advisor is gathering statutory legal databases...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat typing footer input container */}
            <div className="p-3.5 border-t border-slate-900 bg-slate-900/10 relative">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about the Electoral Act, double registration penalty, or BVAS logic..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg py-2 px-3.5 text-xs text-slate-200 outline-none focus:border-red-500 font-sans"
                />
                <button
                  type="button"
                  onClick={() => handleSendChatMessage()}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Send size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Right sidebar presets and references */}
          <div className="lg:col-span-4 p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="border-b border-slate-900 pb-3">
                <h4 className="text-sm font-bold font-display text-slate-200 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-slate-400" />
                  Suggested Auditing Prompts
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Click any standard preset topic to query the AI Consultant immediately.</p>
              </div>

              <div className="space-y-2.5 text-[11px]">
                <button
                  onClick={() => handleSuggestedPrompt("How did Nigeria's national voter turnout percent fall from peaking at 69% in 2003 all the way down to just 27% in the 2023 elections?")}
                  className="w-full text-left p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl leading-relaxed text-slate-400 hover:text-slate-100 transition-all font-sans cursor-pointer"
                >
                  "Why did turnout drop from 69% to 27%?"
                </button>

                <button
                  onClick={() => handleSuggestedPrompt("Precisely clarify the legal mandate and statutory protection of electronic accreditation using BVAS under Section 47(2) of the Electoral Act 2022.")}
                  className="w-full text-left p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl leading-relaxed text-slate-400 hover:text-slate-100 transition-all font-sans cursor-pointer"
                >
                  "Explain BVAS mandate under Section 47(2)"
                </button>

                <button
                  onClick={() => handleSuggestedPrompt("Could you describe how the Automated Biometric Identification System (ABIS) detects double-registrations or computer pre-uploads before physical collection?")}
                  className="w-full text-left p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl leading-relaxed text-slate-400 hover:text-slate-100 transition-all font-sans cursor-pointer"
                >
                  "How does ABIS prevent duplicate uploads?"
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-900 text-[10px] font-mono text-slate-500 leading-relaxed block">
              💡 <strong>Protip</strong>: If you see a warning about a missing API key, please specify **GEMINI_API_KEY** inside the Secrets tab in the builder.
            </div>
          </div>

        </div>
      ) : (
        /* WIZARD TAB: Comprehensive forensic claim analyzer with document generation */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Claim config Form panel */}
          <div className="lg:col-span-5 p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between">
            <form onSubmit={handleRunWizard} className="space-y-4">
              <div className="border-b border-slate-900 pb-3">
                <h4 className="text-base font-bold font-display">Forensic Claim Objections Generator</h4>
                <p className="text-xs text-slate-500 mt-1">Specify regional parameters and write down the claim details. VoterWatch AI will evaluate discrepancies and write official briefs.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">State Target</label>
                  <select
                    value={wizardState}
                    onChange={(e) => {
                      setWizardState(e.target.value);
                      const matching = STATES_DATA.find(s => s.name === e.target.value);
                      if (matching && matching.lgas.length > 0) {
                        setWizardLga(matching.lgas[0].name);
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
                  <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">LGA Target</label>
                  <select
                    value={wizardLga}
                    onChange={(e) => setWizardLga(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-1.5 px-3 text-xs outline-none focus:border-red-500"
                  >
                    {activeStateObj.lgas.map(l => (
                      <option key={l.name} value={l.name}>{l.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-500 uppercase mb-1">Observation / Alleged Mismatch *</label>
                <textarea
                  required
                  rows={4}
                  value={wizardClaim}
                  onChange={(e) => setWizardClaim(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-2 px-3 text-xs outline-none focus:border-red-500 family-sans resize-none leading-relaxed"
                  placeholder="Specify raw observations. e.g.: We noticed a sudden registration increase of 14,000 users over a 4-day period. However, our field watchers saw most local continuous voter registration centers completely shut, with recurrent BVAS network outages."
                />
              </div>

              <button
                type="submit"
                disabled={isWizardLoading || !wizardClaim.trim()}
                className="w-full py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer"
              >
                {isWizardLoading ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Generating Audit...
                  </>
                ) : (
                  <>
                    <RefreshCw size={13} />
                    Run Diagnostic Audit
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 mt-6 border-t border-slate-900 text-[10px] font-mono text-slate-500 leading-relaxed">
              ❗ <strong>Forensic Notice</strong>: This wizard compiles reports that directly citation Sections 9, 12, and 19 of the Electoral Act 2022 to provide legal strength for citizen tribunals.
            </div>
          </div>

          {/* Report outputs results pane */}
          <div className="lg:col-span-7">
            {isWizardLoading ? (
              <div className="p-8 border border-dashed border-slate-800 rounded-2xl bg-slate-950 flex flex-col items-center justify-center text-center space-y-4 h-[380px]">
                <Loader2 size={28} className="animate-spin text-red-500" />
                <div className="space-y-1 max-w-sm">
                  <h5 className="text-xs font-bold font-display text-slate-200">Evaluating Mathematical Discrepancies</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Gemini 3.5-flash is identifying matching legal code citations, referencing registration velocity indices, and compiling draft petition briefs.</p>
                </div>
              </div>
            ) : wizardError ? (
              <div className="p-8 border border-red-900/30 rounded-2xl bg-slate-950 flex flex-col items-center justify-center text-center space-y-3 h-[380px]">
                <AlertCircle size={28} className="text-red-500" />
                <div className="space-y-1 max-w-md">
                  <h5 className="text-xs font-bold font-display text-red-500">pipeline Auditor warning</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{wizardError}</p>
                </div>
              </div>
            ) : wizardReport ? (
              /* Beautifully styled Markdown report */
              <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400">AUDIT_COMPLIANCE_OBJECTION_19</span>
                    <h4 className="text-sm font-bold font-display text-slate-100 mt-0.5">VoterWatch AI Forensic Brief</h4>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="p-1 px-2.5 border border-slate-800 hover:bg-slate-900 rounded-md text-slate-300 text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <FileText size={11} /> Print Report
                  </button>
                </div>

                {/* Render report text with beautiful markdown styled blocks */}
                <div className="max-h-[420px] overflow-y-auto pr-1 text-xs leading-relaxed text-slate-300 space-y-4 p-4 bg-slate-900/20 border border-slate-900 rounded-xl font-sans">
                  {wizardReport.split('\n').map((line, idx) => {
                    if (line.startsWith('# ')) {
                      return <h3 key={idx} className="text-sm font-bold font-display text-slate-100 uppercase border-b border-slate-900 pb-1 mt-4">{line.substring(2)}</h3>;
                    }
                    if (line.startsWith('## ')) {
                      return <h4 key={idx} className="text-xs font-bold font-display text-slate-200 mt-3 flex items-center gap-1"><ChevronRight size={12} className="text-red-500" /> {line.substring(3)}</h4>;
                    }
                    if (line.startsWith('- ') || line.startsWith('* ')) {
                      return <li key={idx} className="ml-4 list-disc text-slate-400 my-1">{line.substring(2)}</li>;
                    }
                    if (line.includes('**')) {
                      // Parse double stars
                      const parts = line.split('**');
                      return (
                        <p key={idx} className="my-1">
                          {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-red-400 font-bold">{p}</strong> : p)}
                        </p>
                      );
                    }
                    return <p key={idx} className="my-1 text-slate-400 leading-relaxed">{line}</p>;
                  })}
                </div>
              </div>
            ) : (
              <div className="h-[380px] border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 text-center p-8 bg-slate-950">
                <AlertCircle size={32} className="text-slate-600 mb-2" />
                <h5 className="text-xs font-bold font-display text-slate-400">Roster Empty</h5>
                <p className="text-[11px] text-slate-500 max-w-xs mt-1">Specify observed voter registration anomalies on the left panel and click "Run Diagnostic Audit" to generate official Section 19 objections.</p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
