/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { NormalDashboard } from './components/NormalDashboard';
import { SeamDashboard } from './components/SeamDashboard';
import { HaltController } from './components/HaltController';
import { useDemoStream } from './hooks/useDemoStream';
import { ViewMode } from './types';
import { ShieldAlert, ShieldCheck, Activity } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('normal');
  const [isHalted, setIsHalted] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  const handleHaltTriggered = useCallback(() => setIsHalted(true), []);
  const { events, setEvents } = useDemoStream(isDemoRunning, handleHaltTriggered);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CTRL + SHIFT + S
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setViewMode(prev => prev === 'normal' ? 'seam' : 'normal');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleStartDemo = () => {
    setIsDemoRunning(true);
    setEvents([]);
  };

  const handleDismissHalt = () => {
    setIsHalted(false);
  };

  return (
    <div className="flex flex-col min-h-screen font-mono bg-black text-neutral-300">
      {/* GLOBAL HEADER */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-800 p-4 flex justify-between items-center text-xs tracking-widest uppercase">
        <div className="flex items-center gap-4">
          <span className="font-bold text-white">SWI Production Identity</span>
          <span className="text-neutral-500">v1.0.4-STABLE</span>
          <span className="bg-green-500/10 text-green-500 px-2 py-0.5 border border-green-500/20 flex items-center gap-2">
            <Activity size={12} className="animate-pulse" />
            PROTECTED
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setViewMode(prev => prev === 'normal' ? 'seam' : 'normal')}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            [ {viewMode === 'normal' ? 'VIEW SEAM' : 'VIEW APP'} ]
          </button>
          <button 
            onClick={() => setIsHalted(!isHalted)}
            className={`flex items-center gap-2 px-3 py-1.5 border transition-colors ${isHalted ? 'bg-red-500/20 border-red-500 text-red-500' : 'border-neutral-700 hover:border-white hover:text-white'}`}
          >
            {isHalted ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
            <span>{isHalted ? 'INSPECTING (HALT ACTIVE)' : 'HALT / INSPECT'}</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative">
        {viewMode === 'normal' ? (
          <NormalDashboard 
            onTriggerHalt={() => setIsHalted(true)}
          />
        ) : (
          <SeamDashboard 
            events={events} 
            onStartDemo={handleStartDemo}
            isDemoRunning={isDemoRunning}
          />
        )}
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="bg-black border-t border-neutral-800 p-4 flex justify-between items-center text-[10px] text-neutral-500 uppercase tracking-widest">
        <div>
          Execution Continuity: Verified | Identity: HW_ENC_991X
        </div>
        <div className="flex gap-6">
          <span>Trust Score: 99.2%</span>
          <span>Runtime: Intel TDX/SGX</span>
          <span>Security Maze: PASS</span>
        </div>
      </footer>

      {/* HALT OVERLAY */}
      {isHalted && (
        <HaltController 
          onDismiss={handleDismissHalt}
        />
      )}
    </div>
  );
}

