// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import classnames from 'classnames';

// Load stylesheet
import './CalendarForm.scss';

// Load redux actions
import { updateCalendar } from '../../redux/actions/entities/calendar';
import { alert } from '../../redux/actions/ui/alert';

class CalendarForm extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    // Bind functions
    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.save = this.save.bind(this);
    this.alertToSave = this.alertToSave.bind(this);
  }

  /**
   * Dispatch updateCalendar when user changes checkbox
   * @param {Event} event 
   */
  changeCheckbox (event) {
    const i = event.target.getAttribute('id').split('-').splice(1,1)[0];
    const { calendar, dispatch } = this.props;
    calendar.days[i].isWorkday = !calendar.days[i].isWorkday;
    dispatch(updateCalendar(calendar));
  }

  /**
   * Alert user to save calendar when a note field changed
   * @param {Event} event 
   */
  alertToSave (event) {
    const i = event.target.getAttribute('id').split('-').splice(1,1)[0];
    const { dispatch } = this.props;
    
    this.props.calendar.days[i].note = event.target.value;

    dispatch(alert('warning', `Please don't forget to save your changes`));
  }

  /**
   * Dispatch updateCalendar after clicking Save button
   */
  save () {
    this.props.dispatch(updateCalendar(this.props.calendar));
  }

  /**
   * Render component
   */
  render () {
    const { calendar } = this.props;
    const numOfDays = calendar ? calendar.year % 4 == 0 ? 366 : 365 : 365;

    return (
      <div>
        {calendar && (
          <div className="content-card">
            {[...Array(numOfDays)].map((x, i) => {
              const date = moment({ year: calendar.year }).add({ days: i });
              return (
                <div className={classnames({ 'row-background': true, 'row-background-weekend': !calendar.days[i].isWorkday })} key={i}>
                  <div className="row align-items-center">
                    <div className="col-4">{date.format('YYYY. MM. DD. (dd)')}</div>
                    <div className="col-2">
                      <input type="checkbox" className="form-checkbox" id={`isworkday-${i}`} onChange={this.changeCheckbox} checked={calendar.days[i].isWorkday}/>
                    </div>
                    <div className="col-6">
                      <input type="text" className="form-control" id={`note-${i}`} defaultValue={calendar.days[i].note} onBlur={this.alertToSave} />
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="row">
              <div className="col-12 text-center">
                <button type="button" onClick={this.save} className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Connect component with Redux
export default connect((state, componentProps) => ({
  calendar: state.entities.calendar.all[_.findIndex(state.entities.calendar.all, calendar => calendar.year === componentProps.year)]
}))(CalendarForm);