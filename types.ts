export type ComponentType = 
  | 'identity' 
  | 'runtime' 
  | 'token' 
  | 'joe' 
  | 'alita' 
  | 'firefly' 
  | 'consensus' 
  | 'governance' 
  | 'gate_3' 
  | 'security' 
  | 'execution' 
  | 'evidence';

export type StatusType = 'pending' | 'approved' | 'blocked' | 'failed' | 'running' | 'waiting' | 'pass';

export interface SeamEvent {
  id: string;
  timestamp: string;
  component: ComponentType;
  action: string;
  status: StatusType;
  evidence_id: string;
  details?: string;
}

export type ViewMode = 'normal' | 'seam';

