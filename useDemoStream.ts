import { useState, useEffect, useCallback } from 'react';
import { SeamEvent } from '../types';

const DEMO_EVENTS: Omit<SeamEvent, 'id' | 'timestamp' | 'evidence_id'>[] = [
  { component: 'identity', action: 'Checking actor signature', status: 'pass' },
  { component: 'runtime', action: 'Checking environment. TPM: PASS', status: 'pass' },
  { component: 'token', action: 'Execution token created', status: 'pass' },
  { component: 'joe', action: 'Analysis complete. Confidence: 98.9%', status: 'pass' },
  { component: 'alita', action: 'Threat review complete. Risk: LOW', status: 'pass' },
  { component: 'firefly', action: 'Minimum context retrieved', status: 'pass' },
  { component: 'consensus', action: 'Decision: CONTINUE', status: 'pass' },
  { component: 'governance', action: 'Approved', status: 'pass' },
  { component: 'gate_3', action: 'Verification: 99% - PASSED', status: 'pass' },
  { component: 'security', action: 'Validating maze path', status: 'pass' },
  { component: 'execution', action: 'WAITING FOR VALIDATION', status: 'waiting' },
];

export function useDemoStream(isDemoRunning: boolean, onHaltTriggered: () => void) {
  const [events, setEvents] = useState<SeamEvent[]>([]);

  const addEvent = useCallback((template: Omit<SeamEvent, 'id' | 'timestamp' | 'evidence_id'>) => {
    const now = new Date();
    const newEvent: SeamEvent = {
      ...template,
      id: `EV-${Math.floor(Math.random() * 100000)}`,
      timestamp: now.toLocaleTimeString('en-US', { hour12: false }),
      evidence_id: `EVID-${Math.floor(Math.random() * 10000)}`,
    };
    setEvents(prev => [...prev, newEvent]);
  }, []);

  useEffect(() => {
    if (!isDemoRunning) return;

    let currentIndex = 0;
    setEvents([]);

    const interval = setInterval(() => {
      if (currentIndex < DEMO_EVENTS.length) {
        addEvent(DEMO_EVENTS[currentIndex]);
        
        if (DEMO_EVENTS[currentIndex].component === 'execution' && DEMO_EVENTS[currentIndex].status === 'waiting') {
          setTimeout(onHaltTriggered, 1000);
          clearInterval(interval);
        }
        
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isDemoRunning, addEvent, onHaltTriggered]);

  return { events, addEvent, setEvents };
}
