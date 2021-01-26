// Load modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Load stylesheet and assets
import './Page404.scss';
import logo from '../../assets/images/logo.svg';

class Page404 extends Component {
  /**
   * Render component
   */
  render () {
    return (
      <div id="page404">
        <div>
          <img src={logo} />
          <h1>The page doesn't exists.</h1>
          <Link to="/">Back to home</Link>
        </div>
      </div>
    )
  }
}

export default Page404;