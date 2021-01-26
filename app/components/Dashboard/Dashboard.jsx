// Load modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import classnames from 'classnames';

// Load stylesheet
import './Dashboard.scss';

// Load components
import Title from '../Title/Title.jsx';

// Load redux actions
import { deleteTicket, closeTicket } from '../../redux/actions/entities/ticket';
import { logIn, logOut } from '../../redux/actions/entities/log';
import { getActiveLog, getActiveTicket } from '../../services/log';
import { getTicketLoggedTime, getTicketPercentage } from '../../services/ticket';

class Dashboard extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    // Bind functions
    this.closeUserTicket = this.closeUserTicket.bind(this);
    this.removeTicket = this.removeTicket.bind(this);
    this.logInTicket = this.logInTicket.bind(this);
    this.logChangeTicket = this.logChangeTicket.bind(this);
    this.logOutTicket = this.logOutTicket.bind(this);
  }

  /**
   * Dispatches closing ticket action
   * @param {Object} ticket 
   */
  closeUserTicket (ticket) {
    const confirmClose = confirm(`Are you sure you want to close "${ticket.name}" ticket?"`);

    if (confirmClose) {
      this.props.dispatch(closeTicket(ticket._id));
    }
  }

  /**
   * Dispatches ticket delete action
   * @param {Object} ticket 
   */
  removeTicket (ticket) {
    const confirmDelete = confirm(`Are you sure you want to delete "${ticket.name}" ticket?"`);

    if (confirmDelete) {
      this.props.dispatch(deleteTicket(ticket._id));
    }
  }

  /**
   * Dispatches log in ticket action
   * @param {Object} ticket 
   */
  logInTicket (ticket) {
    const { currentUser, dispatch } = this.props;
    dispatch(logIn(ticket._id, currentUser._id));
  }

  /**
   * Dispatches log out ticket action then log in ticket action
   * @param {Object} ticket 
   */
  logChangeTicket (ticket) {
    const { currentUser, dispatch, activeTicket } = this.props;
    dispatch(logOut(activeTicket.ticket));
    setTimeout(() => {
      dispatch(logIn(ticket._id, currentUser._id));
    }, 50);
  }

  /**
   * Dispatches log out ticket action
   * @param {Object} ticket 
   */
  logOutTicket (ticket) {
    this.props.dispatch(logOut(ticket._id));
  }
  
  /**
   * Render component
   */
  render() {
    const { userTickets, clients, activeLog, activeTicket } = this.props;
    const today = moment();

    return (
      <div>
        <Title title="Dashboard" />
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="content-card">
                <div className="row align-items-center">
                  <div className="col-7">
                    <h2>Your tickets</h2>
                  </div>
                  <div className="col-5 text-right">
                    <Link to="/tickets/create" className="btn btn-primary">Add ticket</Link>
                  </div>
                </div>
                <div className="row">
                  {userTickets && userTickets.map(ticket => {
                    const percentage = getTicketPercentage(ticket.logs, ticket.estimated);
                    const dueDate = moment(ticket.duedate).format('YYYY. MM. DD.');
                    const daysTillDueDate = moment.duration(moment(ticket.duedate).diff(today)).asDays();
                    const noteTitle = daysTillDueDate < 2 ? daysTillDueDate > 0 ? `The ticket's due date is near!` : `The ticket's due date has passed!` : null;

                    return (
                      <div className="col-12 col-md-6 col-lg-4" key={ticket._id}>
                        <div className={classnames('ticket-card', `priority-${ticket.priority}`)}>
                          <h4 className="ticket-card-title">
                            <Link to={`/tickets/${ticket._id}`}>{ticket.name}</Link>
                            {daysTillDueDate < 2 && (
                              <i className={classnames({
                                'fa': true,
                                'fa-exclamation-circle': true,
                                'color-warning': daysTillDueDate < 2 && daysTillDueDate > 0, 
                                'color-danger': daysTillDueDate < 0})}
                                title={noteTitle}></i>
                            )}
                          </h4>
                          <div className="ticket-card-data">
                            <p><strong>Client:</strong> <Link to={`/clients/${ticket.client._id}`}>{ticket.client.company}</Link></p>
                            <p><strong>Estimated:</strong> {ticket.estimated} hour(s)</p>
                            <p><strong>Due date:</strong> {dueDate}</p>
                            <p><strong>Logged:</strong> {getTicketLoggedTime(ticket.logs)}</p>

                            <div className="progress">
                              <div className="progress-bar" style={{width: `${percentage}%`}}>
                                <span>{`${parseFloat(percentage).toFixed(0)}%`}</span>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-6">
                                <div className="actions">
                                  <button onClick={this.logInTicket.bind(this, ticket)} type="button" className="log-in" title="Log on this ticket" disabled={!activeLog || (activeLog && activeLog.end) || activeTicket}><i className="fa fa-key"></i></button>
                                  <button onClick={this.logChangeTicket.bind(this, ticket)} type="button" className="log-change" title="Change log on this ticket"  disabled={(!activeLog || (activeLog && activeLog.end) ) || (activeTicket && activeTicket.ticket === ticket._id)}><i className="fa fa-random"></i></button>
                                  <button onClick={this.logOutTicket.bind(this, ticket)} type="button" className="log-out" title="Log out from this ticket" disabled={!activeLog || !activeTicket || (activeTicket && activeTicket.ticket !== ticket._id)}><i className="fa fa-ban"></i></button>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="actions actions-right">
                                  <button onClick={this.closeUserTicket.bind(this, ticket)} type="button" className="log-close" title="Close ticket"><i className="fa fa-lock"></i></button>
                                  <Link to={`/tickets/${ticket._id}/edit`} className="log-edit" title="Edit ticket"><i className="fa fa-pencil"></i></Link>
                                  <button onClick={this.removeTicket.bind(this, ticket)} type="button" className="log-out" title="Delete ticket"><i className="fa fa-times"></i></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

/**
 * Bind state object elements to component
 * @param {Object} state 
 * @param {Object} componentProps 
 */
const mapStateToProps = (state, componentProps) => ({
  userTickets: _.filter(state.entities.ticket.all, ticket => !ticket.closed && ticket.user == state.entities.auth.current),
  activeTicket: getActiveTicket(state),
  activeLog: getActiveLog(state),
  clients: state.entities.client.all,
  currentUser: state.entities.user.all[_.findIndex(state.entities.user.all, user => state.entities.auth.current === user._id)]
});

// Connect component with Redux
export default connect(mapStateToProps)(Dashboard);