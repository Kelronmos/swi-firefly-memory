import { FileText, PlaySquare } from 'lucide-react';
import { SeamEvent } from '../types';
import { ExecutionTimeline } from './ExecutionTimeline';
import { RuntimeXRay } from './RuntimeXRay';
import { MemoryXRay } from './MemoryXRay';
import { SecurityMaze } from './SecurityMaze';
import { EventStream } from './EventStream';
import { AgentCouncil } from './AgentCouncil';
import { TokenDriftMonitor } from './TokenDriftMonitor';
import { ExecutionGate3 } from './ExecutionGate3';
import { CertificationDashboard } from './CertificationDashboard';
import { OperationsCenter } from './OperationsCenter';
import { TrustVerification } from './TrustVerification';
import { ZeroTrustFabric } from './ZeroTrustFabric';
import { SovereignAIStatus } from './SovereignAIStatus';
import { GlobalTrustNetwork } from './GlobalTrustNetwork';
import { generateAuditExport } from '../utils/AuditExport';
import { useState } from 'react';
import { ReplayViewer } from './ReplayViewer';

interface SeamDashboardProps {
  events: SeamEvent[];
  onStartDemo: () => void;
  isDemoRunning: boolean;
}

export function SeamDashboard({ events, onStartDemo, isDemoRunning }: SeamDashboardProps) {
  const [showReplay, setShowReplay] = useState(false);
  
  // Compute current step for timeline based on events
  const getStepIndex = () => {
    if (events.length === 0) return -1;
    const lastEvent = events[events.length - 1];
    switch (lastEvent.component) {
      case 'identity': return 0;
      case 'runtime': return 1;
      case 'token': return 2;
      case 'joe': return 3;
      case 'alita': return 4;
      case 'firefly': return 5;
      case 'consensus': return 6;
      case 'governance': return 7;
      case 'gate_3': return 8;
      case 'security': return 9;
      case 'execution': return 10;
      case 'evidence': return 11;
      default: return -1;
    }
  };

  return (
    <div className="h-full bg-[#0a0a0a] text-neutral-300 p-6 flex flex-col font-sans relative">
      <header className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-white text-xl font-bold tracking-widest">SWI SEAM</h1>
          <div className="text-neutral-500 text-xs font-mono">System Execution Awareness Monitor</div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowReplay(true)}
            className="flex items-center gap-2 border border-cyan-900 bg-cyan-950/20 hover:bg-cyan-900/40 text-cyan-400 px-4 py-2 font-mono text-xs transition-colors"
          >
            <PlaySquare size={14} />
            REPLAY EXECUTION
          </button>
          <button 
            onClick={() => generateAuditExport(events)}
            className="flex items-center gap-2 border border-green-900 bg-green-950/20 hover:bg-green-900/40 text-green-500 px-4 py-2 font-mono text-xs transition-colors"
          >
            <FileText size={14} />
            [ DOWNLOAD PDF ]
          </button>
          <button 
            onClick={() => alert("Cryptographic signature verified. Evidence chain intact.")}
            className="flex items-center gap-2 border border-purple-900 bg-purple-950/20 hover:bg-purple-900/40 text-purple-500 px-4 py-2 font-mono text-xs transition-colors"
          >
            <FileText size={14} />
            [ VERIFY SIGNATURE ]
          </button>
          {!isDemoRunning && events.length === 0 && (
            <button 
              onClick={onStartDemo}
              className="border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 px-4 py-2 font-mono text-xs text-white transition-colors"
            >
              RUN DEMO (swi-seam demo)
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Left Column */}
        <div className="col-span-3 flex flex-col gap-6 h-full">
          <div className="flex-1 min-h-[300px]">
            <ExecutionTimeline currentStepIndex={getStepIndex()} />
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-span-5 flex flex-col h-full">
          <EventStream events={events} />
        </div>

        {/* Right Column */}
        <div className="col-span-4 flex flex-col gap-4 h-full overflow-y-auto custom-scrollbar pr-2 pb-4">
          <RuntimeXRay />
          <TokenDriftMonitor />
          <ZeroTrustFabric />
          <AgentCouncil />
          <MemoryXRay />
          <ExecutionGate3 />
          <SecurityMaze />
          <SovereignAIStatus />
          <GlobalTrustNetwork />
          <CertificationDashboard />
          <OperationsCenter />
          <TrustVerification />
        </div>
      </div>

      {showReplay && (
        <ReplayViewer onClose={() => setShowReplay(false)} events={events} />
      )}
    </div>
  );
}
