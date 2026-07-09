export function SecurityMaze() {
  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2">Security Maze</h3>
      <div className="flex flex-col items-center justify-center h-48 space-y-2">
        <div className="text-neutral-500 text-[10px]">REQUEST PATH</div>
        
        <div className="border border-white px-3 py-1 text-white bg-neutral-900">START</div>
        
        <div className="w-px h-4 bg-neutral-700" />
        
        <div className="flex items-center gap-2 text-white">
          <span>Gate 1</span>
          <span className="text-green-500">✓</span>
        </div>
        
        <div className="w-px h-4 bg-neutral-700" />
        
        <div className="flex items-center gap-2 text-white">
          <span>Gate 2</span>
          <span className="text-green-500">✓</span>
        </div>
        
        <div className="w-px h-4 bg-neutral-700" />
        
        <div className="flex items-center gap-2 text-white">
          <span>Gate 3</span>
          <span className="text-red-500">⛔</span>
        </div>
        
        <div className="w-px h-4 bg-neutral-700" />
        
        <div className="border border-red-500 text-red-500 px-3 py-1 bg-red-950/20">STOP</div>
      </div>
    </div>
  );
}
