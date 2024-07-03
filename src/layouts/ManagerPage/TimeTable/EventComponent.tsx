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
    <p>{event.description}</p>
  </span>
);

export default EventComponent;
