// Load modules
import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Load stylesheets and assets
import './App.scss';
import logo from './assets/images/logo.svg';

// Load components
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Registration from './components/Registration/Registration.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Profile from './components/Profile/Profile.jsx';
import Users from './components/Users/Users.jsx';
import User from './components/User/User.jsx';
import Clients from './components/Clients/Clients.jsx';
import Client from './components/Client/Client.jsx';
import Page404 from './components/Page404/Page404.jsx';
import CreateClient from './components/Client/CreateClient/CreateClient.jsx';
import EditClient from './components/Client/EditClient/EditClient.jsx';
import Contacts from './components/Contacts/Contacts.jsx';
import Ticket from './components/Ticket/Ticket.jsx';
import CreateTicket from './components/Ticket/CreateTicket/CreateTicket.jsx';
import EditTicket from './components/Ticket/EditTicket/EditTicket.jsx';
import Alert from './components/Alert/Alert.jsx';
import HumanResources from './components/HumanResources/HumanResources.jsx';
import Calendar from './components/Calendar/Calendar.jsx';
import Report from './components/Report/Report.jsx';
import DailyReport from './components/Report/DailyReport/DailyReport.jsx';

class App extends Component {

  /**
   * Render component
   */
  render() {
    return (
      <div className={classNames({'wrapper': true, 'collapsed': this.props.navigation})}>
        <header className="main-header">
          <span className="logo-mini">
            <Link to="/">
              <span className="logo">
                <img src={logo} alt="Backoffice" className="img-responsive" />
              </span>
            </Link>
          </span>
          <Navbar />
        </header>
        <Sidebar />
        <div className="content-wrapper">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            {this.props.isAdmin && (<Route path="/registration" component={Registration} />)}
            <Route path="/profile" component={Profile} />
            <Route path="/users" exact component={Users} />
            {this.props.isAdmin && (<Route path="/users/:id" component={User} />)}
            <Route path="/clients" exact component={Clients} />
            <Route path="/clients/create" component={CreateClient} />
            <Route path="/clients/:id/edit" component={EditClient} />
            <Route path="/clients/:id" component={Client} />
            <Route path="/tickets/create" component={CreateTicket} />
            <Route path="/tickets/:id/edit" component={EditTicket} />
            <Route path="/tickets/:id" component={Ticket} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/reports" component={Report} />
            <Route path="/daily-report/:date" component={DailyReport} />
            <Route path="/daily-report" component={DailyReport} />
            {this.props.isAdmin && (<Route path="/hr" component={HumanResources} />)}
            <Route component={Page404} />
          </Switch>
        </div>
        <Alert />
      </div>
    );
  }
}

// Connect component with Redux
export default connect(state => ({
  navigation: state.ui.navigation,
  isAdmin: state.entities.auth.admin
}))(App);