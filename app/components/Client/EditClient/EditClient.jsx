// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import randomstring from 'randomstring';

// Load components
import Title from '../../Title/Title.jsx';
import ClientForm from '../ClientForm/ClientForm.jsx';

// Load redux actions
import { unsetClientLogo } from '../../../redux/actions/entities/client';
import { uploadRequest } from '../../../redux/actions/upload';

class EditClient extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super(...args);

    // Bind functions
    this.deleteLogo = this.deleteLogo.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  /**
   * Dispatches client logo removing action after submit
   */
  deleteLogo () {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    dispatch(unsetClientLogo(id));
  }

  /**
   * Handles file upload request
   * @param {Event} event 
   */
  handleFileUpload (event) {
    const { id } = this.props.match.params;
    const { dispatch, client } = this.props;
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      dispatch(uploadRequest({
        file: files[0],
        name: randomstring.generate(),
        uploadType: {
          entity: 'client',
          id
        }
      }));
    }
  }

  /**
   * Render component
   */
  render () {
    const { id } = this.props.match.params;

    return (
      <div>
        <Title title="Edit client" />
        <div className="content">
          <div className="row">
            <div className="col-12">
              <div className="content-card">
                <ClientForm clientId={id} />

                <div>
                  <div className="row justify-content-end">
                    <div className="col-10 col-lg-9">
                      <h3 className="fieldset-label">Logo</h3>
                    </div>
                  </div>
                  <div className="row form-group justify-content-end align-items-center">
                    <div className="col-10 col-lg-9">
                      <input type="file" id="logo-id" name="logo-id" className="hidden-field" onChange={this.handleFileUpload} />
                      <label htmlFor="logo-id" className="btn btn-primary btn-upload">Change Logo</label>
                      <button type="button" className="btn btn-primary btn-upload" onClick={this.deleteLogo}>Delete Logo</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Connect component with Redux
export default connect()(EditClient);