// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Load stylesheet
import './User.scss';

// Load components
import Title from '../Title/Title.jsx';
import UserForm from './UserForm/UserForm.jsx';

class User extends Component {
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
      <div className="user-wrapper">
        <Title title="Edit user" />
        <section className="content">
          <div className="row justify-content-stretch">
            <div className="col-12">
              <div className="content-card">
                {id && (<UserForm userId={id} />)}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default User;