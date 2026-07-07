import { useState } from 'react';
import { AlertCircle, ShieldAlert, Sparkles, HelpCircle, ArrowRight, Gauge, CheckCircle2 } from 'lucide-react';

export default function AnomalyDetector() {
  // Velocity states
  const [baseline2Year, setBaseline2Year] = useState<number>(273263); // Baseline growth
  const [current1Week, setCurrent1Week] = useState<number>(393269); // 1-week surge count

  // Saturation states
  const [lgaPopulation, setLgaPopulation] = useState<number>(500000); // NPC adult population
  const [lgaRegistrations, setLgaRegistrations] = useState<number>(512000); // Registered voters

  const formatNum = (x: number) => x.toLocaleString();

  // 1. Calculate Velocity Indicators
  const weeklyBaselineAverage = Math.round(baseline2Year / 104); // 104 weeks in 2 years
  const velocityMultiplier = parseFloat((current1Week / (weeklyBaselineAverage || 1)).toFixed(1));
  const velocityStatus = 
    velocityMultiplier > 50 ? 'critical' :
    velocityMultiplier > 10 ? 'high' :
    velocityMultiplier > 2 ? 'medium' : 'normal';

  // 2. Calculate Saturation Indicators
  const saturationPercent = parseFloat(((lgaRegistrations / (lgaPopulation || 1)) * 100).toFixed(1));
  const saturationStatus = 
    saturationPercent > 100 ? 'critical' :
    saturationPercent > 90 ? 'high' :
    saturationPercent > 65 ? 'medium' : 'normal';

  return (
    <div className="space-y-8 text-slate-100">
      
      {/* Educational Header */}
      <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <span className="px-2.5 py-0.5 bg-red-500/10 text-red-500 font-mono text-[10px] uppercase rounded-full border border-red-500/20">
            Electoral Forensic Sandbox
          </span>
          <h3 className="text-xl font-bold font-display leading-tight">Detecting Statistically Implausible Voter Spikes</h3>
          <p className="text-sm text-slate-400">
            Biometric voter registration can be manipulated by pre-uploading ghost records before biometric verification. Under the **Electoral Act 2022**, VoterWatch deploys double-logic testing to verify human vs administrative origins.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <ShieldAlert size={140} className="text-slate-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Module A: Velocity Spike Simulator (The "Osun Anomaly" Sandbox) */}
        <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
              <div className="p-2 bg-red-600/10 rounded-lg text-red-500">
                <Gauge size={18} />
              </div>
              <div>
                <h4 className="text-base font-bold font-display">Weekly Velocity Spike Monitor</h4>
                <p className="text-xs text-slate-500 font-mono">Case study: Osun State 2022 surge trigger.</p>
              </div>
            </div>

            {/* Inputs sliders */}
            <div className="space-y-5 py-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Historical 2-Year Growth Baseline</span>
                  <span className="text-blue-400 font-bold">{formatNum(baseline2Year)} voters</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="1000000"
                  step="10000"
                  value={baseline2Year}
                  onChange={(e) => setBaseline2Year(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-[10px] text-slate-500 font-mono">Generates weekly average: {formatNum(weeklyBaselineAverage)} voters/week</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Current 7-Day Pre-registrations</span>
                  <span className="text-red-500 font-bold">{formatNum(current1Week)} voters</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="500000"
                  step="5000"
                  value={current1Week}
                  onChange={(e) => setCurrent1Week(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <span className="text-[10px] text-slate-500 font-mono">Raw data captured inside a single reporting cycle</span>
              </div>
            </div>
          </div>

          {/* Mathematical results and logs */}
          <div className="mt-6 border-t border-slate-900 pt-5 space-y-4">
            <div className="flex justify-between items-center bg-slate-900/50 p-4 border border-slate-800 rounded-xl">
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Velocity Multiplier</p>
                <h5 className="text-3xl font-extrabold font-display text-slate-100 mt-1">
                  {velocityMultiplier}x <span className="text-xs text-slate-500 font-normal">faster</span>
                </h5>
              </div>
              
              {velocityStatus === 'critical' && (
                <span className="px-3 py-1 bg-red-600/10 text-red-500 border border-red-500/20 text-xs font-semibold rounded-md flex items-center gap-1">
                  <AlertCircle size={12} className="animate-ping" /> CRITICAL SPIKE
                </span>
              )}
              {velocityStatus === 'high' && (
                <span className="px-3 py-1 bg-amber-600/10 text-amber-500 border border-amber-500/20 text-xs font-semibold rounded-md">
                  HIGH SPIKE
                </span>
              )}
              {velocityStatus === 'medium' && (
                <span className="px-3 py-1 bg-yellow-600/10 text-yellow-500 border border-yellow-500/20 text-xs font-semibold rounded-md">
                  MODERATE SURGE
                </span>
              )}
              {velocityStatus === 'normal' && (
                <span className="px-3 py-1 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold rounded-md">
                  NORMAL PACE
                </span>
              )}
            </div>

            {/* Diagnostic readout */}
            <div className="text-xs text-slate-400 leading-relaxed bg-slate-900/20 p-3 rounded-lg p-3 border border-slate-900">
              {velocityStatus === 'critical' ? (
                <p>
                  ⚡ <strong>Red Flag Raised</strong>: Current velocity is <span className="text-red-500 font-bold">{velocityMultiplier} times faster</span> than the historical average of {formatNum(weeklyBaselineAverage)} per week. This matches the exact parameters of the <strong>Osun Anomaly</strong>. It is statistically impossible for standard physical registrations to increase by this magnitude in 7 days without batch computer-guided injections.
                </p>
              ) : velocityStatus === 'high' ? (
                <p>
                  ⚠️ <strong>Warning</strong>: The growth rate is {velocityMultiplier}x average. This represents aggressive political drive or potential pre-capture card stacking. Biometric registers must be audited.
                </p>
              ) : (
                <p>
                  ✅ <strong>Clean Velocity</strong>: Growth rate ({velocityMultiplier}x background noise) falls within logical parameters of standard civic engagement and physical station logistics.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Module B: Population Saturation Check */}
        <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
              <div className="p-2 bg-emerald-600/10 rounded-lg text-emerald-500">
                <ShieldAlert size={18} />
              </div>
              <div>
                <h4 className="text-base font-bold font-display">Demographic Saturation Auditor</h4>
                <p className="text-xs text-slate-500 font-mono">Compares active registries against physical census caps.</p>
              </div>
            </div>

            {/* Inputs sliders */}
            <div className="space-y-5 py-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>CPC Projected Adult Population (Ages 18+)</span>
                  <span className="text-emerald-400 font-bold">{formatNum(lgaPopulation)} adults</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={lgaPopulation}
                  onChange={(e) => setLgaPopulation(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-[10px] text-slate-500 font-mono">Consists of local population threshold in targeted LGA</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>VOTER_REGISTRY Registered Voters</span>
                  <span className="text-purple-400 font-bold">{formatNum(lgaRegistrations)} voters</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={lgaRegistrations}
                  onChange={(e) => setLgaRegistrations(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="text-[10px] text-slate-500 font-mono">Total size of active electronic roll in this region</span>
              </div>
            </div>
          </div>

          {/* Saturation calculations */}
          <div className="mt-6 border-t border-slate-900 pt-5 space-y-4">
            <div className="flex justify-between items-center bg-slate-900/50 p-4 border border-slate-800 rounded-xl">
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Saturation Density</p>
                <h5 className={`text-3xl font-extrabold font-display mt-1 ${saturationPercent > 100 ? 'text-red-500' : 'text-slate-100'}`}>
                  {saturationPercent}% <span className="text-xs text-slate-500 font-normal">of adults</span>
                </h5>
              </div>
              
              {saturationStatus === 'critical' ? (
                <span className="px-3 py-1 bg-red-600/10 text-red-500 border border-red-500/20 text-xs font-semibold rounded-md flex items-center gap-1">
                  💥 OVER-SATURATED (&gt;100%)
                </span>
              ) : saturationStatus === 'high' ? (
                <span className="px-3 py-1 bg-amber-600/10 text-amber-500 border border-amber-500/20 text-xs font-semibold rounded-md">
                   IMPLAUSIBLE DENSITY
                </span>
              ) : (
                <span className="px-3 py-1 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold rounded-md">
                  DEMOGRAPHIC SAFE
                </span>
              )}
            </div>

            {/* Diagnostic readout */}
            <div className="text-xs text-slate-400 leading-relaxed bg-slate-900/20 p-3 rounded-lg border border-slate-900">
              {saturationPercent > 100 ? (
                <p>
                  🛑 <strong>Severe Demographic Fraud</strong>: Registered voters represent <span className="text-red-500 font-bold">{saturationPercent}%</span> of the entire projected adult population. It is mathematically impossible to have more voters than the absolute living adult ceiling. This indicates multiple registrations and invalid voters that must be cleaned under <strong>Section 12 & 19</strong>.
                </p>
              ) : saturationPercent > 90 ? (
                <p>
                  ⚠️ <strong>Implausible Saturation</strong>: {saturationPercent}% saturation exceeds standard historical global voter registrations averages (which hover around 60-70% of total adults). High likelihood of deceased, migrated, or cloned registrants populating the stack.
                </p>
              ) : (
                <p>
                  ✅ <strong>Safe Density Alignment</strong>: Voter density ({saturationPercent}% of adults) falls within typical compliance ranges.
                </p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Case studies from article and policy steps */}
      <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl relative">
        <h4 className="text-lg font-bold font-display mb-4 text-slate-100 flex items-center gap-2">
          <Sparkles size={18} className="text-red-500" />
          The Forensic Resolution Playbook
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="font-mono text-red-500 font-bold">STEP 01</span>
            <h5 className="font-bold text-slate-200">Flag the Record Logs</h5>
            <p className="leading-relaxed">Use velocity spike models to isolate suspicious local clusters in pre-registration databases prior to permanent card issuance.</p>
          </div>
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="font-mono text-red-500 font-bold">STEP 02</span>
            <h5 className="font-bold text-slate-200">Deploy Biometric ABIS Deduping</h5>
            <p className="leading-relaxed">The Automated Biometric Identification System cross-references double-fingerprints to strip duplicated voters prior to final register completion.</p>
          </div>
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="font-mono text-red-500 font-bold">STEP 03</span>
            <h5 className="font-bold text-slate-200">Invoke Section 19 Disputes</h5>
            <p className="leading-relaxed">Assemble objection briefs, supply census coordinates, and demand server checks from INEC under statutory administrative procedures.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
