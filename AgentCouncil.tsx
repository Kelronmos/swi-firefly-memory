export function AgentCouncil() {
  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2">Agent Council</h3>
      
      <div className="space-y-4">
        <div>
          <div className="text-white font-bold mb-1 tracking-widest text-[#00ff00]">JOE</div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <span className="text-neutral-500">Purpose:</span>
            <span className="text-white">Optimization</span>
            <span className="text-neutral-500">Status:</span>
            <span className="text-green-500">✓ Complete</span>
            <span className="text-neutral-500">Confidence:</span>
            <span className="text-white">98.7%</span>
          </div>
        </div>

        <div className="w-full h-px bg-neutral-800" />

        <div>
          <div className="text-white font-bold mb-1 tracking-widest text-[#ff00ff]">ALITA</div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <span className="text-neutral-500">Purpose:</span>
            <span className="text-white">Security Review</span>
            <span className="text-neutral-500">Status:</span>
            <span className="text-green-500">✓ Complete</span>
            <span className="text-neutral-500">Risk:</span>
            <span className="text-white">0.11</span>
          </div>
        </div>

        <div className="w-full h-px bg-neutral-800" />

        <div>
          <div className="text-white font-bold mb-1 tracking-widest text-cyan-400">CONSENSUS</div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <span className="text-neutral-500">Decision:</span>
            <span className="text-white bg-neutral-900 px-1 border border-neutral-700 w-fit">CONTINUE</span>
            <span className="text-neutral-500 mt-1">Evidence:</span>
            <span className="text-neutral-400 mt-1">REC_88291</span>
          </div>
        </div>
      </div>
    </div>
  );
}
