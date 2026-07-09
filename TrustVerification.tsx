import { useState } from 'react';

export function TrustVerification() {
  const [downloading, setDownloading] = useState(false);

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Audit PDF Exported Successfully!");
    }, 1500);
  };

  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2 flex justify-between items-center">
        <span>Trust Verification</span>
        <span className="text-[10px] text-cyan-400 border border-cyan-400/30 px-1 bg-cyan-400/10">EXTERNAL</span>
      </h3>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center"><span className="text-neutral-500">EXECUTION:</span><span className="text-white">EXEC_001</span></div>
        <div className="w-full h-px bg-neutral-800 my-2" />
        <div className="flex justify-between items-center"><span className="text-neutral-500">IDENTITY</span><span className="text-green-500">VALID ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">RUNTIME</span><span className="text-green-500">VALID ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">POLICY</span><span className="text-green-500">VALID ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">GATE 3</span><span className="text-green-500">PASSED ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">REPLAY</span><span className="text-green-500">MATCH ✓</span></div>
        <div className="flex justify-between items-center"><span className="text-neutral-500">EVIDENCE</span><span className="text-green-500">AUTHENTIC ✓</span></div>
        <div className="w-full h-px bg-neutral-800 my-2" />
        <div className="flex justify-between items-center"><span className="text-neutral-500">TRUST STATUS:</span><span className="text-green-400 font-bold">VERIFIED</span></div>
      </div>
      <button 
        onClick={handleExport}
        disabled={downloading}
        className="w-full py-2 border border-green-500/50 text-green-400 hover:bg-green-500 hover:text-black transition-colors uppercase tracking-widest text-xs font-bold disabled:opacity-50"
      >
        {downloading ? '[ EXPORTING... ]' : '[ EXPORT AUDIT PDF ]'}
      </button>
    </div>
  );
}
