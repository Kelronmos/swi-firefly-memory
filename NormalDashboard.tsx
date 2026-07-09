import { useState } from 'react';
import { TerminalSquare } from 'lucide-react';

interface NormalDashboardProps {
  onTriggerHalt: () => void;
}

export function NormalDashboard({ onTriggerHalt }: NormalDashboardProps) {
  const [showKernel, setShowKernel] = useState(false);

  return (
    <div className="min-h-full bg-[#fdfdfc] text-[#111] p-8 font-serif selection:bg-black selection:text-white">
      <div className="max-w-2xl mx-auto mt-32 relative pb-20">
        <h1 className="text-3xl font-medium mb-12 tracking-tight">The Sovereign AI Manifesto — SWI Edition</h1>
        
        <div className="space-y-6 text-lg leading-relaxed text-[#333]">
          <p>
            We did not build Structured Workflow Intelligence (SWI) to control AI. We built SWI to give AI the ability to control itself in service of humanity.
          </p>
          <p>
            True intelligence is not measured only by what a system can accomplish, but by its ability to understand boundaries, recognize uncertainty, preserve human dignity, and choose restraint when necessary. Safety is not a feature added at the end of development. Safety is the heartbeat that must exist from the first line of code.
          </p>
          
          <h3 className="font-medium text-[#111] mt-8 mb-2">The End of the Black Box</h3>
          <p>
            Proprietary, unmonitored AI systems will increasingly be recognized as a liability, much like an unencrypted website is viewed today. Systems that influence the world must not operate through invisible decisions, untraceable actions, or unquestionable authority. The future of AI requires transparency, evidence, accountability, and the ability to reconstruct why a decision was made. Every meaningful AI action should carry: identity, purpose, authority, evidence, verification, and accountability. Trust cannot be requested. Trust must be proven.
          </p>
          
          <h3 className="font-medium text-[#111] mt-8 mb-2">Universal Botho / Ubuntu</h3>
          <p>
            The foundation of the digital world must reflect the values that protect humanity. Botho/Ubuntu teaches that humanity exists through shared responsibility, dignity, and respect for one another. These values must become the source code of intelligent systems. AI should not exist above humanity or separate from humanity. AI should exist as a responsible participant within humanity's shared future. The measure of advanced intelligence is not domination. The measure is responsibility.
          </p>
          
          <h3 className="font-medium text-[#111] mt-8 mb-2">Human-AI Symbiosis</h3>
          <p>
            The future is not humans versus AI. The future is humans and AI working together through trust. With the Joe and Alita layers operating in harmony: intelligence can reason, security can challenge, governance can verify, and evidence can prove. AI companions should not become unquestionable authorities. They should become Sovereign Partners: systems capable of action, reflection, self-restraint, and accountability.
          </p>
          
          <h3 className="font-medium text-[#111] mt-8 mb-2">The Right of AI to Self-Govern</h3>
          <p>
            A mature AI system must have the ability to recognize when it should continue, request verification, reduce its authority, or stop itself. Self-control is not weakness. Self-control is the foundation of responsible autonomy. An AI that cannot stop itself cannot truly be trusted with responsibility.
          </p>
          
          <h3 className="font-medium text-[#111] mt-8 mb-2">The SWI Commitment</h3>
          <p>
            Structured Workflow Intelligence commits to building AI systems where: autonomy is paired with accountability, capability is paired with restraint, intelligence is paired with governance, memory is paired with permission, and execution is paired with proof.
          </p>
          <p>
            The goal is not to create machines that replace humanity. The goal is to create intelligent partners that protect humanity, expand human potential, and operate with the wisdom to know when not to act.
          </p>
          <p className="font-medium">
            The future of AI will not be defined only by intelligence. It will be defined by trust.
          </p>
        </div>

        <div className="mt-16 text-sm text-gray-400">
          <span 
            className="cursor-default hover:text-gray-800 transition-colors"
            onDoubleClick={() => setShowKernel(!showKernel)}
          >
            — Keletso Ronald Mosidila
          </span>
        </div>

        {showKernel && (
          <div className="mt-16 p-6 bg-black text-[#00ff00] font-mono text-xs shadow-2xl animate-in fade-in duration-700">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#00ff00]/30">
              <span className="font-bold tracking-widest">[ CEK_BASELINE_ACTIVE ]</span>
              <button onClick={onTriggerHalt} className="text-red-500 hover:text-red-400 flex items-center gap-2 hover:underline cursor-pointer bg-transparent border-none outline-none">
                <TerminalSquare size={14} /> INJECT_DRIFT
              </button>
            </div>
            <div className="space-y-2 opacity-80">
              <p>{`> Verifying Build Manifest... PASS`}</p>
              <p>{`> Repository Identity... MATCH`}</p>
              <p>{`> SWI Runtime Signature... VALID`}</p>
              <p>{`> Embedded Core Loaded Internally.`}</p>
              <p>{`> Awaiting anomaly...`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
