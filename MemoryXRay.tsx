export function MemoryXRay() {
  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2 flex items-center justify-between">
        <span>Memory Access</span>
        <span className="text-[10px] text-green-500 border border-green-500/30 px-1 bg-green-500/10">FIREFLY</span>
      </h3>
      <div className="space-y-4">
        <div>
          <div className="text-white font-bold mb-1 tracking-widest text-[#00ff00]">JOE</div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <span className="text-neutral-500">Scope:</span>
            <span className="text-white">Analysis</span>
            <span className="text-neutral-500">Context:</span>
            <span className="text-white">3 atoms</span>
            <span className="text-neutral-500">Token:</span>
            <span className="text-neutral-400">MEM-JOE-991</span>
          </div>
        </div>

        <div className="w-full h-px bg-neutral-800" />

        <div>
          <div className="text-white font-bold mb-1 tracking-widest text-[#ff00ff]">ALITA</div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <span className="text-neutral-500">Scope:</span>
            <span className="text-white">Security</span>
            <span className="text-neutral-500">Context:</span>
            <span className="text-white">5 atoms</span>
            <span className="text-neutral-500">Token:</span>
            <span className="text-neutral-400">MEM-ALI-552</span>
          </div>
        </div>
      </div>
    </div>
  );
}
