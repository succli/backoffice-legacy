/**
 * Turns tickets to calendar event objects
 * @param {Object} state 
 * @returns {Object[]}
 */
export const getCalendarEvents = (state) => {
  const events = [];

  _.forEach(state.entities.ticket.all, ticket => {
    if (ticket.user == state.entities.auth.current) {
      events.push({
        id: events.length,
        title: ticket.name,
        allDay: true,
        start: new Date(ticket.startdate),
        end: new Date(ticket.duedate),
        desc: ticket.description
      });
    }
  });

  return events;
}