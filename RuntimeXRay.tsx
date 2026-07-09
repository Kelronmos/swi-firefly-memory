export function RuntimeXRay() {
  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2">Runtime X-Ray</h3>
      <div className="space-y-3">
        <div>
          <span className="text-neutral-500">IDENTITY: </span>
          <span className="text-white">VERIFIED_HOST</span>
        </div>
        <div>
          <span className="text-neutral-500">VERSION: </span>
          <span className="text-white">v2.1.4-production</span>
        </div>
        <div>
          <span className="text-neutral-500">ATTESTATION: </span>
          <span className="text-white">TPM_SECURE</span>
        </div>
        <div>
          <span className="text-neutral-500">ENV_CHECKS: </span>
          <span className="text-white">PASSED</span>
        </div>
        <div>
          <span className="text-neutral-500">ACTIVE_MODULES: </span>
          <span className="text-white">46/46</span>
        </div>
        <div>
          <span className="text-neutral-500">NETWORK_BINDINGS: </span>
          <span className="text-green-500">ISOLATED</span>
        </div>
      </div>
    </div>
  );
}
