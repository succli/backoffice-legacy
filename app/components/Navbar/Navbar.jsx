// Load modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

// Load redux actions
import { toggleMenu } from '../../redux/actions/ui/navigation';
import { logout } from '../../redux/actions/entities/auth';
import { checkIn, checkOut, logOut } from '../../redux/actions/entities/log';
import { getActiveLog, getActiveTicket } from '../../services/log';

// Load stylesheet and assets
import './Navbar.scss';
import defaultAvatar from '../../assets/images/default_avatar.svg';

class Navbar extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super (...args);

    // Initial state
    this.state = {
      isOpen: false
    }

    // Bind functions
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
    this.triggerCheckIn = this.triggerCheckIn.bind(this);
    this.triggerCheckOut = this.triggerCheckOut.bind(this);
  }

  /**
   * Dispatches user logout action
   * @param {Event} event 
   */
  logout (event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  /**
   * Dispatches sidebar navigation toggle
   */
  toggleMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    });

    this.props.dispatch(toggleMenu(!this.state.isOpen));
  }

  /**
   * Dispatches user check in
   */
  triggerCheckIn () {
    this.props.dispatch(checkIn(this.props.currentUser._id));
  }

  /**
   * Dispatches user check out
   */
  triggerCheckOut () {
    const { dispatch, activeLog, activeTicket } = this.props;
    
    if (activeTicket !== null) {
      dispatch(logOut(activeTicket._id));
    }
    dispatch(checkOut(activeLog._id));
  }
  
  /**
   * Render component
   */
  render () {
    const { currentUser, activeLog } = this.props;
    const avatar = typeof currentUser !== 'undefined' && currentUser.avatar ? currentUser.avatar : defaultAvatar;

    return (
      <nav className="navbar navbar-static-top">
        <div>
          <button type="button" className="sidebar-toggle" onClick={this.toggleMenu} >
            <span className="sr-only">Toggle navigation</span>
          </button>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="taskbar">
                <button type="button" disabled={activeLog && !activeLog.end} onClick={this.triggerCheckIn}><i className="fa fa-clock-o"></i></button>
                <button type="button" disabled={!activeLog || (activeLog && activeLog.end)} onClick={this.triggerCheckOut}><i className="fa fa-times"></i></button>
              </li>
              <li className="dropdown user user-menu">
                <Link to="/profile" className="dropdown-toggle">
                  <img src={avatar} alt="User image" className="user-image"/>
                  <span className="hidden-xs">{typeof currentUser !== 'undefined' ? `${currentUser.firstname} ${currentUser.lastname}` : ''}</span>
                </Link>
              </li>
              <li>
                <a onClick={this.logout}>
                  <i className="fa fa-sign-out"></i>
                  <span className="hidden-xs">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

// Connect component with Redux
export default connect(state => ({
  activeTicket: getActiveTicket(state),
  activeLog: getActiveLog(state),
  navigation: state.ui.navigation,
  currentUser: state.entities.user.all[_.findIndex(state.entities.user.all, user => state.entities.auth.current === user._id)]
}))(Navbar);