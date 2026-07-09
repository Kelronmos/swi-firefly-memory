export function OperationsCenter() {
  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2">Operations Center</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center"><span className="text-neutral-500">RUNTIME</span><span className="text-green-500">ONLINE ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">NODES</span><span className="text-white">12 ACTIVE</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">TRUST SCORE</span><span className="text-green-400">99.2%</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">POLICY VERSION</span><span className="text-white">3.2</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">KEY STATUS</span><span className="text-white">ROTATION NORMAL</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">INCIDENTS</span><span className="text-green-500">0 ACTIVE</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">EVIDENCE ARCHIVE</span><span className="text-white">SYNCED</span></div>
        <div className="w-full h-px bg-neutral-800 my-2" />
        <div className="flex justify-between items-center"><span className="text-neutral-500">SYSTEM STATE</span><span className="text-green-400 font-bold">HEALTHY</span></div>
      </div>
    </div>
  );
}
