import { useState } from 'react';
import { HISTORICAL_TURNOUT, STATES_DATA } from '../data/electionData';
import { StateData } from '../types';
import { TrendingDown, Users, FileCheck, Landmark, ArrowRight, HelpCircle } from 'lucide-react';

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [state1Id, setState1Id] = useState<string>('lagos');
  const [state2Id, setState2Id] = useState<string>('osun');

  const activeHistorical = HISTORICAL_TURNOUT.find(h => h.year === selectedYear) || HISTORICAL_TURNOUT[6];
  const state1 = STATES_DATA.find(s => s.id === state1Id) || STATES_DATA[0];
  const state2 = STATES_DATA.find(s => s.id === state2Id) || STATES_DATA[1];

  // Helper formatting numbers with commas
  const formatNum = (x: number) => x.toLocaleString();

  // Find max values for scale rendering of SVGs
  const maxRegisteredValue = Math.max(...HISTORICAL_TURNOUT.map(h => h.registered));

  return (
    <div className="space-y-8">
      {/* Overview Metric banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group hover:border-red-500/50 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase">National Voter Population</p>
              <h3 className="text-2xl font-bold font-display text-slate-100 mt-1">{formatNum(activeHistorical.registered)}</h3>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <span className="text-emerald-500">+{((activeHistorical.registered / HISTORICAL_TURNOUT[0].registered - 1) * 100).toFixed(1)}%</span> cumulative growth
              </p>
            </div>
            <div className="p-2.5 bg-slate-800/80 rounded-lg text-slate-300">
              <Users size={18} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500/20 group-hover:bg-red-500/70 transition-all duration-300" />
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group hover:border-red-500/50 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase">Active Votes Cast</p>
              <h3 className="text-2xl font-bold font-display text-slate-100 mt-1">{formatNum(activeHistorical.votesCast)}</h3>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <TrendingDown size={12} className="text-red-500" />
                <span className="text-red-500">Decline</span> from peak 2003
              </p>
            </div>
            <div className="p-2.5 bg-slate-800/80 rounded-lg text-slate-300">
              <Landmark size={18} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500/20 group-hover:bg-red-500/70 transition-all duration-300" />
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group hover:border-red-500/50 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase">Interactive Turnout</p>
              <h3 className="text-2xl font-bold font-display text-red-500 mt-1">{activeHistorical.turnoutPercent.toFixed(1)}%</h3>
              <p className="text-xs text-slate-400 mt-2">
                Lowest: 26.7% in 2023 election
              </p>
            </div>
            <div className="p-2.5 bg-slate-800/80 rounded-lg text-red-500">
              <TrendingDown size={18} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500/20 group-hover:bg-red-500/70 transition-all duration-300" />
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group hover:border-red-500/50 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase">Participation Gap</p>
              <h3 className="text-2xl font-bold font-display text-slate-100 mt-1">{(activeHistorical.registered - activeHistorical.votesCast).toLocaleString()}</h3>
              <p className="text-xs text-slate-400 mt-2">
                Unused mandate: {(100 - activeHistorical.turnoutPercent).toFixed(1)}% absent
              </p>
            </div>
            <div className="p-2.5 bg-slate-800/80 rounded-lg text-slate-300">
              <FileCheck size={18} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500/20 group-hover:bg-red-500/70 transition-all duration-300" />
        </div>
      </div>

      {/* Paradox Historical Interactive Timeline Chart */}
      <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-6">
        <div>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold font-display text-slate-100">The Participation Paradox Indicator</h3>
              <p className="text-sm text-slate-400">Nigeria added over 35 million new registered voters while actual voter turnouts declined significantly.</p>
            </div>
            <div className="flex flex-wrap gap-1 bg-slate-900 p-1 border border-slate-800 rounded-lg">
              {HISTORICAL_TURNOUT.map((h) => (
                <button
                  key={h.year}
                  onClick={() => setSelectedYear(h.year)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
                    selectedYear === h.year
                      ? 'bg-red-600 text-slate-50 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  {h.year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom SVG Line and Bar Dual-Axis Visualizer */}
        <div className="relative h-[280px] w-full bg-slate-900/30 border border-slate-900 rounded-xl p-4 flex flex-col justify-between">
          <div className="absolute inset-x-0 top-6 bottom-12 flex flex-col justify-between pointer-events-none opacity-10">
            <div className="border-b border-dashed border-slate-200 w-full" />
            <div className="border-b border-dashed border-slate-200 w-full" />
            <div className="border-b border-dashed border-slate-200 w-full" />
            <div className="border-b border-dashed border-slate-200 w-full" />
          </div>

          {/* SVG Canvas drawing lines */}
          <div className="relative flex-1">
            <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              {/* Area Fill for registered */}
              <defs>
                <linearGradient id="gradReg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="gradVotes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Nodes & lines */}
              {HISTORICAL_TURNOUT.map((item, idx) => {
                const step = 700 / (HISTORICAL_TURNOUT.length - 1);
                const x = idx * step;
                // Scale Y axis (Registered capped at 100M max for scaling)
                const yReg = 200 - (item.registered / 100000000) * 160;
                const yVotes = 200 - (item.votesCast / 100000000) * 160;

                return (
                  <g key={item.year}>
                    {/* Tick label and highlight when active */}
                    <circle
                      cx={x}
                      cy={yReg}
                      r={selectedYear === item.year ? 5 : 4}
                      fill="#3b82f6"
                      className="cursor-pointer transition-all duration-300 hover:r-6"
                      onClick={() => setSelectedYear(item.year)}
                    />
                    <circle
                      cx={x}
                      cy={yVotes}
                      r={selectedYear === item.year ? 5 : 4}
                      fill="#ef4444"
                      className="cursor-pointer transition-all duration-300 hover:r-6"
                      onClick={() => setSelectedYear(item.year)}
                    />

                    {selectedYear === item.year && (
                      <line x1={x} y1={0} x2={x} y2={200} stroke="#475569" strokeDasharray="4,4" />
                    )}
                  </g>
                );
              })}

              {/* Draw registration continuous line */}
              <path
                d={HISTORICAL_TURNOUT.map((item, idx) => {
                  const step = 700 / (HISTORICAL_TURNOUT.length - 1);
                  const x = idx * step;
                  const y = 200 - (item.registered / 100000000) * 160;
                  return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#3182ce"
                strokeWidth="2.5"
                className="transition-all duration-300"
              />

              {/* Draw Votes Cast line */}
              <path
                d={HISTORICAL_TURNOUT.map((item, idx) => {
                  const step = 700 / (HISTORICAL_TURNOUT.length - 1);
                  const x = idx * step;
                  const y = 200 - (item.votesCast / 100000000) * 160;
                  return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* Timeline labels */}
          <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
            {HISTORICAL_TURNOUT.map(item => (
              <span
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`cursor-pointer ${selectedYear === item.year ? 'text-red-500 font-bold' : ''}`}
              >
                {item.year}
              </span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 justify-center text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
            <span className="text-slate-400">Registered Voter Growth (1999 → 2023)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            <span className="text-slate-400">Actual Turnout Votes (Downside Arrow)</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side State Comparative Forensic Module */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-100">
        {/* State Selection Pane */}
        <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h4 className="text-lg font-bold font-display flex items-center gap-2 text-slate-100">
              <Landmark size={20} className="text-red-500" />
              State-by-State Comparison Audit
            </h4>
            <p className="text-xs text-slate-400 mt-1">Select two states with divergent histories to evaluate the voter capture funnel and check the participation indexes.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 font-mono uppercase mb-2">Audited State A</label>
              <select
                value={state1Id}
                onChange={(e) => setState1Id(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-2 px-3 text-sm focus:border-red-500 outline-none"
              >
                {STATES_DATA.map(s => (
                  <option key={s.id} value={s.id} disabled={s.id === state2Id}>
                    {s.name} ({s.region})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-500 font-mono uppercase mb-2">Audited State B</label>
              <select
                value={state2Id}
                onChange={(e) => setState2Id(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg py-2 px-3 text-sm focus:border-red-500 outline-none"
              >
                {STATES_DATA.map(s => (
                  <option key={s.id} value={s.id} disabled={s.id === state1Id}>
                    {s.name} ({s.region})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {/* Stat comparison grid */}
            <div className="grid grid-cols-3 gap-2 text-center p-3 bg-slate-900/40 rounded-xl border border-slate-800/80">
              <span className="text-[10px] font-mono text-slate-500 text-left">Metric Indicator</span>
              <span className="text-[10px] font-bold font-mono text-blue-400">{state1.name}</span>
              <span className="text-[10px] font-bold font-mono text-emerald-400">{state2.name}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center text-sm border-b border-slate-900 pb-2">
              <span className="text-xs text-slate-400 font-medium">Registered 2019</span>
              <span className="font-mono text-right text-slate-300">{formatNum(state1.registered2019)}</span>
              <span className="font-mono text-right text-slate-300">{formatNum(state2.registered2019)}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center text-sm border-b border-slate-900 pb-2">
              <span className="text-xs text-slate-400 font-medium">Registered 2023</span>
              <span className="font-mono text-right text-slate-300 font-bold">{formatNum(state1.registered2023)}</span>
              <span className="font-mono text-right text-slate-300 font-bold">{formatNum(state2.registered2023)}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center text-sm border-b border-slate-900 pb-2">
              <span className="text-xs text-slate-400 font-medium">PVC Collected % 23</span>
              <span className="font-mono text-right text-amber-500 font-bold">{state1.pvcPercent2023.toFixed(1)}%</span>
              <span className="font-mono text-right text-amber-500 font-bold">{state2.pvcPercent2023.toFixed(1)}%</span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center text-sm border-b border-slate-900 pb-2">
              <span className="text-xs text-slate-400 font-medium">Voted 2023 Actual</span>
              <span className="font-mono text-right text-slate-100">{formatNum(state1.votesCast2023)}</span>
              <span className="font-mono text-right text-slate-100">{formatNum(state2.votesCast2023)}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center text-sm">
              <span className="text-xs text-slate-400 font-medium">Accreditation Turnout %</span>
              <span className="font-mono text-right text-red-500 font-bold">{state1.turnoutPercent2023.toFixed(2)}%</span>
              <span className="font-mono text-right text-emerald-500 font-bold">{state2.turnoutPercent2023.toFixed(2)}%</span>
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
            <h5 className="font-bold text-slate-300 flex items-center gap-1">
              <HelpCircle size={14} className="text-red-500" />
              Forensic Comparison Insight
            </h5>
            <p>
              While {state1.name} has a higher raw density of registered voters (~{formatNum(state1.registered2023)}), its actual turnout on election day is a meager <strong>{state1.turnoutPercent2023.toFixed(1)}%</strong>. 
              Contrast this with {state2.name}, capturing a sturdy turnout of <strong>{state2.turnoutPercent2023.toFixed(1)}%</strong>, showing higher mobilization and lower apathy ratios.
            </p>
          </div>
        </div>

        {/* Funnel chart mapping */}
        <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold font-display text-slate-100">Active Voter Engagement Funnel</h4>
            <p className="text-xs text-slate-400 mt-1">Mapping voter capture efficacy of {state1.name} vs. {state2.name} in their 2023 campaign lifecycle.</p>
          </div>

          {/* Funnel details */}
          <div className="my-6 space-y-6 flex-1 flex flex-col justify-around">
            {/* Stage 1: Registered */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>STAGE 1: Total Registered (100% Potential)</span>
                <span>{state1.name} vs {state2.name}</span>
               </div>
              <div className="h-6 w-full bg-slate-920 rounded-md overflow-hidden flex">
                <div
                  className="bg-blue-600 h-full flex items-center pl-2 text-[10px] font-bold text-white transition-all duration-500"
                  style={{ width: '100%', opacity: 0.8 }}
                >
                  {state1.name}: {formatNum(state1.registered2023)}
                </div>
              </div>
              <div className="h-6 w-full bg-slate-920 rounded-md overflow-hidden flex mt-1">
                <div
                  className="bg-emerald-600 h-full flex items-center pl-2 text-[10px] font-bold text-white transition-all duration-500"
                  style={{ width: `${(state2.registered2023 / state1.registered2023) * 100}%` }}
                >
                  {state2.name}: {formatNum(state2.registered2023)}
                </div>
              </div>
            </div>

            {/* Stage 2: PVC Collected */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>STAGE 2: PVC Collected (Eligible to Vote)</span>
                <span className="text-amber-500">Rate: {state1.pvcPercent2023.toFixed(1)}% vs {state2.pvcPercent2023.toFixed(1)}%</span>
              </div>
              <div className="h-6 w-full bg-slate-920 rounded-md overflow-hidden flex">
                <div
                  className="bg-blue-500 h-full flex items-center pl-2 text-[10px] font-bold text-white transition-all duration-500"
                  style={{ width: `${state1.pvcPercent2023}%` }}
                >
                  {formatNum(state1.pvcCollected2023)} Collected
                </div>
              </div>
              <div className="h-6 w-full bg-slate-920 rounded-md overflow-hidden flex mt-1">
                <div
                  className="bg-emerald-500 h-full flex items-center pl-2 text-[10px] font-bold text-white transition-all duration-500"
                  style={{ width: `${(state2.pvcCollected2023 / state1.pvcCollected2023) * state1.pvcPercent2023}%` }}
                >
                  {formatNum(state2.pvcCollected2023)} Collected
                </div>
              </div>
            </div>

            {/* Stage 3: Voted */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>STAGE 3: Turnout (Actual Votes Cast)</span>
                <span className="text-red-500">Efficacy Loss: {((1 - state1.votesCast2023/state1.registered2023)*100).toFixed(1)}% vs {((1 - state2.votesCast2023/state2.registered2023)*100).toFixed(1)}%</span>
              </div>
              <div className="h-6 w-full bg-slate-920 rounded-md overflow-hidden flex">
                <div
                  className="bg-red-500 h-full flex items-center pl-2 text-[10px] font-bold text-white transition-all duration-500"
                  style={{ width: `${(state1.votesCast2023 / state1.registered2023) * 100}%` }}
                >
                  {formatNum(state1.votesCast2023)} Voted ({state1.turnoutPercent2023.toFixed(1)}%)
                </div>
              </div>
              <div className="h-6 w-full bg-slate-920 rounded-md overflow-hidden flex mt-1">
                <div
                  className="bg-red-600 h-full flex items-center pl-2 text-[10px] font-bold text-white transition-all duration-500"
                  style={{ width: `${(state2.votesCast2023 / state1.registered2023) * 100}%` }}
                >
                  {formatNum(state2.votesCast2023)} Voted ({state2.turnoutPercent2023.toFixed(1)}%)
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-4 flex justify-between items-center text-xs text-slate-500 font-mono">
            <span>Audit Ref: INEC 2023 Official Roll</span>
            <span className="text-slate-400 flex items-center gap-1 cursor-pointer hover:text-red-400">
              Diagnostic Logs <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
