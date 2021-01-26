// Load modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';
import moment from 'moment';

// Load stylesheet
import './Ticket.scss';

// Load components
import Title from '../Title/Title.jsx';

// Load redux actions
import { getTicketLoggedTime, getTicketPercentage } from '../../services/ticket';

class Ticket extends Component {
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
    const { ticket, logs } = this.props;
    
    const percentage = ticket ? getTicketPercentage(ticket.logs, ticket.estimated) : 0;
    const dueDate = ticket ? moment(ticket.duedate).format('YYYY. MM. DD.') : '';

    return (
      <div>
        {ticket && (
          <div>
            <Title title={ticket.name} />
            <div className="content">
              <div className="row align-items-center">
                <div className="col-12">
                  <div className="content-card">
                    <div className="row align-items-center">
                      <div className="col-12 col-md-4">
                        <div className={classnames('ticket-card', `priority-${ticket.priority}`)}>
                          <div className="ticket-card-data">
                            <p><strong>Estimated:</strong> {ticket.estimated} hour(s)</p>
                            <p><strong>Due date:</strong> {dueDate}</p>
                            <p><strong>Logged:</strong> {getTicketLoggedTime(ticket.logs)}</p>
                            <p><strong>Description:</strong></p>
                            <p>{ticket.description}</p>

                            <div className="progress">
                              <div className="progress-bar" style={{width: `${percentage}%`}}>
                                <span>{`${parseFloat(percentage).toFixed(0)}%`}</span>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-8">
                        <div className="row justify-content-center">
                          <div className="col-4">
                            <div className="client-data">
                              <img src={ticket.client.logo} alt={ticket.client.company} />
                              <h3>{ticket.client.company}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-12">
                        <h2 className="ticket-header">Log history</h2>
                        {logs && (
                          <div className="log-table">
                            {logs.map(log => (
                              <div className="log-row" key={log._id}>
                                <div className="row">
                                  <div className="col-3">Log{log.end ? ' (closed)' : ''}</div>
                                  <div className="col-4 text-center">{moment(log.start).format('YYYY. MM. DD. HH:mm:ss')}</div>
                                  <div className="col-1 text-center">-</div>
                                  <div className="col-4 text-center">{log.end ? moment(log.end).format('YYYY. MM. DD. HH:mm:ss') : ''}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

// Connect component with Redux
export default connect((state, componentProps) => ({
  ticket: state.entities.ticket.all[_.findIndex(state.entities.ticket.all, ticket => ticket._id === componentProps.match.params.id)],
  logs: _.filter(state.entities.log.user, log => log.ticket == componentProps.match.params.id).reverse()
}))(Ticket);