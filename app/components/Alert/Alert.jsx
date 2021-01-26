// Load modules
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Load stylesheet
import './Alert.scss';

// Load redux actions
import { dismissAlert } from '../../redux/actions/ui/alert';

class Alert extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super (...args);

    this.dismissAlert = this.dismissAlert.bind(this);
  }

  /**
   * Dismiss alert by clicking the close icon
   * Dispatches dismissAlert action
   */
  dismissAlert () {
    this.props.dispatch(dismissAlert());
  }

  /**
   * Get font awesome icon classname
   * @param {String} classname 
   * @returns {String}
   */
  getIconClass (classname) {

    switch (classname) {
      case 'success':
        return 'fa-check-circle';
      case 'warning':
        return 'fa-exclamation-circle';
      case 'danger':
        return 'fa-times-circle';
      default:
        return '';
    }
  }

  /**
   * Render component
   */
  render () {
    const { alert: { classname, message } } = this.props;
    
    return (
      message && (
        <div className="alert-overlay">
          <div className={classnames('alert', `alert-${classname}`)}>
            <button type="button" className="close" onClick={this.dismissAlert}><i className="fa fa-times"></i></button>
            <i className={classnames('fa', this.getIconClass(classname))}></i>
            {message}
          </div>
        </div>
      )
    )
  }
}

// Connect component with Redux
export default connect(state => ({
  alert: state.ui.alert
}))(Alert);