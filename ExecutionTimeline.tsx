import { ComponentType } from '../types';

const TIMELINE_STEPS: ComponentType[] = [
  'identity',
  'runtime',
  'token',
  'joe',
  'alita',
  'firefly',
  'consensus',
  'governance',
  'gate_3',
  'security',
  'execution',
  'evidence'
];

const TIMELINE_LABELS: Record<ComponentType, string> = {
  'identity': '1. IDENTITY',
  'runtime': '2. RUNTIME',
  'token': '3. TOKEN CREATION',
  'joe': '4. JOE ANALYSIS',
  'alita': '5. ALITA SEC REVIEW',
  'firefly': '6. FIREFLY MEMORY',
  'consensus': '7. CONSENSUS',
  'governance': '8. GOVERNANCE',
  'gate_3': '9. EXECUTION GATE 3',
  'security': '10. SECURITY MAZE',
  'execution': '11. EXECUTION',
  'evidence': '12. EVIDENCE + REPLAY'
};

interface ExecutionTimelineProps {
  currentStepIndex: number;
}

export function ExecutionTimeline({ currentStepIndex }: ExecutionTimelineProps) {
  return (
    <div className="flex flex-col h-full font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2">Execution Timeline</h3>
      <div className="flex-1 flex flex-col justify-between relative">
        {/* Connecting line */}
        <div className="absolute left-[7px] top-4 bottom-4 w-px bg-neutral-800" />
        
        {TIMELINE_STEPS.map((step, index) => {
          const isPast = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <div key={step} className="flex items-center gap-4 relative z-10">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center bg-black border ${isPast ? 'border-white text-white' : isCurrent ? 'border-white bg-white text-black' : 'border-neutral-700 text-transparent'}`}>
                {isPast && <span className="text-[10px]">✓</span>}
                {isCurrent && <span className="text-[10px] animate-pulse">●</span>}
              </div>
              <span className={`uppercase ${isPast ? 'text-neutral-400' : isCurrent ? 'text-white font-bold' : 'text-neutral-700'}`}>
                {TIMELINE_LABELS[step]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
