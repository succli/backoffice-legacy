// Load modules
import React, { Component } from 'react';

class Title extends Component {
  /**
   * Render component
   */
  render () {
    return (
      <section className="content-header">
        <h1>{this.props.title}</h1>
      </section>
    )
  }
}

export default Title;