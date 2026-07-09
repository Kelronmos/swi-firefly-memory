export function ExecutionGate3() {
  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2 flex justify-between items-center">
        <span>Execution Gate 3</span>
        <span className="text-[10px] bg-neutral-900 px-1 border border-neutral-700">2/3+ VALIDATION</span>
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 text-[10px] items-center">
          <span className="text-white font-bold">DOMAIN</span>
          <span className="text-white font-bold text-center">SCORE</span>
          <span className="text-white font-bold text-right">PROOF</span>
          
          <span className="text-[#00ff00]">JOE (Intel)</span>
          <span className="text-center">33.3%</span>
          <span className="text-green-500 text-right">✓ VALID</span>
          
          <span className="text-[#ff00ff]">ALITA (Security)</span>
          <span className="text-center">33.3%</span>
          <span className="text-green-500 text-right">✓ VALID</span>
          
          <span className="text-cyan-400">GOVERNANCE</span>
          <span className="text-center">33.3%</span>
          <span className="text-green-500 text-right">✓ VALID</span>

          <span className="text-neutral-400">FIREFLY (Memory)</span>
          <span className="text-center text-neutral-500">20.0%</span>
          <span className="text-green-500 text-right">✓ VALID</span>
        </div>

        <div className="w-full h-px bg-neutral-800" />

        <div className="space-y-1">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-neutral-500">REQUIRED:</span>
            <span className="text-white">≥ 66.67% (2/3)</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-500">TOTAL SCORE:</span>
            <span className="text-green-500 font-bold">99.9%</span>
          </div>
          <div className="flex justify-between items-center text-sm pt-2">
            <span className="text-neutral-500">GATE STATUS:</span>
            <span className="text-black bg-green-500 px-2 py-0.5 font-bold">PASSED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
