// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Load stylesheet
import './DailyReport.scss';

// Load components
import Title from '../../Title/Title.jsx';

class DailyReport extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super (...args);
  }

  /**
   * Creates array for log table
   * @returns {Object[]}
   */
  generateLogTableData () {
    const { logs, tickets } = this.props;
    const logData = [];

    _.forEach(logs, log => {
      if (log.ticket === null) {
        logData.push({
          start: log.start,
          ticket: 'Check in'
        });

        if (log.end) {
          logData.push({
            end: log.end,
            ticket: 'Check out'
          });
        }
      } else {
        logData.push({
          start: log.start,
          end: log.end,
          ticket: tickets[_.findIndex(tickets, ticket => ticket._id === log.ticket)] ? tickets[_.findIndex(tickets, ticket => ticket._id === log.ticket)].name : null
        });
      }
    });

    return _.sortBy(logData, ['start']);
  }

  /**
   * Render component
   */
  render () {
    const { currentUser } = this.props;
    const selectedDate = this.props.match.params.date ? 
      moment(new Date(this.props.match.params.date)) : moment();
    let prevDate = (this.props.match.params.date ? 
      moment(new Date(this.props.match.params.date)) : moment()).subtract(1, 'day');
    let nextDate = (this.props.match.params.date ? 
      moment(new Date(this.props.match.params.date)) : moment()).add(1, 'day');

    const logs = this.generateLogTableData();
    let index = 0;

    return (
      <div>
        <Title title="My daily report" />
        <section className="content">
          <div className="row log-nav">
            <div className="col-12">
              <div className="content-card">
                <div className="row">
                  <div className="col-3">
                    {currentUser && (selectedDate.format('YYYY-MM-DD') !== moment(currentUser.registered).format('YYYY-MM-DD')) ? <Link to={`/daily-report/${prevDate.format('YYYY-MM-DD')}`} ><i className="fa fa-angle-left"></i> {prevDate.format('YYYY. MM. DD.')}</Link> : ''}
                  </div>
                  <div className="col-6 text-center">
                    {selectedDate.format('YYYY. MM. DD. (dddd)')}
                  </div>
                  <div className="col-3 text-right">
                    {selectedDate.format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD') ? <Link to={`/daily-report/${nextDate.format('YYYY-MM-DD')}`} >{nextDate.format('YYYY. MM. DD.')} <i className="fa fa-angle-right"></i></Link> : ''}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <h2 className="ticket-header">Log list</h2>
                    {logs && (
                      <div className="log-table">
                        {logs.map(log => {
                          index++;

                          return (
                            <div className="log-row" key={index}>
                              <div className="row">
                                <div className="col-3">{log.ticket}</div>
                                <div className="col-4 text-center">{log.start ? moment(log.start).utc().format('YYYY. MM. DD. HH:mm:ss') : ''}</div>
                                <div className="col-1 text-center">-</div>
                                <div className="col-4 text-center">{log.end ? moment(log.end).utc().format('YYYY. MM. DD. HH:mm:ss') : ''}</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

// Connect component with Redux
export default connect((state, componentProps) => {
  // Get daily reports date
  const date = componentProps.match.params.date ? 
    moment(new Date(componentProps.match.params.date)) : moment();

  // Get selected date's logs
  let logs = _.filter(state.entities.log.user, log => {
    const start = moment(log.start);

    return start.format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
  });

  // Sort logs by start date
  logs = _.sortBy(logs, ['start']);

  return ({
    logs,
    tickets: _.filter(state.entities.ticket.all, ticket => ticket.user === state.entities.auth.current),
    currentUser: state.entities.user.all[_.findIndex(state.entities.user.all, user => user._id === state.entities.auth.current)]
  })
})(DailyReport);