import { useState, useEffect } from 'react';

export function TokenDriftMonitor() {
  const [driftMetrics, setDriftMetrics] = useState([
    { label: 'Identity', score: 0.00, status: 'MATCH' },
    { label: 'Runtime', score: 0.01, status: 'NOMINAL' },
    { label: 'Policy', score: 0.00, status: 'MATCH' },
    { label: 'Scope', score: 0.01, status: 'NOMINAL' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDriftMetrics(prev => {
        // Occasionally cause a spike
        const spike = Math.random() > 0.95;
        return prev.map(m => {
          const change = (Math.random() - 0.4) * (spike ? 10 : 0.5);
          let newScore = Math.max(0, m.score + change);
          if (newScore > 50) newScore = 50;
          return {
            ...m,
            score: newScore,
            status: newScore > 5 ? 'WARNING' : newScore > 1 ? 'NOMINAL' : 'MATCH'
          };
        });
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const totalDrift = driftMetrics.reduce((acc, m) => acc + m.score, 0);
  const isAlert = totalDrift > 20;

  return (
    <div className={`font-mono text-xs border p-4 bg-black transition-colors duration-500 ${isAlert ? 'border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-neutral-800 text-neutral-300'}`}>
      <h3 className={`mb-4 uppercase tracking-widest border-b pb-2 flex justify-between items-center transition-colors duration-500 ${isAlert ? 'text-red-500 border-red-500' : 'text-white border-neutral-800'}`}>
        <span>Token Drift Monitor</span>
        {isAlert && <span className="bg-red-500 text-black px-1 text-[10px] animate-pulse">ALERT</span>}
      </h3>
      <div className="space-y-4">
        {driftMetrics.map((metric, i) => (
          <div key={i} className="flex justify-between items-center">
             <span className={isAlert ? 'text-red-400' : 'text-neutral-500'}>{metric.label}:</span>
             <span className={isAlert ? 'text-red-400 font-bold' : 'text-white'}>{metric.status} ({metric.score.toFixed(2)}%)</span>
          </div>
        ))}
        <div className="w-full h-px bg-neutral-800 my-2 transition-colors duration-500" style={isAlert ? { backgroundColor: 'rgba(239,68,68,0.3)' } : {}} />
        <div className="flex justify-between items-center">
          <span className={isAlert ? 'text-red-400' : 'text-neutral-500'}>TOTAL DRIFT:</span>
          <span className={`font-bold ${isAlert ? 'text-red-500' : 'text-green-500'}`}>{totalDrift.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={isAlert ? 'text-red-400' : 'text-neutral-500'}>STATUS:</span>
          <span className={`font-bold ${isAlert ? 'bg-red-500 text-black px-2 animate-pulse' : 'text-white'}`}>
            {isAlert ? 'ISOLATION RECOMMENDED' : 'NORMAL'}
          </span>
        </div>
        <div className="w-full bg-neutral-900 h-2 mt-2 border border-neutral-800 overflow-hidden">
          <div className={`${isAlert ? 'bg-red-500' : 'bg-green-500'} h-full transition-all duration-500`} style={{ width: `${Math.min(100, Math.max(totalDrift, 2))}%` }} />
        </div>
      </div>
    </div>
  );
}
