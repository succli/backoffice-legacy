// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

// Load stylesheet
import './HumanResources.scss';

// Load components
import Title from '../Title/Title.jsx';
import CalendarForm from '../CalendarForm/CalendarForm.jsx';

class HumanResources extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    const date = new Date();

    // Initial state
    this.state = {
      year: date.getFullYear()
    }

    // Bind functions
    this.changeCalendar = this.changeCalendar.bind(this);
  }

  /**
   * Change active tab to selected year
   * @param {Number} year 
   */
  changeCalendar (year) {
    this.setState({ year });
  }

  /**
   * Render component
   */
  render () {
    const { calendars } = this.props;

    return (
      <div>
        <Title title="Human Resources" />
        <div className="content">
          <div className="row">
            <div className="col-12">
              <div className="tabs">
                <ul className="tab-nav">
                  {calendars.length && calendars.map(calendar => (
                    <li className={classnames({'tab-nav-pill': true, 'active': this.state.year === calendar.year})} key={calendar._id}>
                      <button type="button" onClick={this.changeCalendar.bind(this, calendar.year)}>{calendar.year}</button>
                    </li>
                  ))}
                  <li className="className tab-nav-pill add-new">
                    <button type="button"><i className="fa fa-plus"></i></button>
                  </li>
                </ul>
                <div className="tab-content">
                  <CalendarForm year={this.state.year} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Connect component with Redux
export default connect(state => ({
  calendars: state.entities.calendar.all
}))(HumanResources);