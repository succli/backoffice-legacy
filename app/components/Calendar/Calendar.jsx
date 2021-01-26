// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Load stylesheet
import './Calendar.scss';

// Load components
import Title from '../Title/Title.jsx';

// Load redux actions
import { getCalendarEvents } from '../../services/calendar';

// Setup the localizer by providing the moment (or globalize) Object to the correct localizer.
BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);
  }

  /**
   * Render component
   */
  render () {
    const { events } = this.props;

    return (
      <div>
        <Title title="Calendar" />
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="content-card">
                {events.length > 0 && <BigCalendar events={events} />}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

// Connect component with Redux
export default connect(state => ({
  calendars: state.entities.calendar.all,
  events: getCalendarEvents(state)
}))(Calendar);