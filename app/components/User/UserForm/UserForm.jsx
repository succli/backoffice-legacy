// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import randomstring from 'randomstring';
import _ from 'lodash';

// Load stylesheet
import './UserForm.scss';

// Load redux actions
import { getUser, updateUser, unsetUserAvatar } from '../../../redux/actions/entities/user';
import { uploadRequest } from '../../../redux/actions/upload';

// Load components
import ChangePassword from '../../ChangePassword/ChangePassword.jsx';
import SetPassword from '../../SetPassword/SetPassword.jsx';

/**
 * Validation rules for redux form
 * @param {Object} values
 * @returns {Object} 
 */
const validate = values => {
  const errors = {}
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const numberRegex = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;

  if (!values.firstname) {
    errors.firstname = 'This field is mandatory.';
  }

  if (!values.lastname) {
    errors.lastname = 'This field is mandatory.';
  }

  if (!values.email) {
    errors.email = 'This field is mandatory.';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email address.';
  }

  if (values.privateEmail && !emailRegex.test(values.privateEmail)) {
    errors.privateEmail = 'Invalid email address.';
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

class UserForm extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    // Bind functions
    this.submit = this.submit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.deleteAvatar = this.deleteAvatar.bind(this);

    this.props.loadDefaultValues();
  }

  /**
   * Dispatches user update action
   * @param {Object} values 
   * @param {Function} dispatch 
   */
  submit (values, dispatch) {
    dispatch(updateUser(values));
  }

  /**
   * Handle file upload request
   * @param {Event} event 
   */
  handleFileUpload (event) {
    const { userId, dispatch } = this.props;
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      dispatch(uploadRequest({
        file: files[0],
        name: randomstring.generate(),
        uploadType: {
          entity: 'user',
          id: userId
        }
      }));
    }
  }

  /**
   * Dispatches avatar delete action
   */
  deleteAvatar () {
    const { userId, dispatch, initialValues } = this.props;
    dispatch(unsetUserAvatar({ 
      _id: userId, 
      avatar: initialValues.avatar
    }));
  }

  /**
   * Render component
   */
  render () {
    const { handleSubmit, submitting, initialValues, currentUser, userId, isAdmin } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.submit)}>
          <div className="row justify-content-end">
            <div className="col-10 col-lg-9">
              <h3 className="fieldset-label">Personal data</h3>
            </div>
          </div>
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
            <label htmlFor="email" className="col-2 col-lg-3">Email</label>
            <div className="col-10 col-lg-9">
              <Field name="email" component={renderField} type="email" disabled="true" className="form-control" />
            </div>
          </div>
          <div className="row form-group align-items-center">
            <label htmlFor="phone" className="col-2 col-lg-3">Phone</label>
            <div className="col-10 col-lg-9">
              <Field name="phone" component={renderField} type="text" className="form-control" />
            </div>
          </div>
          <div className="row form-group align-items-center">
            <label htmlFor="position" className="col-2 col-lg-3">Position</label>
            <div className="col-10 col-lg-9">
              <Field name="position" component={renderField} type="text" className="form-control" />
            </div>
          </div>
          {isAdmin && (
            <div className="row form-group align-items-center">
              <label htmlFor="role" className="col-2 col-lg-3">Role</label>
              <div className="col-10 col-lg-9">
                <Field name="role" component="select" className="form-control">
                  <option value="User">User</option>
                  <option value="Administrator">Administrator</option>
                </Field>
              </div>
            </div>
          )}
          {isAdmin && (
            <div className="row form-group align-items-center">
              <label htmlFor="workingHours" className="col-2 col-lg-3">Working hours</label>
              <div className="col-12 col-lg-9">
                <Field name="workingHours" component={renderField} type="number" className="form-control" />
              </div>
            </div>
          )}
          {isAdmin && (
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
          )}
          <div className="row form-group align-items-center">
            <label htmlFor="privateEmail" className="col-2 col-lg-3">Private Email</label>
            <div className="col-10 col-lg-9">
              <Field name="privateEmail" component={renderField} type="email" className="form-control" />
            </div>
          </div>
          <div className="row form-group align-items-center">
            <label htmlFor="privatePhone" className="col-2 col-lg-3">Private Phone</label>
            <div className="col-10 col-lg-9">
              <Field name="privatePhone" component={renderField} type="text" className="form-control" />
            </div>
          </div>
          <Field name="_id" component="input" type="hidden" />
          <div className="row justify-content-end">
            <div className="col-10 col-lg-9">
              <button type="submit" className="btn btn-primary" disabled={submitting}>Save</button>
            </div>
          </div>
        </form>

        <div>
          <div className="row justify-content-end">
            <div className="col-10 col-lg-9">
              <h3 className="fieldset-label">Avatar</h3>
            </div>
          </div>
          <div className="row form-group justify-content-end align-items-center">
            <div className="col-10 col-lg-9">
              <input type="file" id="avatar-id" name="avatar-id" className="hidden-field" onChange={this.handleFileUpload} />
              <label htmlFor="avatar-id" className="btn btn-primary btn-upload">Change Avatar</label>
              <button type="button" className="btn btn-primary btn-upload" onClick={this.deleteAvatar}>Delete Avatar</button>
            </div>
          </div>
        </div>

        {(initialValues && currentUser && (initialValues._id === currentUser._id)) && <ChangePassword userId={this.props.userId} />}
        {(initialValues && currentUser && (initialValues._id !== currentUser._id)) && <SetPassword userId={userId} />}
      </div>
    );
  }
}

/**
 * Bind state object elements to component
 * @param {Object} state 
 * @param {Object} componentProps 
 */
const mapStateToProps = (state, componentProps) => ({
  userId: componentProps.userId,
  currentUser: state.entities.user.all[_.findIndex(state.entities.user.all, user => state.entities.auth.current === user._id)],
  initialValues: state.entities.user.all[_.findIndex(state.entities.user.all, user => state.entities.user.selected === user._id)],
  isAdmin: state.entities.auth.admin
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
UserForm = reduxForm({
  form: 'user-form',
  validate,
  enableReinitialize: true
})(UserForm);

// Connect component with Redux
export default connect(mapStateToProps, mapDispatchToProps)(UserForm);