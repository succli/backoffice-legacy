// Load modules
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

// Load stylesheet and assets
import './Sidebar.scss';
import defaultAvatar from '../../assets/images/default_avatar.svg';

// Load redux action
import { getHoursAndMinutes } from '../../services/date';

class Sidebar extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    // Intial state
    this.state = {
      workedHours: '-',
      loggedHours: '-'
    };

    // Bind functions
    this.getHours = this.getHours.bind(this);
  }

  /**
   * Calculates log data for sidebar
   */
  getHours () {
    const { logged } = this.props;
    const todayLogs = _.filter(logged, log =>  
      (moment({hour: 0, minute: 0, second: 0}) < moment(log.start)));

    const dataTime = {
      checkin: { hours: 0, minutes: 0 },
      log: { hours: 0, minutes: 0 }
    }
    
    _.forEach(todayLogs, (log) => {
      const data = getHoursAndMinutes(log);
      if (log.ticket === null) {
        dataTime.checkin.hours += data.hours;
        dataTime.checkin.minutes += data.minutes;
      } else {
        dataTime.log.hours += data.hours;
        dataTime.log.minutes += data.minutes
      }
    });

    let extraHours;

    if (dataTime.checkin.minutes > 60) {
      extraHours = Math.floor(dataTime.checkin.minutes / 60);
      dataTime.checkin.hours += extraHours;
      dataTime.checkin.minutes -= extraHours * 60;
    }

    if (dataTime.log.minutes > 60) {
      extraHours = Math.floor(dataTime.log.minutes / 60);
      dataTime.log.hours += extraHours;
      dataTime.log.minutes -= extraHours * 60;
    }
    
    this.setState({
      loggedHours: moment(dataTime.log).format('HH:mm'),
      workedHours: moment(dataTime.checkin).format('HH:mm')
    });
  }

  /**
   * Calculates current work log standing from logs
   * @returns {String}
   */
  getCurrentWorkLogStanding () {
    const { currentUser, calendars, logged } = this.props;
    const workHoursPerDay = currentUser.workingHours;
    let mustWorkedTillNow = 0;
    let workedTillNow = 0;

    const loggedTillNow = _.filter(logged, log => log.ticket === null && 
      (moment().startOf('day') >= moment(log.start)));
      
    _.forEach(loggedTillNow, log => {
      const data = getHoursAndMinutes(log);
      workedTillNow += (data.minutes + data.hours * 60)
    });

    _.forEach(calendars, calendar => {
      if (calendar.year <= moment().format('YYYY')) {
        _.forEach(calendar.days, day => {
          if (day.isWorkday && moment({ year: calendar.year }).add({ days: day.number }) < moment()) {
            mustWorkedTillNow += workHoursPerDay;
          }
        });
      }
    });

    mustWorkedTillNow *= 60;

    let diff = workedTillNow - mustWorkedTillNow;
    let prefix = '+';

    if (diff < 0) {
      prefix = '-';
      diff *= -1;
    }

    let hours = Math.floor(diff / 60);
    let minutes = diff - hours * 60;

    hours = hours > 10 ? hours : `0${hours}`;
    minutes = minutes > 10 ? minutes : `0${minutes}`;

    return `${prefix}${hours}:${minutes}`;
  }

  /**
   * React Life Cycle method which triggers after component mount
   * Creates and interval with calls getHours every minutes
   */
  componentDidMount () {
    this.interval = setInterval(this.getHours, 1000);
  }

  /**
   * React Life Cycle method which triggers after component is unmounted and destroyed
   * Delete interval
   */
  componentWillUnmount () {
    clearInterval(this.interval);
  }

  /**
   * Render component
   */
  render () {
    const { currentUser, isAdmin, activeLog, logged, calendars } = this.props;
    const avatar = currentUser && currentUser.avatar ? currentUser.avatar : defaultAvatar;
    const currentWorkLogStanding = currentUser ? this.getCurrentWorkLogStanding() : '+00:00';
    
    const todayLogs = _.filter(logged, log => log.ticket === null && 
      (moment({hour: 0, minute: 0, second: 0}) < moment(log.start)));
    const logDate = todayLogs.length > 0 ? moment(todayLogs[0].start).format('YYYY. MM. DD. HH:mm') : '-';

    return (
      <aside className={classNames({'main-sidebar': true, 'collapsed': this.props.navigation})}>
        <section className="sidebar">
          <div className="user-panel">
            <div className="image">
              <img src={avatar} alt="user image"/>
            </div>
            <div className="info">
              <div>
                <p>{currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : ''}</p>
              </div>
              <a href="" title="Current Status">
                <i className="fa fa-circle text-success"></i> {currentWorkLogStanding}
              </a>
            </div>
          </div>
          <div className="log-data">
            <ul>
              <li><strong>Checked in:</strong> {logDate}</li>
              <li><strong>Worked hours:</strong> {this.state.workedHours}</li>
              <li><strong>Logged hours:</strong> {this.state.loggedHours}</li>
            </ul>
          </div>
          <ul className="sidebar-menu">
            <li className="pageLink">
              <NavLink exact to="/" activeClassName="active">
                <i className="fa fa-desktop"></i>
                <span className="page">Dashboard</span>
              </NavLink>
            </li>
            <li className="header">Users</li>
            <li className="pageLink">
              <NavLink to="/users" activeClassName="active">
                <i className="fa fa-user"></i>
                <span className="page">User List</span>
              </NavLink>
            </li>
            {isAdmin && (<li className="pageLink">
              <NavLink to="/registration" activeClassName="active">
                <i className="fa fa-user-plus"></i>
                <span className="page">Registration</span>
              </NavLink>
            </li>)}
            <li className="header">Clients</li>
            <li className="pageLink">
              <NavLink to="/clients" activeClassName="active">
                <i className="fa fa-users"></i>
                <span className="page">Client List</span>
              </NavLink>
            </li>
            <li className="header">Report</li>
            <li className="pageLink">
              <NavLink to="/reports" activeClassName="active">
                <i className="fa fa-line-chart"></i>
                <span className="page">Report</span>
              </NavLink>
            </li>
            <li className="pageLink">
              <NavLink to="/daily-report" activeClassName="active">
                <i className="fa fa-bar-chart"></i>
                <span className="page">My Daily Report</span>
              </NavLink>
            </li>
            <li className="header">Other</li>
            <li className="pageLink">
              <NavLink to="/calendar" activeClassName="active">
                <i className="fa fa-calendar"></i>
                <span className="page">Calendar</span>
              </NavLink>
            </li>
            {(isAdmin || (currentUser && currentUser.group === 'Management')) && (
              <li className="pageLink">
                <NavLink to="/hr" activeClassName="active">
                  <i className="fa fa-handshake-o"></i>
                  <span className="page">HR</span>
                </NavLink>
              </li>
            )}
            <li className="pageLink">
              <NavLink to="/contacts" activeClassName="active">
                <i className="fa fa-phone"></i>
                <span className="page">Contacts</span>
              </NavLink>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}

/**
 * Bind state object elements to component
 * @param {Object} state 
 * @param {Object} componentProps 
 */
const mapStateToProps = state => {
  const currentUser = state.entities.user.all[_.findIndex(state.entities.user.all, user => state.entities.auth.current === user._id)];
  const registered = currentUser ? moment(currentUser.registered) : null;

  return (
    {
      navigation: state.ui.navigation,
      isAdmin: state.entities.auth.admin,
      logged: state.entities.log.user,
      currentUser,
      calendars: registered !== null ? _.filter(state.entities.calendar.all, calendar => calendar.year >= registered.format('YYYY')) : []
    }
  )
};

// Connect component with Redux
export default connect(mapStateToProps, {}, null, {pure:false})(Sidebar);