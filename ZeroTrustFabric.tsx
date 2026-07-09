export function ZeroTrustFabric() {
  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2">Zero Trust Fabric</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center"><span className="text-neutral-500">EXECUTION:</span><span className="text-white">EXEC_908PIR0</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">PROOF STATUS:</span></div>
        <div className="grid grid-cols-2 gap-1 text-[10px] pl-2 border-l border-neutral-800 ml-1 my-1">
            <div className="flex justify-between"><span className="text-neutral-500">INPUT</span><span className="text-green-500">✓</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">IDENTITY</span><span className="text-green-500">✓</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">RUNTIME</span><span className="text-green-500">✓</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">FIREFLY</span><span className="text-green-500">✓</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">JOE</span><span className="text-green-500">✓</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">ALITA</span><span className="text-green-500">✓</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">GOVERNANCE</span><span className="text-green-500">✓</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">AUTONOMY GATE</span><span className="text-green-500">✓</span></div>
        </div>
        <div className="w-full h-px bg-neutral-800 my-2" />
        <div className="flex justify-between items-center"><span className="text-neutral-500">HASH CHAIN:</span><span className="text-green-500">INTACT</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">TRUST MODE:</span><span className="text-white">ZERO TRUST</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">REPLAY:</span><span className="text-cyan-400">AVAILABLE</span></div>
        <div className="w-full h-px bg-neutral-800 my-2" />
        <div className="flex justify-between items-center"><span className="text-neutral-500">DECISION:</span><span className="bg-green-500 text-black px-2 font-bold">AUTHORIZED</span></div>
      </div>
    </div>
  );
}
