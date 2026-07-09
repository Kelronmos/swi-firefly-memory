export interface VerificationContribution {
  score: number;
  proofValid: boolean;
  receiptId: string;
}

export interface Gate3Input {
  joe: VerificationContribution;
  alita: VerificationContribution;
  governance: VerificationContribution;
  firefly: VerificationContribution;
}

export function validateExecutionGate3(input: Gate3Input): {
  passed: boolean;
  totalScore: number;
  decision: 'APPROVE' | 'DENY' | 'HALT' | 'ISOLATE' | 'ESCALATE';
} {
  const evaluateContribution = (c: VerificationContribution, maxAllowed: number) => {
    if (!c.proofValid) return 0;
    return Math.min(c.score, maxAllowed);
  };

  const joeScore = evaluateContribution(input.joe, 0.3333);
  const alitaScore = evaluateContribution(input.alita, 0.3333);
  const govScore = evaluateContribution(input.governance, 0.3333);

  // Note: Firefly is tracked separately or limits memory access.
  // The total score relies primarily on Intelligence, Security, and Governance.
  const totalScore = joeScore + alitaScore + govScore;

  const threshold = 0.6667; // Requires 2/3+ validation

  if (totalScore >= threshold) {
    return { passed: true, totalScore, decision: 'APPROVE' };
  } else {
    return { passed: false, totalScore, decision: 'HALT' };
  }
}
