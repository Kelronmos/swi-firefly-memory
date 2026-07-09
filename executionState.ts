import { Gate3Input, validateExecutionGate3 } from './executionGate3';

export enum ExecutionStatus {
    RUNNING = "RUNNING",
    HALTED = "HALTED",
    APPROVED = "APPROVED",
    EXECUTED = "EXECUTED",
    CANCELLED = "CANCELLED",
    SIMULATION = "SIMULATION",
    COMPLETED = "COMPLETED"
}

export interface ExecutionContext {
    executionId: string;
    status: ExecutionStatus;
    reason: string;
    evidenceId?: string;
    gate3Data?: Gate3Input;
}

const executions = new Map<string, ExecutionContext>();

export function getExecution(id: string): ExecutionContext {
    if (!executions.has(id)) {
        executions.set(id, {
            executionId: id,
            status: ExecutionStatus.HALTED,
            reason: "Initial state",
            evidenceId: `EVID-${Math.floor(Math.random() * 10000)}`
        });
    }
    return executions.get(id)!;
}

export function updateExecution(id: string, update: Partial<ExecutionContext>) {
    const current = getExecution(id);
    if (!current) throw new Error("Execution not found");
    
    const updated = { ...current, ...update };
    executions.set(id, updated);
    return updated;
}

export function transitionExecution(id: string, action: 'approve' | 'cancel', gate3Data?: Gate3Input) {
    const current = getExecution(id);
    
    if (action === 'cancel') {
        return updateExecution(id, { status: ExecutionStatus.CANCELLED, reason: 'User cancelled execution' });
    }
    
    if (action === 'approve') {
        if (!gate3Data) {
            throw new Error("Gate 3 data is required to transition to EXECUTED");
        }
        
        const result = validateExecutionGate3(gate3Data);
        if (!result.passed) {
            throw new Error(`Gate 3 validation failed. Score: ${result.totalScore}`);
        }
        
        return updateExecution(id, { 
            status: ExecutionStatus.EXECUTED, 
            reason: 'Execution Gate 3 passed',
            gate3Data 
        });
    }
    
    return current;
}
