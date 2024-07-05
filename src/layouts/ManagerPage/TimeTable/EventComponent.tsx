import React from 'react';

interface Event {
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

interface EventComponentProps {
  event: Event;
}

const EventComponent: React.FC<EventComponentProps> = ({ event }) => (
  <span>
    <strong>{event.title}</strong>
    {event.description && <p dangerouslySetInnerHTML={{ __html: event.description }}></p>}
  </span>
);

export default EventComponent;
