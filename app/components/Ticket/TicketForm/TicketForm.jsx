// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';

// Load stylesheets
import 'react-datepicker/src/stylesheets/datepicker.scss';
import './TicketForm.scss';

// Load redux actions
import { createTicket, updateTicket, getTicket, deleteTicket } from '../../../redux/actions/entities/ticket';

/**
 * Validation rules for redux form
 * @param {Object} values
 * @returns {Object} 
 */
const validate = values => {
  const errors = {};
  const numberRegex = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;

  if (!values.name) {
    errors.name = 'This field is mandatory.';
  }

  if (!values.duedate) {
    errors.duedate = 'This field is mandatory.';
  }

  if (!values.priority) {
    errors.priority = 'This field is mandatory.';
  }

  if (!values.type) {
    errors.type = 'This field is mandatory.';
  }

  if (!values.estimated) {
    errors.estimated = 'This field is mandatory.';
  } else if (!numberRegex.test(values.estimated)) {
    errors.estimated = 'Only numbers allowed!';
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

/**
 * Render date field HTML
 * @param {Object} 
 */
const renderDatePicker = ({
  input,
  label,
  type,
  className,
  disabled, 
  meta: { touched, error, warning }}) => (
    <div>
      <DatePicker {...input} locale="en" dateFormat="YYYY. MM. DD." selected={input.value ? moment(input.value) : null} className={className} />
      {touched && (error && <span className="form-error">{error}</span>)}
    </div>
)

class TicketForm extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    // Bind functions
    this.submit = this.submit.bind(this);
    
    if (this.props.ticketId) {
      this.props.loadDefaultValues();
    }
  }

  /**
   * Dispatches ticket create or update action
   * @param {Object} values 
   * @param {Function} dispatch 
   */
  submit (values, dispatch) {
    const { ticketId, currentUser, initialValues } = this.props;

    if (initialValues && initialValues.user) {
      values.user = initialValues.user;
    } else if (currentUser && currentUser._id) {
      values.user = currentUser._id;
    }

    if (ticketId) {
      values._id = ticketId;
      dispatch(updateTicket(values));
    } else {
      dispatch(createTicket(values));
    }
  }

  /**
   * Render component
   */
  render () {
    const { handleSubmit, submitting, clients } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div className="row form-group align-items-center">
          <label htmlFor="type" className="col-2 col-lg-3">Type</label>
          <div className="col-12 col-lg-9">
            <Field name="type" component="select" className="form-control">
              <option value="default">Default</option>
              <option value="management">Management</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
            </Field>
          </div>
        </div>

        <div className="row form-group align-items-center">
          <label htmlFor="client" className="col-2 col-lg-3">Client</label>
          <div className="col-12 col-lg-9">
            <Field name="client" component="select" className="form-control">
              <option disabled></option>
              {clients && clients.map(client => {
                return <option key={client._id} value={client._id}>{client.company}</option>
              })}
            </Field>
          </div>
        </div>

        <div className="row form-group align-items-center">
          <label htmlFor="name" className="col-2 col-lg-3">Ticket name</label>
          <div className="col-10 col-lg-9">
            <Field type="text" component={renderField} name="name" className="form-control" />
          </div>
        </div>

        <div className="row form-group align-items-center">
          <label htmlFor="duedate" className="col-2 col-lg-3">Due date</label>
          <div className="col-10 col-lg-9">
            <Field type="date" component={renderDatePicker} name="duedate" className="form-control" />
          </div>
        </div>

        <div className="row form-group align-items-center">
          <label htmlFor="priority" className="col-2 col-lg-3">Priority</label>
          <div className="col-12 col-lg-9">
            <Field name="priority" component="select" className="form-control">
              <option value="0">Low</option>
              <option value="1">Normal</option>
              <option value="2">High</option>
              <option value="3">Hot</option>
            </Field>
          </div>
        </div>

        <div className="row form-group align-items-start">
          <label htmlFor="description" className="col-2 col-lg-3">Description</label>
          <div className="col-10 col-lg-9">
            <Field component="textarea" name="description" className="form-control" />
          </div>
        </div>

        <div className="row form-group align-items-center">
          <label htmlFor="estimated" className="col-2 col-lg-3">Estimated</label>
          <div className="col-10 col-lg-9">
            <Field type="number" component={renderField} name="estimated" className="form-control" />
          </div>
        </div>

        <div className="row form-group align-items-center">
          <label htmlFor="hyperlink" className="col-2 col-lg-3">Issue tracker link</label>
          <div className="col-10 col-lg-9">
            <Field type="text" component={renderField} name="hyperlink" className="form-control" />
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
  initialValues: componentProps.ticketId ? state.entities.ticket.all[_.findIndex(state.entities.ticket.all, ticket => ticket._id === componentProps.ticketId)] : {},
  clients: state.entities.client.all,
  currentUser: state.entities.user.all[_.findIndex(state.entities.user.all, user => state.entities.auth.current === user._id)]
});

/**
 * Bind redux actions to component
 * @param {Funtion} dispatch 
 * @param {Object} componentProps 
 */
const mapDispatchToProps = (dispatch, componentProps) => {
  if (componentProps.ticketId) {
    return {
      loadDefaultValues: () => dispatch(getTicket(componentProps.ticketId))
    }
  } else {
    return {};
  }
}

// Initialize Redux form
TicketForm = reduxForm({
  form: 'ticket-form',
  validate,
  enableReinitialize: true
})(TicketForm);

// Connect component with Redux
export default connect(mapStateToProps, mapDispatchToProps)(TicketForm);