import { useState } from 'react';
import { STATES_DATA } from '../data/electionData';
import { StateData, LGAData } from '../types';
import { Map, Signal, Search, Radio, Wifi, Loader2, Info, Navigation, ShieldCheck } from 'lucide-react';

export default function PUMap() {
  const [selectedStateId, setSelectedStateId] = useState<string>('lagos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [connectingCarrier, setConnectingCarrier] = useState<string | null>(null);

  const selectedState = STATES_DATA.find(s => s.id === selectedStateId) || STATES_DATA[0];

  // Helper formatting numbers with commas
  const formatNum = (x: number) => x.toLocaleString();

  // Simulated polling unit generator based on LGA selection
  const getSimulatedPUs = (lga: LGAData) => {
    const carriers = ['MTN Ng', 'Airtel Lagos', 'Globacom', '9mobile'];
    const codes = ['001', '002', '003', '004', '005'];
    
    return codes.map((code, idx) => {
      const carrierIdx = (lga.name.length + idx) % carriers.length;
      const strength = (lga.networkScore + idx) % 5 || 1; // 1 to 5
      const uploadSuccess = strength >= 3;
      
      return {
        code: `PU-${lga.name.substring(0, 3).toUpperCase()}-${code}`,
        name: `${lga.name} Community Hall ${code}`,
        carrier: carriers[carrierIdx],
        signalStrength: strength,
        uploadSuccess,
        votersRegistered: Math.round(lga.registered2023 / lga.pUsCount * (1 + 0.1 * idx))
      };
    });
  };

  const handleSimulateConnection = (carrier: string) => {
    setConnectingCarrier(carrier);
    setTimeout(() => {
      setConnectingCarrier(null);
    }, 1800);
  };

  // Filter LGAs by query
  const filteredLGAs = selectedState.lgas.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 text-slate-100">
      
      {/* Educational banner */}
      <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold font-display flex items-center gap-2">
            <Radio size={20} className="text-red-500 animate-pulse" />
            176,846 Polling Units: Connectivity & BVAS Sync Maps
          </h3>
          <p className="text-sm text-slate-400 max-w-2xl">
            A tool like the BVAS is only as good as the network it runs on. Explore network coverage density (MTN, Airtel, Glo) across active LGAs to predict transmission bottlenecks on election days.
          </p>
        </div>
        <div className="flex items-center gap-1.5 p-2.5 bg-slate-900 border border-slate-800 rounded-xl">
          <Wifi className="text-emerald-500" size={16} />
          <span className="text-xs font-bold font-mono">Live Sync Simulated</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: SVG Interactive Geopolitical Map of Nigeria */}
        <div className="lg:col-span-5 p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-6">
          <div>
            <h4 className="text-sm font-bold font-display text-slate-200">Nigeria Geopolitical Heatmap</h4>
            <p className="text-xs text-slate-500 mt-1">Click a highlighted state circle to load its local administrative polling roster.</p>
          </div>

          {/* Interactive SVG representation */}
          <div className="relative aspect-square w-full bg-slate-900/30 border border-slate-900/50 rounded-xl p-4 flex items-center justify-center">
            {/* Outline representation of political borders or region labels */}
            <svg viewBox="0 0 400 400" className="w-full h-full max-h-[320px] select-none overflow-visible">
              {/* Regional background grids */}
              <rect x="10" y="10" width="380" height="380" rx="12" fill="none" stroke="#1e293b" strokeDasharray="3,3" />
              
              {/* Simulated regional lines */}
              <path d="M 200,20 L 200,380" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
              <path d="M 20,200 L 380,200" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />

              <text x="25" y="35" className="fill-slate-600 font-mono text-[9px] uppercase">North-West Grid</text>
              <text x="250" y="35" className="fill-slate-600 font-mono text-[9px] uppercase">North-East Region</text>
              <text x="25" y="375" className="fill-slate-600 font-mono text-[9px] uppercase">South-West Coast</text>
              <text x="260" y="375" className="fill-slate-600 font-mono text-[9px] uppercase">Delta South-South</text>

              {/* Nigeria simplified state nodes */}
              {STATES_DATA.map((state) => {
                // Map latitude/longitude to coordinate space [0, 400]
                // Lat limits roughly: [4.5, 13] -> map to [350, 50]
                // Lng limits roughly: [3, 9] -> map to [50, 350]
                const x = ((state.latLng[1] - 3) / 6) * 240 + 70;
                const y = 350 - ((state.latLng[0] - 4) / 9) * 260;
                const isActive = state.id === selectedStateId;

                return (
                  <g 
                    key={state.id} 
                    className="cursor-pointer group"
                    onClick={() => setSelectedStateId(state.id)}
                  >
                    {/* Ripple background ring */}
                    {isActive && (
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={22} 
                        fill="none" 
                        stroke="#ef4444" 
                        strokeWidth="1.5" 
                        className="animate-ping"
                        style={{ animationDuration: '3s' }}
                      />
                    )}
                    
                    {/* Signal beam line to center */}
                    <circle 
                      cx={x} 
                      cy={y} 
                      r={isActive ? 14 : 10} 
                      fill={isActive ? '#ef4444' : '#1e293b'} 
                      stroke={isActive ? '#ef4444' : '#475569'}
                      strokeWidth={isActive ? 2 : 1}
                      className="transition-all duration-300 group-hover:fill-red-600/50"
                    />

                    {/* Outer border visual feedback */}
                    <circle 
                      cx={x} 
                      cy={y} 
                      r={24} 
                      fill="none" 
                      stroke={isActive ? '#ef4444/30' : 'none'} 
                      strokeWidth="1" 
                    />

                    {/* Text node label */}
                    <text 
                      x={x} 
                      y={y + 3} 
                      textAnchor="middle" 
                      className={`font-display text-[9px] font-bold ${
                        isActive ? 'fill-white' : 'fill-slate-400 group-hover:fill-white'
                      }`}
                    >
                      {state.name.substring(0, 3).toUpperCase()}
                    </text>

                    {/* Sub caption rendering */}
                    <text 
                      x={x} 
                      y={y + (isActive ? 32 : 24)} 
                      textAnchor="middle" 
                      className={`font-mono text-[8px] transition-all duration-200 ${
                        isActive ? 'fill-red-500 font-bold' : 'fill-slate-600 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {isActive ? `${(state.turnoutPercent2023).toFixed(1)}% Turnout` : state.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active selection data */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200 uppercase font-display">{selectedState.name} State Profile</span>
              <span className="font-mono text-slate-500">{selectedState.region} Grid</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-1 border-t border-slate-900 pt-2">
              <span className="text-slate-500">Registered: <strong className="text-slate-300">{formatNum(selectedState.registered2023)}</strong></span>
              <span className="text-slate-500">Accredited: <strong className="text-slate-300">{(selectedState.votesCast2023 / (selectedState.turnoutPercent2023 || 1) * 100).toLocaleString().split('.')[0]}</strong></span>
              <span className="text-slate-500">Net Quality: <strong className="text-emerald-500">{(selectedState.networkQuality * 20).toFixed(0)}%</strong></span>
              <span className="text-slate-500">Total LGAs: <strong className="text-slate-300">{selectedState.lgas.length}</strong></span>
            </div>
          </div>
        </div>

        {/* Right column: LGA and simulated PUs list */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-950 p-4 border border-slate-800 rounded-xl">
            <h4 className="text-sm font-bold font-display text-slate-200">
              Auditor Polling Station Roster ({selectedState.name})
            </h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Search LGA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-48 bg-slate-900 border border-slate-800 rounded-lg py-1 px-3 pl-8 text-xs text-slate-300 outline-none focus:border-red-500 font-sans"
              />
              <Search className="absolute left-2.5 top-2 text-slate-500" size={13} />
            </div>
          </div>

          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {filteredLGAs.map((lga) => {
              const simulatedPus = getSimulatedPUs(lga);

              return (
                <div key={lga.name} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                    <div>
                      <h5 className="text-sm font-bold font-display text-slate-100 flex items-center gap-1.5">
                        <Navigation size={13} className="text-slate-500" />
                        {lga.name} LGA
                      </h5>
                      <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                        Estimated {lga.pUsCount} Polling Stations | Avg {formatNum(Math.round(lga.registered2023 / lga.pUsCount))} voters per PU
                      </span>
                    </div>

                    <div className="flex items-center gap-1 p-1 bg-slate-900 rounded border border-slate-800">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span 
                          key={s} 
                          className={`w-1 h-3 rounded-full transition-all duration-300 ${
                            s <= lga.networkScore 
                              ? lga.networkScore >= 4 ? 'bg-emerald-500' : 'bg-amber-500' 
                              : 'bg-slate-800'
                          }`} 
                        />
                      ))}
                      <span className="text-[9px] font-mono text-slate-400 ml-1">LGA Signal</span>
                    </div>
                  </div>

                  {/* List Polling units */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {simulatedPus.map((pu) => (
                      <div 
                        key={pu.code} 
                        className="p-3 bg-slate-900/60 border border-slate-900 rounded-lg flex flex-col justify-between space-y-2.5"
                      >
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-mono text-blue-400 font-bold">{pu.code}</span>
                            <span className="text-[9px] font-mono text-slate-500">{pu.votersRegistered} elect</span>
                          </div>
                          <h6 className="text-[11px] font-bold text-slate-300 truncate mt-1">{pu.name}</h6>
                        </div>

                        {/* Network verification indicator */}
                        <div className="flex justify-between items-center pt-2 border-t border-slate-920">
                          <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            <Signal size={10} className={pu.uploadSuccess ? "text-emerald-500" : "text-amber-500"} />
                            <span className="font-mono cursor-pointer hover:underline" onClick={() => handleSimulateConnection(pu.carrier)}>
                              {pu.carrier}
                            </span>
                          </div>

                          {connectingCarrier === pu.carrier ? (
                            <span className="flex items-center gap-1 text-[9px] font-mono text-blue-400">
                              <Loader2 size={10} className="animate-spin" /> testing...
                            </span>
                          ) : pu.uploadSuccess ? (
                            <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 font-mono text-[9px] rounded font-bold border border-emerald-500/10">
                              READY_ACC
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-500 font-mono text-[9px] rounded font-bold border border-amber-500/10">
                              OFFLINE_QUEUE
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {filteredLGAs.length === 0 && (
              <div className="p-8 text-center text-slate-500 bg-slate-950 border border-slate-800 rounded-xl">
                No local LGAs match "{searchQuery}"
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Connectivity Insight notes */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-2">
        <h5 className="font-bold text-slate-300 flex items-center gap-1.5">
          <Info size={14} className="text-red-500" />
          The Transmission Challenge (Part Three Context)
        </h5>
        <p className="leading-relaxed">
          On Election Day, BVAS devices write encryption signatures to local flash storage, then attempt to connect to regional cell towers in order to upload the Result sheet image straight to the public <strong>IReV Portal</strong>. 
          If network signal is poor (marked as <span className="text-amber-500 font-semibold">OFFLINE_QUEUE</span> above), transmission stalls, forcing technical operators to queue logs locally until they transport the physical unit to Ward Coils—creating vulnerabilities for data tampering.
        </p>
      </div>

    </div>
  );
}
