// Load modules
import React, { Component } from 'react';

// Load components
import Title from '../../Title/Title.jsx';
import TicketForm from '../TicketForm/TicketForm.jsx';

class CreateTicket extends Component {
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
    return (
      <div>
        <Title title="Create new ticket" />
        <div className="content">
          <div className="row">
            <div className="col-12">
              <div className="content-card">
                <TicketForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Connect component with Redux
export default CreateTicket;