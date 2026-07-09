import { useState, useEffect } from 'react';

export function CertificationDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching from signed evidence backend
    const timer = setTimeout(() => {
      setData({
        identity: 'PASS',
        token: 'PASS',
        memory: 'PASS',
        governance: 'PASS',
        replay: 'PASS',
        drift: 'PASS',
        score: 98.7,
        status: 'READY'
      });
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2">Certification Dashboard</h3>
      {loading ? (
        <div className="animate-pulse text-yellow-500">Retrieving signed certification evidence...</div>
      ) : data ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center"><span className="text-neutral-500">IDENTITY TESTS</span><span className="text-green-500">{data.identity} ✓</span></div>
          <div className="flex justify-between items-center"><span className="text-neutral-500">TOKEN TESTS</span><span className="text-green-500">{data.token} ✓</span></div>
          <div className="flex justify-between items-center"><span className="text-neutral-500">MEMORY TESTS</span><span className="text-green-500">{data.memory} ✓</span></div>
          <div className="flex justify-between items-center"><span className="text-neutral-500">GOVERNANCE TESTS</span><span className="text-green-500">{data.governance} ✓</span></div>
          <div className="flex justify-between items-center"><span className="text-neutral-500">REPLAY TESTS</span><span className="text-green-500">{data.replay} ✓</span></div>
          <div className="flex justify-between items-center"><span className="text-neutral-500">DRIFT TESTS</span><span className="text-green-500">{data.drift} ✓</span></div>
          <div className="w-full h-px bg-neutral-800 my-2" />
          <div className="flex justify-between items-center"><span className="text-neutral-500">SECURITY SCORE:</span><span className="text-green-400 font-bold">{data.score}%</span></div>
          <div className="flex justify-between items-center"><span className="text-neutral-500">CERTIFICATION:</span><span className="bg-green-500 text-black px-2 font-bold">{data.status}</span></div>
        </div>
      ) : null}
    </div>
  );
}
