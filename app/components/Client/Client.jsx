// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Load stylesheet
import './Client.scss';

// Load redux actions
import { getClient } from '../../redux/actions/entities/client';

// Load components
import Title from '../Title/Title.jsx';

class Client extends Component {
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
    const { client, tickets, users } = this.props;

    return (
      <div className="clients-wrapper">
        {client && <Title title={client.company} />}
        <section className="content">
          <div className="row justify-content-stretch">
            <div className="col-4 col-lg-3">
              <div className="sidebar-card">
                <div className="sidebar-card-container">
                  <figure className="sidebar-card-image">
                    {client && client.logo && (<img src={client.logo} alt="client logo" />)}
                  </figure>
                  <div className="sidebar-card-data">
                    <ul>
                      {client && (<li className="featured"><i className="fa fa-briefcase"></i> {client.company}</li>)}
                      {client && (<li><i className="fa fa-at"></i> {client.email}</li>)}
                      {client && (<li><i className="fa fa-phone"></i> {client.phone}</li>)}
                      {client && (<li><i className="fa fa-globe"></i> <a href={client.website}>{client.website}</a></li>)}
                      {client && (<li><i className="fa fa-address-book"></i> {client.contact}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8 col-lg-9">
              <div className="content-card">
                <h2 className="ticket-header">Ticket history</h2>
                <div className="log-table">
                  {tickets && tickets.map(ticket => {
                    const user = users[_.findIndex(users, user => ticket.user === user._id)];

                    return (
                      <div className="log-row" key={ticket._id}>
                        <div className="row">
                          <div className="col-8">{ticket.name}</div>
                          <div className="col-4">
                           <strong>Asignee:</strong> {`${user.firstname} ${user.lastname}`}
                          </div>
                        </div>
                      </div>
                    )
                  })}
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
export default connect((state, componentProps) => ({
  users: state.entities.user.all,
  client: state.entities.client.all[_.findIndex(state.entities.client.all, client => client._id === componentProps.match.params.id)],
  tickets: _.filter(state.entities.ticket.all, ticket => ticket.client._id === componentProps.match.params.id)
}))(Client);