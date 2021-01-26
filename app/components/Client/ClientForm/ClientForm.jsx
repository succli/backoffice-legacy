// Load modules
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

// Load redux actions
import { getClient, createClient, updateClient } from '../../../redux/actions/entities/client';

/**
 * Validation rules for redux form
 * @param {Object} values
 * @returns {Object} 
 */
const validate = values => {
  const errors = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!values.company) {
    errors.company = 'This field is mandatory.';
  }

  if (!values.email) {
    errors.email = 'This field is mandatory.';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email address.';
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
)

class ClientForm extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    this.submit = this.submit.bind(this);

    if (this.props.clientId) {
      this.props.loadDefaultValues();
    }
  }

  /**
   * Dispatch create or update client action after form submit
   * @param {Object} values 
   * @param {Function} dispatch 
   */
  submit (values, dispatch) {
    if (this.props.clientId) {
      values._id = this.props.clientId;
      dispatch(updateClient(values));

    } else {
      dispatch(createClient(values));
    }
  }
  
  /**
   * Render component
   */
  render () {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div className="row form-group align-items-center">
          <label htmlFor="company" className="col-2 col-lg-3">Company</label>
          <div className="col-10 col-lg-9">
            <Field type="text" component={renderField} name="company" className="form-control" />
          </div>
        </div>
        <div className="row form-group align-items-center">
          <label htmlFor="email" className="col-2 col-lg-3">Email</label>
          <div className="col-10 col-lg-9">
            <Field type="email" component={renderField} name="email" className="form-control" />
          </div>
        </div>
        <div className="row form-group align-items-center">
          <label htmlFor="phone" className="col-2 col-lg-3">Phone</label>
          <div className="col-10 col-lg-9">
            <Field type="text" component={renderField} name="phone" className="form-control" />
          </div>
        </div>
        <div className="row form-group align-items-center">
          <label htmlFor="website" className="col-2 col-lg-3">Website</label>
          <div className="col-10 col-lg-9">
            <Field type="text" component={renderField} name="website" className="form-control" label="http://example.com" />
          </div>
        </div>
        <div className="row form-group align-items-center">
          <label htmlFor="contact" className="col-2 col-lg-3">Contact</label>
          <div className="col-10 col-lg-9">
            <Field type="text" component={renderField} name="contact" className="form-control" />
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-10 col-lg-9">
            <button type="submit" disabled={submitting} className="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    );
  }
}

/**
 * Bind state object elements to component
 * @param {Object} state 
 * @param {Object} componentProps 
 */
const mapStateToProps = (state, componentProps) => ({
  initialValues: componentProps.clientId ? 
    state.entities.client.all[_.findIndex(state.entities.client.all, client => client._id === componentProps.clientId)] : {}
});

/**
 * Bind redux actions to component
 * @param {Funtion} dispatch 
 * @param {Object} componentProps 
 */
const mapDispatchToProps = (dispatch, componentProps) => {
  if (componentProps.clientId) {
    return {
      loadDefaultValues: () => dispatch(getClient(componentProps.clientId))
    }
  } else {
    return {};
  }
};

// Initialize Redux form
ClientForm = reduxForm({
  form: 'client-form',
  validate,
  enableReinitialize: true
})(ClientForm);

// Connect component with Redux
export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);