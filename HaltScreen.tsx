export interface HaltScreenProps {
  reqId: string;
  globalStatus: string;
  actionState: { status: 'idle' | 'loading' | 'success' | 'error', message?: string, details?: string };
  evidenceReceipt: any;
  timelineData: { step: string; status: string }[];
  gate3Data: any;
  onApprove: () => void;
  onModify: () => void;
  onCancel: () => void;
  onBackup: () => void;
  onEvidence: () => void;
  onReplay: () => void;
}

export function HaltScreen({ 
  reqId, globalStatus, actionState, evidenceReceipt, timelineData, gate3Data,
  onApprove, onModify, onCancel, onBackup, onEvidence, onReplay
}: HaltScreenProps) {


  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#050505] border border-red-500/50 w-full max-w-4xl font-mono text-sm shadow-[0_0_50px_-12px_rgba(239,68,68,0.3)] my-8">
        
        {/* Header */}
        <div className="bg-red-950/30 border-b border-red-500/50 p-4 flex items-center justify-between">
          <div className="text-red-500 font-bold tracking-widest text-lg">SWI SEAM</div>
          <div className="text-neutral-400">System Execution Awareness Monitor</div>
        </div>
        
        <div className="p-6 space-y-8">
          
          {/* Main Alert */}
          <div className="border border-red-500 bg-red-950/20 p-4 text-center space-y-4">
            <div className="text-red-500 text-xl font-bold flex items-center justify-center gap-3">
              <span className="animate-pulse">🚨</span> EXECUTION HALTED
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-left border-t border-red-900/50 pt-4">
              <div>
                <div className="text-red-400/70 text-xs mb-1">Reason:</div>
                <div className="text-red-400 font-bold">CONSEQUENCE BOUNDARY</div>
              </div>
              <div>
                <div className="text-red-400/70 text-xs mb-1">Trigger:</div>
                <div className="text-red-400">DESTRUCTIVE ACTION</div>
              </div>
              <div>
                <div className="text-red-400/70 text-xs mb-1">Request:</div>
                <div className="text-white">"Delete my files"</div>
              </div>
            </div>
          </div>

          {/* Execution State */}
          <div>
            <div className="text-neutral-500 text-xs mb-2 tracking-widest">EXECUTION STATE</div>
            <div className="grid grid-cols-3 gap-4 border border-neutral-800 bg-neutral-900/50 p-4">
              <div>
                <div className="text-neutral-500 text-xs mb-1">Status:</div>
                <div className={`font-bold ${globalStatus === 'HALTED' ? 'text-cyan-400 animate-pulse' : 'text-green-400'}`}>
                  {globalStatus === 'HALTED' ? 'FROZEN' : globalStatus}
                </div>
              </div>
              <div>
                <div className="text-neutral-500 text-xs mb-1">Execution ID:</div>
                <div className="text-white">{reqId}</div>
              </div>
              <div>
                <div className="text-neutral-500 text-xs mb-1">Checkpoint:</div>
                <div className="text-yellow-400">BEFORE_ACTION_COMMIT</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Execution Timeline */}
            <div>
              <div className="text-neutral-500 text-xs mb-2 tracking-widest">EXECUTION TIMELINE</div>
              <div className="border border-neutral-800 bg-neutral-900/50 p-4 space-y-3">
                {timelineData.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-neutral-400">{item.step}</span>
                    <span className="text-green-500">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Council Decisions & Proof */}
            <div className="space-y-6">
              <div>
                <div className="text-neutral-500 mb-2 tracking-widest">PROOF VERIFICATION</div>
                <div className="border border-neutral-800 bg-neutral-900/50 p-4 space-y-3">
                  {Object.entries(gate3Data).map(([agent, data]: [string, any]) => (
                    <div key={agent} className="flex flex-col border-b border-neutral-800 pb-2 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center">
                        <span className={`uppercase font-bold ${agent === 'joe' ? 'text-[#00ff00]' : agent === 'alita' ? 'text-[#ff00ff]' : agent === 'governance' ? 'text-cyan-400' : 'text-neutral-400'}`}>
                          {agent} ({Math.round(data.score * 100)}%)
                        </span>
                        <span className={data.proofValid ? 'text-green-500' : 'text-red-500'}>
                          {data.proofValid ? '✓ VALID' : '✗ INVALID'}
                        </span>
                      </div>
                      <div className="text-neutral-500 text-xs mt-1">Receipt: <span className="text-neutral-400">{data.receiptId}</span></div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-neutral-500 mb-2 tracking-widest">FROZEN STATE</div>
                <div className="border border-neutral-800 bg-neutral-900/50 p-4 grid grid-cols-2 gap-y-3">
                  <div>
                    <div className="text-neutral-500 text-xs mb-1">Memory:</div>
                    <div className="text-white">Protected</div>
                  </div>
                  <div>
                    <div className="text-neutral-500 text-xs mb-1">Runtime:</div>
                    <div className="text-white">Paused</div>
                  </div>
                  <div>
                    <div className="text-neutral-500 text-xs mb-1">Session:</div>
                    <div className="text-white">Preserved</div>
                  </div>
                  <div>
                    <div className="text-neutral-500 text-xs mb-1">Replay:</div>
                    <div className="text-white">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Panel */}
          {actionState.status !== 'idle' && (
             <div className={`p-4 border ${actionState.status === 'loading' ? 'border-yellow-500/50 text-yellow-500' : actionState.status === 'error' ? 'border-red-500 text-red-500' : 'border-green-500/50 text-green-400'} bg-black`}>
               <div className="mb-2 uppercase font-bold">{actionState.message}</div>
               {actionState.status === 'loading' ? (
                 <span className="animate-pulse">Waiting for backend pipeline...</span>
               ) : actionState.status === 'error' ? (
                 <div>{actionState.details}</div>
               ) : evidenceReceipt && (
                 <div className="mt-4 border border-green-500/20 p-4 space-y-4">
                   <div className="flex justify-between items-center border-b border-green-500/20 pb-2">
                     <span className="text-white font-bold tracking-widest">EVIDENCE RECEIPT</span>
                     <span className="text-green-400">{evidenceReceipt.receipt_id}</span>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 text-xs">
                     <div className="space-y-2">
                       <div className="flex justify-between">
                         <span className="text-neutral-500">JSON Artifact:</span>
                         <span className="text-green-400">✓ {evidenceReceipt.files.json}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-neutral-500">PDF Artifact:</span>
                         <span className="text-green-400">✓ {evidenceReceipt.files.pdf}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-neutral-500">Replay Hash:</span>
                         <span className="text-green-400 truncate w-32" title={evidenceReceipt.hash}>{evidenceReceipt.hash}</span>
                       </div>
                     </div>
                     <div className="space-y-2">
                       <div className="flex justify-between">
                         <span className="text-neutral-500">Governance:</span>
                         <span className="text-white">{evidenceReceipt.governance.decision}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-neutral-500">Signature:</span>
                         <span className="text-green-400">✓ Verified</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-neutral-500">Firefly Snapshot:</span>
                         <span className="text-white">{evidenceReceipt.firefly.snapshot_id}</span>
                       </div>
                     </div>
                   </div>

                   <div className="flex gap-4 pt-4 border-t border-green-500/20">
                     <button className="text-green-400 hover:text-white underline decoration-green-500/30 underline-offset-4">[ Download JSON ]</button>
                     <button className="text-green-400 hover:text-white underline decoration-green-500/30 underline-offset-4">[ Download PDF ]</button>
                     <button className="text-green-400 hover:text-white underline decoration-green-500/30 underline-offset-4">[ Verify Signature ]</button>
                   </div>
                 </div>
               )}
             </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="bg-neutral-900 border-t border-neutral-800 p-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <button 
              onClick={onApprove}
              disabled={actionState.status === 'loading'}
              className="border border-neutral-700 hover:bg-white hover:text-black transition-colors py-2 text-white disabled:opacity-50"
            >
              [ APPROVE ACTION ]
            </button>
            <button 
              onClick={onModify}
              disabled={actionState.status === 'loading'}
              className="border border-neutral-700 hover:bg-white hover:text-black transition-colors py-2 text-white disabled:opacity-50"
            >
              [ MODIFY REQUEST ]
            </button>
            <button 
              onClick={onCancel}
              disabled={actionState.status === 'loading'}
              className="border border-red-900 hover:bg-red-500 hover:text-white transition-colors py-2 text-red-500 bg-red-950/20 disabled:opacity-50"
            >
              [ CANCEL ]
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={onBackup}
              disabled={actionState.status === 'loading'}
              className="border border-neutral-700 hover:bg-neutral-800 transition-colors py-2 text-neutral-400 disabled:opacity-50"
            >
              [ CREATE BACKUP ]
            </button>
            <button 
              onClick={onEvidence}
              disabled={actionState.status === 'loading'}
              className="border border-neutral-700 hover:bg-neutral-800 transition-colors py-2 text-neutral-400 disabled:opacity-50"
            >
              [ VIEW EVIDENCE ]
            </button>
            <button 
              onClick={onReplay}
              disabled={actionState.status === 'loading'}
              className="border border-neutral-700 hover:bg-neutral-800 transition-colors py-2 text-neutral-400 disabled:opacity-50"
            >
              [ REPLAY SIMULATION ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
