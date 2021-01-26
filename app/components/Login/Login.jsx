// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';

// Load stylesheet and assets
import './Login.scss';
import logo from '../../assets/images/logo.svg';
 
// Load components
import Alert from '../Alert/Alert.jsx';

// Load redux actions
import { login } from '../../redux/actions/entities/auth';

/**
 * Validation rules for redux form
 * @param {Object} values 
 */
const validate = values => {
  const errors = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!values.email) {
    errors.email = 'This field is mandatory.';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email address.';
  }

  if (!values.password) {
    errors.password = 'This field is mandatory.';
  }

  return errors;
}

/**
 * Render field HTML
 * @param {Object} 
 */
const renderField = ({
  input,
  label,
  type,
  className,
  disabled,
  icon,
  meta: { touched, error, warning }}) => (
    <div>
      <div className="input-group">
        <span className="input-group-addon">
          <i className={classnames('fa', icon)}></i>
        </span>
        <input {...input} placeholder={label} type={type} className={className} disabled={disabled} />
      </div>
      {touched && (error && <span className="form-error">{error}</span>)}
    </div>
  )

class Login extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);
    
    // Bind functions
    this.login = this.login.bind(this);
  }

  /**
   * Dispatches user login action
   * @param {Object} values 
   * @param {Function} dispatch 
   */
  login (values, dispatch) {
    dispatch(login(values));  
  }

  /**
   * Render component
   */
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="login-wrapper">
        <div className="login-box">
          <img src={logo} alt="Backoffice" className="img-responsive" />
          <form onSubmit={handleSubmit(this.login)}>
            <Field name="email" component={renderField} type="email" className="form-control" icon="fa-envelope" label="Email address" />
            <Field name="password" component={renderField} type="password" className="form-control" icon="fa-lock" label="Password" />
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
        <Alert />
      </div>
    )
  }
}

/**
 * Bind state object elements to component
 * @param {Object} state 
 * @param {Object} componentProps 
 */
const mapStateToProps = (state, componentProps) => ({});

// Initialize Redux form
Login = reduxForm({
  form: 'login',
  validate
})(Login);

// Connect component with Redux
export default connect(mapStateToProps)(Login);