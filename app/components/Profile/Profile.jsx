// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// Load components
import Title from '../Title/Title.jsx';
import UserForm from '../User/UserForm/UserForm.jsx';

// Load stylesheet and assets
import './Profile.scss';
import defaultAvatar from '../../assets/images/default_avatar.svg';

class Profile extends Component {
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
    const { currentUser } = this.props;
    const avatar = typeof currentUser !== 'undefined' && currentUser.avatar ? currentUser.avatar : defaultAvatar;

    return (
      <div className="profile-wrapper">
        <Title title="My Profile" />
        <section className="content">
          <div className="row justify-content-stretch">
            <div className="col-4 col-lg-3">
              <div className="sidebar-card">
                <div className="sidebar-card-container">
                  <figure className="sidebar-card-image">
                    <img src={avatar} alt="user avatar" />
                  </figure>
                  <div className="sidebar-card-data">
                    <ul>
                      {currentUser && (<li className="featured"><i className="fa fa-user"></i> {currentUser.firstname} {currentUser.lastname}</li>)}
                      {currentUser && (<li><i className="fa fa-at"></i> {currentUser.email}</li>)}
                      {currentUser && (<li><i className="fa fa-phone"></i> {currentUser.phone}</li>)}
                      {currentUser && (<li><i className="fa fa-briefcase"></i> {currentUser.position}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8 col-lg-9">
              <div className="content-card">
                {typeof currentUser !== 'undefined' && (<UserForm userId={currentUser._id} />)}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

// Connect component with Redux
export default connect(state => ({
  currentUser: state.entities.user.all[_.findIndex(state.entities.user.all, user => state.entities.auth.current === user._id)]
}))(Profile);