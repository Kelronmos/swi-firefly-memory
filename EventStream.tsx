import { useEffect, useRef } from 'react';
import { SeamEvent } from '../types';

interface EventStreamProps {
  events: SeamEvent[];
}

export function EventStream({ events }: EventStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [events]);

  return (
    <div className="font-mono text-xs border border-neutral-800 p-4 bg-black text-neutral-300 h-full flex flex-col">
      <h3 className="text-white mb-4 uppercase tracking-widest border-b border-neutral-800 pb-2 flex items-center justify-between">
        <span>X-Ray Event Stream</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          LIVE
        </span>
      </h3>
      
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {events.length === 0 ? (
          <div className="text-neutral-600 italic">Waiting for events...</div>
        ) : (
          events.map((event, index) => (
            <div key={event.id} className="border-l-2 border-neutral-800 pl-3 py-1 space-y-1">
              <div className="text-neutral-500">{event.timestamp}</div>
              <div className="text-white uppercase">[{event.component}]</div>
              <div className="text-neutral-300">{event.action}</div>
              <div className="flex gap-2 items-center pt-1">
                <span className="text-neutral-500">STATUS:</span>
                <span className={`uppercase ${
                  event.status === 'pass' || event.status === 'approved' ? 'text-green-500' :
                  event.status === 'blocked' || event.status === 'failed' ? 'text-red-500' :
                  'text-yellow-500'
                }`}>
                  {event.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
