// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Load components
import Title from '../../Title/Title.jsx';
import TicketForm from '../TicketForm/TicketForm.jsx';

class EditTicket extends Component {
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
    const { id } = this.props.match.params;

    return (
      <div>
        <Title title="Edit ticket" />
        <div className="content">
          <div className="row">
            <div className="col-12">
              <div className="content-card">
                <TicketForm ticketId={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Connect component with Redux
export default EditTicket;