// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import _ from 'lodash';

// Load stylesheet
import './Users.scss';

// Load redux actions
import { getUsers, deleteUser } from '../../redux/actions/entities/user';

// Load components
import Title from '../Title/Title.jsx';

class Users extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    this.props.loadUsers();

    // Initial state
    this.state = {
      items: []
    };

    // Bind functions
    this.removeUser = this.removeUser.bind(this);
    this.filterList = this.filterList.bind(this);
  }

  /**
   * React Life Cycle method with triggers after component received properties
   */
  componentWillReceiveProps () {
    this.setState({
      items: this.props.users
    });
  }

  /**
   * List filtering by search value
   * @param {Event} event 
   */
  filterList (event) {
    let updatedList = this.props.users;
    updatedList = updatedList.filter(item => {
      const regex = new RegExp(event.target.value.toLowerCase(), 'i');
      return Object.keys(item).some(key => {
        return regex.test(item[key]);
      });
    });

    this.setState({ items: updatedList });
  }

  /**
   * Dispatches user delete action
   * @param {Object} user 
   */
  removeUser (user) {
    const userID = user._id;
    const name = `${user.firstname} ${user.lastname}`;
    
    const confirmDelete = confirm(`Are you sure you want to delete the following user: ${name}?`);

    if (confirmDelete) {
      this.props.dispatch(deleteUser(userID));
    }
  }

  /**
   * Render component
   */
  render () {
    const { currentUser, isAdmin } = this.props;
    
    return (
      <div className="users-wrapper">
        <Title title="Users" />
        <section className="content">
          <div className="row">
            <div className="col-3">
              <input type="text" className="filter-input" placeholder="Search" onChange={this.filterList} />
            </div>
          </div>
          <div className="row">
            {
              this.state.items.map((item) => {
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={item._id}>
                    <div className="card">
                      <div className={classnames('card-header', `background-${item.group.toLowerCase()}`)}></div>
                      <div className="card-image">
                        <img src={item.avatar} alt={`${item.firstname} ${item.lastname}`} />
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">{item.firstname} {item.lastname}</h4>
                        {item.position && <p>{item.position}</p>}
                        {isAdmin && (
                          <span className="actions">
                            <Link to={`/users/${item._id}`} className="text-warning"><i className="fa fa-pencil"></i></Link> 
                            {currentUser && currentUser._id !== item._id && <a onClick={this.removeUser.bind(this, item)} className="text-danger"><i className="fa fa-trash"></i></a>}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>
      </div>
    );
  }
}

/**
 * Bind state object elements to component
 * @param {Object} state 
 * @param {Object} componentProps 
 */
const mapStateToProps = (state) => ({
  currentUser: state.entities.user.all[_.findIndex(state.entities.user.all, user => state.entities.auth.current === user._id)],
  users: state.entities.user.all,
  isAdmin: state.entities.auth.admin
});

/**
 * Bind redux actions to component
 * @param {Funtion} dispatch 
 * @param {Object} componentProps 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(getUsers()),
    dispatch
  };
}

// Connect component with Redux
export default connect(mapStateToProps, mapDispatchToProps)(Users);