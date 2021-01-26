// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Load components
import Title from '../../Title/Title.jsx';
import ClientForm from '../ClientForm/ClientForm.jsx';

class CreateClient extends Component {
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
        <Title title="Create new client" />
        <div className="content">
          <div className="row">
            <div className="col-12">
              <div className="content-card">
                <ClientForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Connect component with Redux
export default CreateClient;