import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views, NavigateAction, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from './CustomToolbar'; // Import the custom toolbar
import "../../../css/Manager/ManagerTimeTable.css";
import EventComponent from './EventComponent';

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(Views.MONTH);

  useEffect(() => {
    const eventsData = [
      {
        title: 'Meeting with John',
        start: '2024-07-01T10:00:00Z',
        end: '2024-07-01T12:00:00Z',
        description: 'Discuss the project requirements and timeline.'
      },
      {
        title: 'Lunch Break',
        start: '2024-07-01T13:00:00Z',
        end: '2024-07-01T14:00:00Z',
        description: 'Take a break and have lunch.'
      },
      {
        title: 'Conference',
        start: '2024-07-02T09:00:00Z',
        end: '2024-07-02T16:00:00Z',
        description: 'Attend the annual conference.'
      },
      {
        title: 'Dentist Appointment',
        start: '2024-07-03T11:00:00Z',
        end: '2024-07-03T12:00:00Z',
        description: 'Routine dental check-up.'
      },
    ];

    const formattedEvents = eventsData.map(event => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      description: event.description,
    }));
    setEvents(formattedEvents);
  }, []);

  const handleNavigate = (newDate: Date, newView: View, action: NavigateAction) => {
    console.log('Navigating to new date:', newDate);
    console.log('Current view:', newView);
    console.log('Navigate action:', action);
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    console.log('Changing view to:', newView);
    setView(newView);
  };

  return (
    <div className='container'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        date={currentDate}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        view={view}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        components={{
          toolbar: CustomToolbar, // Use the custom toolbar
          event: EventComponent, // Use the custom event component
        }}
      />
    </div>
  );
};

export default MyCalendar;
