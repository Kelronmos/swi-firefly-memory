export function GlobalTrustNetwork() {
  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2 flex justify-between items-center">
        <span>Global Trust Network</span>
        <span className="text-[10px] text-cyan-400 border border-cyan-400/30 px-1 bg-cyan-400/10">STAGE 17</span>
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center"><span className="text-neutral-500">REGISTERED ENTITIES:</span><span className="text-white">4</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">AI AGENTS:</span><span className="text-white">2</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">TRUSTED MODULES:</span><span className="text-white">3</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">VERIFIED REPOS:</span><span className="text-white">4</span></div>
        <div className="w-full h-px bg-neutral-800 my-2" />
        <div className="flex justify-between items-center"><span className="text-neutral-500">CERT STATUS:</span><span className="text-green-500">VALID ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">TRUST SCORE:</span><span className="text-green-400 font-bold">99.1%</span></div>
        <div className="w-full h-px bg-neutral-800 my-2" />
        <div className="flex justify-between items-center"><span className="text-neutral-500">NETWORK STATE:</span><span className="text-cyan-400 font-bold animate-pulse">OPERATIONAL</span></div>
      </div>
    </div>
  );
}
