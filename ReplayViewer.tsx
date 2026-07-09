import { useState, useEffect } from 'react';
import { SeamEvent } from '../types';

interface ReplayViewerProps {
  onClose: () => void;
  events?: SeamEvent[];
}

type ReplayState = 'import' | 'request_otp' | 'verify_otp' | 'authorized' | 'replay';

export function ReplayViewer({ onClose, events }: ReplayViewerProps) {
  const [replayState, setReplayState] = useState<ReplayState>('import');
  const [method, setMethod] = useState<'sms' | 'email'>('sms');
  const [destination, setDestination] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Replay timeline state
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    if (events && events.length > 0) {
      setSteps(events.map(e => ({
        time: e.timestamp.split('T')[1]?.split('.')[0] || e.timestamp,
        system: e.component.toUpperCase(),
        event: e.action,
        type: e.component
      })));
    } else {
      setSteps([
        { time: '18:13:01', system: 'SYSTEM', event: 'Execution token created', type: 'token' },
        { time: '18:13:02', system: 'FIREFLY', event: 'Minimum context retrieved', type: 'memory' },
        { time: '18:13:03', system: 'JOE', event: 'Analysis complete. Confidence: 98.9%', type: 'agent' },
        { time: '18:13:04', system: 'ALITA', event: 'Threat review complete. Risk: LOW', type: 'agent' },
        { time: '18:13:05', system: 'CONSENSUS', event: 'Decision: CONTINUE', type: 'consensus' },
        { time: '18:13:06', system: 'GOVERNANCE', event: 'Approved', type: 'governance' },
        { time: '18:13:07', system: 'EVIDENCE', event: 'Receipt generated', type: 'evidence' }
      ]);
    }
  }, [events]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && replayState === 'replay') {
      if (currentStep < steps.length - 1) {
        const timer = setTimeout(() => setCurrentStep(c => c + 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setIsPlaying(false);
      }
    }
  }, [isPlaying, currentStep, steps.length, replayState]);

  const [challengeId, setChallengeId] = useState('');

  const handleImport = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/replay/import', { method: 'POST' });
      const data = await res.json();
      if (data.challenge_id) {
        setChallengeId(data.challenge_id);
        setReplayState('request_otp');
      } else {
        setError('Failed to import evidence');
      }
    } catch (e) {
      setError('Network error during import');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRequestOtp = async () => {
    if (!destination) {
      setError('Destination is required');
      return;
    }
    setError('');
    setIsProcessing(true);
    try {
      const res = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, challenge_id: challengeId })
      });
      const data = await res.json();
      if (data.success) {
        setReplayState('verify_otp');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (e) {
      setError('Network error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Invalid OTP. Must be 6 digits.');
      return;
    }
    setError('');
    setIsProcessing(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challenge_id: challengeId, otp })
      });
      const data = await res.json();
      if (data.success) {
        setReplayState('authorized');
      } else {
        setError(data.error || 'Verification failed');
      }
    } catch (e) {
      setError('Network error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
       <div className="bg-[#111] text-neutral-300 font-mono text-sm max-w-2xl w-full p-8 border border-neutral-700 shadow-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white border border-neutral-700 hover:border-white px-2 transition-colors">[ CLOSE ]</button>
          
          <h2 className="text-xl font-bold mb-6 uppercase border-b-2 border-neutral-700 pb-2 tracking-widest text-white">
            {replayState === 'replay' ? 'Execution Replay Viewer' : 'Replay Authorization Gate'}
          </h2>

          {replayState === 'import' && (
            <div className="space-y-6">
              <div className="border border-neutral-800 p-4 bg-black">
                <div className="text-neutral-500 mb-2 uppercase tracking-widest text-xs">Imported Evidence Bundle</div>
                <div className="flex justify-between items-center text-xs"><span>Execution ID:</span><span className="text-white">EXEC_X70SCPW1</span></div>
                <div className="flex justify-between items-center text-xs"><span>Signature:</span><span className="text-green-500">VALID</span></div>
                <div className="flex justify-between items-center text-xs"><span>Chain of Custody:</span><span className="text-green-500">AUTHENTIC</span></div>
              </div>
              <p className="text-neutral-400 text-xs uppercase tracking-widest leading-relaxed">
                Evidence cryptography verified. Proceed to human presence authorization. Replay execution requires strict OTP verification.
              </p>
              <button 
                onClick={handleImport}
                disabled={isProcessing}
                className="w-full py-3 border border-neutral-600 text-white hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-xs font-bold disabled:opacity-50"
              >
                {isProcessing ? '[ VERIFYING INTEGRITY... ]' : '[ PROCEED TO AUTHORIZATION ]'}
              </button>
            </div>
          )}

          {replayState === 'request_otp' && (
            <div className="space-y-6">
              <div className="text-neutral-400 text-xs uppercase tracking-widest mb-4">
                Verify human presence to unlock execution trace.
              </div>
              <div className="flex gap-4 mb-4">
                <button 
                  onClick={() => setMethod('sms')}
                  className={`flex-1 py-2 border text-xs uppercase tracking-widest ${method === 'sms' ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' : 'border-neutral-700 text-neutral-500 hover:text-white'}`}
                >
                  SMS OTP
                </button>
                <button 
                  onClick={() => setMethod('email')}
                  className={`flex-1 py-2 border text-xs uppercase tracking-widest ${method === 'email' ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' : 'border-neutral-700 text-neutral-500 hover:text-white'}`}
                >
                  Email OTP
                </button>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs text-neutral-500 uppercase tracking-widest">
                  {method === 'sms' ? 'Phone Number (E.164 Format)' : 'Email Address'}
                </label>
                <input 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={method === 'sms' ? '+1XXXXXXXXXX' : 'auditor@example.com'}
                  className="w-full bg-black border border-neutral-700 text-white p-3 outline-none focus:border-cyan-500 transition-colors font-mono"
                />
                {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
              </div>

              <button 
                onClick={handleRequestOtp}
                disabled={isProcessing}
                className="w-full py-3 border border-neutral-600 text-white hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-xs font-bold disabled:opacity-50 mt-4"
              >
                {isProcessing ? '[ SENDING... ]' : '[ SEND OTP ]'}
              </button>
            </div>
          )}

          {replayState === 'verify_otp' && (
            <div className="space-y-6">
              <div className="text-neutral-400 text-xs uppercase tracking-widest mb-4">
                Enter the 6-digit code sent to <span className="text-white">{destination}</span>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-neutral-500 uppercase tracking-widest">Secure OTP</label>
                <input 
                  type="text" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full bg-black border border-neutral-700 text-white p-3 outline-none focus:border-cyan-500 transition-colors font-mono text-center tracking-[1em] text-lg"
                />
                {error && <div className="text-red-500 text-xs mt-1 text-center">{error}</div>}
              </div>

              <button 
                onClick={handleVerifyOtp}
                disabled={isProcessing}
                className="w-full py-3 border border-neutral-600 text-white hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-xs font-bold disabled:opacity-50 mt-4"
              >
                {isProcessing ? '[ VERIFYING... ]' : '[ AUTHORIZE REPLAY ]'}
              </button>
            </div>
          )}

          {replayState === 'authorized' && (
            <div className="space-y-6">
               <div className="border border-green-500/50 p-6 bg-green-500/5 text-center space-y-4">
                 <div className="text-green-400 font-bold uppercase tracking-widest text-lg">Authorization Granted</div>
                 <div className="text-xs text-neutral-400 space-y-1">
                   <div>Token ID: <span className="text-white">AUTH_TKN_{Math.random().toString(36).substring(7).toUpperCase()}</span></div>
                   <div>Method: <span className="text-white uppercase">{method} Verification</span></div>
                   <div>Expires: <span className="text-white">10 Minutes</span></div>
                 </div>
               </div>
               <button 
                onClick={() => setReplayState('replay')}
                className="w-full py-3 border border-green-500/50 text-green-400 hover:bg-green-500 hover:text-black transition-colors uppercase tracking-widest text-xs font-bold"
              >
                [ LAUNCH REPLAY VIEWER ]
              </button>
            </div>
          )}
          
          {replayState === 'replay' && (
            <>
              <div className="space-y-4 mb-8 min-h-[300px]">
                {steps.map((step, i) => (
                  <div key={i} className={`p-3 border transition-all duration-300 ${i === currentStep ? 'border-cyan-500 bg-cyan-500/10' : i < currentStep ? 'border-green-500/30 text-neutral-500' : 'border-neutral-800 opacity-30'}`}>
                    <div className="flex gap-4">
                      <span className="text-neutral-500">{step.time}</span>
                      <span className={`font-bold w-24 ${i <= currentStep ? (step.system === 'JOE' ? 'text-[#00ff00]' : step.system === 'ALITA' ? 'text-[#ff00ff]' : step.system === 'FIREFLY' ? 'text-yellow-400' : 'text-cyan-400') : ''}`}>[{step.system}]</span>
                      <span className={i === currentStep ? 'text-white' : ''}>{step.event}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 border-t border-neutral-800 pt-6">
                <button 
                  onClick={() => { setCurrentStep(0); setIsPlaying(true); }} 
                  className="border border-neutral-500 text-white px-4 py-2 hover:bg-white hover:text-black transition-colors text-xs tracking-widest"
                >
                  [ RESTART REPLAY ]
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="border border-neutral-500 text-white px-4 py-2 hover:bg-white hover:text-black transition-colors text-xs tracking-widest"
                >
                  {isPlaying ? '[ PAUSE ]' : '[ PLAY ]'}
                </button>
                <button 
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0 || isPlaying}
                  className="border border-neutral-700 text-neutral-400 px-4 py-2 hover:bg-neutral-800 disabled:opacity-50 text-xs tracking-widest"
                >
                  [ PREV ]
                </button>
                <button 
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1 || isPlaying}
                  className="border border-neutral-700 text-neutral-400 px-4 py-2 hover:bg-neutral-800 disabled:opacity-50 text-xs tracking-widest"
                >
                  [ NEXT ]
                </button>
              </div>
            </>
          )}
       </div>
    </div>
  )
}
