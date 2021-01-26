// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';

// Load stylesheet
import './ChangePassword.scss';

// Load redux actions
import { changePassword, getUser } from '../../redux/actions/entities/user';

/**
 * Validation rules for Redux form
 * @param {Object} values
 * @returns {Object}
 */
const validate = values => {
  const errors = {};

  if (!values.password) {
    errors.password = 'This field is mandatory.';
  }

  if (!values.new_password) {
    errors.new_password = 'This field is mandatory';
  }
  
  if (!values.confirm) {
    errors.confirm = 'This field is mandatory';
  } else if (values.new_password !== values.confirm) {
    errors.new_password = 'The two passwords do not match';
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

class ChangePassword extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    this.submit = this.submit.bind(this);
    
    this.props.loadDefaultValues();
  }

  /**
   * Dispatches changePassword action after form submit
   * @param {Object} values 
   * @param {Function} dispatch 
   */
  submit (values, dispatch) {
    dispatch(changePassword(values));
  }

  /**
   * Render component
   */
  render () {
    const { handleSubmit, submitting } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.submit)}>
          <div className="row justify-content-end">
            <div className="col-10 col-lg-9">
              <h3 className="fieldset-label">Change Password</h3>
            </div>
          </div>
          <div className="row form-group align-items-center">
            <label htmlFor="password" className="col-2 col-lg-3">Current Password</label>
            <div className="col-10 col-lg-9">
              <Field type="password" component={renderField} className="form-control" name="password" />
            </div>
          </div>
          <div className="row form-group align-items-center">
            <label htmlFor="new_password" className="col-2 col-lg-3">New Password</label>
            <div className="col-10 col-lg-9">
              <Field type="password" component={renderField} className="form-control" name="new_password" />
            </div>
          </div>
          <div className="row form-group align-items-center">
            <label htmlFor="confirm" className="col-2 col-lg-3">Confirm Password</label>
            <div className="col-10 col-lg-9">
              <Field type="password" component={renderField} className="form-control" name="confirm" />
            </div>
          </div>
          <Field name="_id" component="input" type="hidden" />
          <div className="row justify-content-end">
            <div className="col-10 col-lg-9">
              <button type="submit" className="btn btn-primary">Change password</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

/**
 * Bind state object elements to component
 * @param {Object} state 
 * @param {Object} componentProps 
 */
const mapStateToProps = (state, componentProps) => ({
  initialValues: state.entities.user.all[_.findIndex(state.entities.user.all, user => state.entities.user.selected === user._id)]
});

/**
 * Bind redux actions to component
 * @param {Funtion} dispatch 
 * @param {Object} componentProps 
 */
const mapDispatchToProps = (dispatch, componentProps) => {
  return {
    loadDefaultValues: () => dispatch(getUser(componentProps.userId))
  };
};

// Initialize Redux form
ChangePassword = reduxForm({
  form: 'change-password',
  validate,
  enableReinitialize: true
})(ChangePassword);

// Connect component with Redux
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);