interface EvidenceReportProps {
  onClose: () => void;
}

export function EvidenceReport({ onClose }: EvidenceReportProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#f0f0f0] text-black font-mono text-sm max-w-2xl w-full p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-black hover:opacity-70 border border-black px-2">[ CLOSE ]</button>
        
        <h2 className="text-xl font-bold mb-6 uppercase border-b-2 border-black pb-2 tracking-widest">SWI Evidence Report</h2>
        
        <div className="space-y-6">
          <div className="space-y-1">
            <div><span className="font-bold">Execution ID:</span> exec_X70SCPW1K6QSEY</div>
            <div><span className="font-bold">Request ID:</span> req_O49OB66</div>
            <div><span className="font-bold">Generated Timestamp:</span> 2026-07-08T12:28:59.530Z</div>
            <div><span className="font-bold">Execution Timestamp:</span> 2026-07-08T12:28:11.059Z</div>
          </div>
          
          <div className="border-t border-dashed border-neutral-400 pt-4 space-y-1">
            <div className="font-bold uppercase mb-2 tracking-widest">Identity Verification</div>
            <div><span className="text-neutral-600">Actor:</span> USER_HASH_82A91</div>
            <div><span className="text-neutral-600">Authority Level:</span> 5</div>
          </div>

          <div className="border-t border-dashed border-neutral-400 pt-4 space-y-1">
            <div className="font-bold uppercase mb-2 tracking-widest">Governance Decision</div>
            <div><span className="text-neutral-600">Policy:</span> SWI_GOV_V2.2</div>
            <div><span className="text-neutral-600">Decision:</span> APPROVED</div>
          </div>

          <div className="border-t border-dashed border-neutral-400 pt-4 space-y-1">
            <div className="font-bold uppercase mb-2 tracking-widest">Runtime Attestation & Binding</div>
            <div><span className="text-neutral-600">Runtime ID:</span> HW_ENC_991X</div>
            <div><span className="text-neutral-600">Version:</span> v1.0.4-STABLE</div>
            <div><span className="text-neutral-600">Attestation:</span> Intel TDX/SGX</div>
            <div><span className="text-neutral-600">Boot Measurements:</span> measured_boot_verified</div>
            <div><span className="text-neutral-600">Kernel Hash:</span> ima_hash_match</div>
            <div><span className="text-neutral-600">Container Digest:</span> sha256:8a1b2c3d...</div>
            <div><span className="text-neutral-600">Binding Token:</span> ed25519_sig_PDTY81ZTBMR1O6</div>
            <div><span className="text-neutral-600">Env Fingerprint:</span> MTM2Nng3Njh8QWZyaWNhL0dhYm9yb25l</div>
          </div>

          <div className="border-t border-dashed border-neutral-400 pt-4 space-y-1">
            <div className="font-bold uppercase mb-2 tracking-widest">Security Maze</div>
            <div><span className="text-neutral-600">Path:</span> No_Threats_Detected</div>
            <div><span className="text-neutral-600">Risk Score:</span> 0.12</div>
            <div><span className="text-neutral-600">Decision:</span> APPROVED</div>
          </div>

          <div className="border-t border-dashed border-neutral-400 pt-4 space-y-1">
            <div className="font-bold uppercase mb-2 tracking-widest">Firefly Context</div>
            <div><span className="text-neutral-600">Confidence:</span> 99.0%</div>
            <div><span className="text-neutral-600">Memory Atoms:</span> A91F, C72D</div>
          </div>

          <div className="border-t border-dashed border-neutral-400 pt-4 space-y-1">
            <div className="font-bold uppercase mb-2 tracking-widest">Validation Results</div>
            <div><span className="text-neutral-600">Status:</span> COMPLETED</div>
          </div>

          <div className="border-t border-dashed border-neutral-400 pt-4 space-y-1">
            <div className="font-bold uppercase mb-2 tracking-widest">Digital Signatures</div>
            <div>- ed25519_sig_PDTY81ZTBMR1O6</div>
            <div>- ed25519_sig_EVIDENCE_K39XTA4</div>
          </div>

          <div className="border-t-2 border-black pt-4 mt-8 italic text-center text-sm">
            End of cryptographic receipt.
          </div>
        </div>
      </div>
    </div>
  );
}
