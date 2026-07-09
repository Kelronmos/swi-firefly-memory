export function SovereignAIStatus() {
  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2 flex justify-between items-center">
        <span>Sovereign AI Status</span>
        <span className="text-[10px] text-green-500 border border-green-500/30 px-1 bg-green-500/10">STAGE 16</span>
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center"><span className="text-neutral-500">AI ID:</span><span className="text-white">SWI-JOE-001</span></div>
        <div className="w-full h-px bg-neutral-800 my-2" />
        <div className="flex justify-between items-center"><span className="text-neutral-500">CONSTITUTION:</span><span className="text-green-500">ACTIVE ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">IDENTITY:</span><span className="text-green-500">VERIFIED ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">AUTHORITY:</span><span className="text-green-500">TEMPORARY ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">SELF-CONTROL:</span><span className="text-green-500">ACTIVE ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">GOVERNANCE:</span><span className="text-green-500">CONNECTED ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">PROOF CHAIN:</span><span className="text-green-500">VALID ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">SELF-HALT:</span><span className="text-green-500">AVAILABLE ✓</span></div>
        <div className="w-full h-px bg-neutral-800 my-2" />
        <div className="flex justify-between items-center"><span className="text-neutral-500">STATUS:</span><span className="bg-green-500 text-black px-2 font-bold">RESPONSIBLE AUTONOMY</span></div>
      </div>
    </div>
  );
}
