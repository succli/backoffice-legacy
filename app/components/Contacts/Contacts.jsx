// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterableTable from 'react-filterable-table';

// Load stylesheet
import './Contacts.scss';

// Load redux actions
import { getUsers } from '../../redux/actions/entities/user';

// Load components
import Title from '../Title/Title.jsx';

/**
 * Render name field
 * @param {Object} props 
 */
const renderNameField = props => (
  <span>
    {`${props.record.firstname} ${props.record.lastname}`}
  </span>
)

class Contacts extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    this.props.loadUsers();

    // Table fields
    this.fields = [
      { name: 'name', displayName: 'Name', inputFilterable: true, sortable: true, render: renderNameField },
      { name: 'email', displayName: 'Email', inputFilterable: true, sortable: true },
      { name: 'privateEmail', displayName: 'Private Email', inputFilterable: true, sortable: true },
      { name: 'phone', displayName: 'Phone', inputFilterable: true, sortable: true },
      { name: 'privatePhone', displayName: 'Private Phone', inputFilterable: true, sortable: true }
    ]
  }

  /**
   * Render component
   */
  render () {
    const { users } = this.props;

    return (
      <div className="contacts-wrapper">
        <Title title="Contacts" />
        <section className="content">
          <div className="row">
            <div className="col-12">
              {users && 
                <FilterableTable 
                  namespace="Contacts"
                  initialSort="name"
                  data={users}
                  fields={this.fields}
                  topPagerVisible={false} 
                  noRecordsMessage="There are no users to display"
                  noFilteredRecordsMessage="No users match your filters!" />}
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
const mapStateToProps = (state) => ({
  users: state.entities.user.all
});

/**
 * Bind redux actions to component
 * @param {Funtion} dispatch 
 * @param {Object} componentProps 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(getUsers())
  };
}

// Connect component with Redux
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);