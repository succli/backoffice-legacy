// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// Load stylesheet
import './Registration.scss';

// Load components
import Title from '../Title/Title.jsx';

// Load redux actions
import { registration } from '../../redux/actions/entities/auth';

/**
 * Validation rules for redux form
 * @param {Object} values
 * @returns {Object} 
 */
const validate = values => {
  const errors = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const numberRegex = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;

  if (!values.email) {
    errors.email = 'This field is mandatory.';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email address.';
  }

  if (!values.password) {
    errors.password = 'This field is mandatory.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be more than 6 characters length.'
  }

  if (!values.confirm) {
    errors.confirm = 'This field is mandatory.';
  } else if (values.password !== values.confirm) {
    errors.confirm = 'The two passwords do not match.';
  }

  if (!values.firstname) {
    errors.firstname = 'This field is mandatory.';
  }

  if (!values.lastname) {
    errors.lastname = 'This field is mandatory..';
  }

  if (!values.group) {
    errors.group = 'This field is mandatory.';
  }

  if (!values.workingHours) {
    errors.workingHours = 'This field is mandatory.';
  } else if (!numberRegex.test(values.workingHours)) {
    errors.workingHours = 'Working hours can be only numbers';
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
  meta: { touched, error, warning }}) => (
    <div>
      <input {...input} placeholder={label} type={type} className={className} disabled={disabled} />
      {touched && (error && <span className="form-error">{error}</span>)}
    </div>
  );

class Registration extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    // Bind functions
    this.registration = this.registration.bind(this);
  }

  /**
   * Dispatches user registration action
   * @param {Object} values 
   * @param {Function} dispatch 
   */
  registration (values, dispatch) {
    dispatch(registration(values));
  }

  /**
   * Render component
   */
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="registration-wrapper">
        <Title title="Registration" />
        <section className="content">
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="content-card">
                <form onSubmit={handleSubmit(this.registration)}>
                  <div className="row form-group align-items-center">
                    <label htmlFor="firstname" className="col-2 col-lg-3">First name</label>
                    <div className="col-10 col-lg-9">
                      <Field name="firstname" component={renderField} type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="row form-group align-items-center">
                    <label htmlFor="lastname" className="col-2 col-lg-3">Last name</label>
                    <div className="col-10 col-lg-9">
                      <Field name="lastname" component={renderField} type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="row form-group align-items-center">
                    <label htmlFor="email" className="col-2 col-lg-3">Email address</label>
                    <div className="col-10 col-lg-9">
                      <Field name="email" component={renderField} type="email" className="form-control" />
                      </div>
                  </div>
                  <div className="row form-group align-items-center">
                    <label htmlFor="workingHours" className="col-2 col-lg-3">Working hours</label>
                    <div className="col-12 col-lg-9">
                      <Field name="workingHours" component={renderField} type="number" className="form-control" />
                    </div>
                  </div>
                  <div className="row form-group align-items-center">
                    <label htmlFor="group" className="col-2 col-lg-3">Group</label>
                    <div className="col-12 col-lg-9">
                      <Field name="group" component="select" className="form-control">
                        <option value="None">None</option>
                        <option value="Management">Management</option>
                        <option value="Design">Design</option>
                        <option value="Developer">Developer</option>
                      </Field>
                    </div>
                  </div>
                  <div className="row form-group align-items-center">
                    <label htmlFor="password" className="col-2 col-lg-3">Password</label>
                    <div className="col-10 col-lg-9">
                      <Field name="password" component={renderField} type="password" className="form-control" />
                    </div>
                  </div>
                  <div className="row form-group align-items-center">
                    <label htmlFor="confirm" className="col-2 col-lg-3">Confirm password</label>
                    <div className="col-10 col-lg-9">
                      <Field name="confirm" component={renderField} type="password" className="form-control" />
                    </div>
                  </div>
                  <div className="row form-group justify-content-end">
                    <div className="col-10 col-lg-9">
                      <button type="submit" className="btn btn-primary" disabled={submitting}>Registration</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
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
Registration = reduxForm({
  form: 'registration',
  validate
})(Registration);

// Connect component with Redux
export default connect(mapStateToProps)(Registration);