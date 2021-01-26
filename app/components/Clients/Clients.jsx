// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Load stylesheet
import './Clients.scss';

// Load redux actions
import { getClients, deleteClient } from '../../redux/actions/entities/client';

// Load components
import Title from '../Title/Title.jsx';

class Clients extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    // Initial state
    this.state = {
      items: []
    };

    // Bind functions
    this.removeClient = this.removeClient.bind(this);
    this.filterList = this.filterList.bind(this);

    this.props.loadClients();
  }

  /**
   * Dispatches client delete action
   * @param {Object} client 
   */
  removeClient (client) {
    const clientId = client._id;
    const name = client.company;
    
    const confirmDelete = confirm(`Are you sure you want to delete the following client: ${name}?`);

    if (confirmDelete) {
      this.props.dispatch(deleteClient(clientId));
    }
  }

  /**
   * React Life Cycle method with triggers after component received properties
   */
  componentWillReceiveProps () {
    this.setState({
      items: this.props.clients
    });
  }

  /**
   * List filtering by search value
   * @param {Event} event 
   */
  filterList (event) {
    let updatedList = this.props.clients;
    updatedList = updatedList.filter(item => {
      const regex = new RegExp(event.target.value.toLowerCase(), 'i');
      return Object.keys(item).some(key => {
        return regex.test(item[key]);
      });
    });

    this.setState({ items: updatedList });
  }

  /**
   * Render component
   */
  render () {
    const { isAdmin } = this.props;

    return (
      <div className="clients-wrapper">
        <Title title="Clients" />
        <section className="content">
          <div className="row">
            <div className="col-6 col-md-3">
              <input type="text" className="filter-input" placeholder="Search" onChange={this.filterList} />
            </div>
            <div className="col-6 col-md-9 text-right">
              <Link to="/clients/create" className="btn btn-primary">Add new</Link> 
            </div>
          </div>
          <div className="row">
            {
              this.state.items.map((item) => {
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={item._id}>
                    <div className="card">
                      <div className="card-header"></div>
                      <div className="card-image">
                        <Link to={`/clients/${item._id}`}>
                          {item.logo && <img src={item.logo} alt={`${item.company}`} />}
                        </Link>
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">
                          <Link to={`/clients/${item._id}`}>{item.company}</Link>
                        </h4>
                        <span className="actions">
                          <Link to={`/clients/${item._id}/edit`} className="text-warning"><i className="fa fa-pencil"></i></Link> 
                          {isAdmin && (<a onClick={this.removeClient.bind(this, item)} className="text-danger"><i className="fa fa-trash"></i></a>)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
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
const mapStateToProps = state => ({
  clients: state.entities.client.all,
  isAdmin: state.entities.auth.admin
});

/**
 * Bind redux actions to component
 * @param {Funtion} dispatch 
 * @param {Object} componentProps 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    loadClients: () => dispatch(getClients()),
    dispatch
  }
}

// Connect component with Redux
export default connect(mapStateToProps, mapDispatchToProps)(Clients);