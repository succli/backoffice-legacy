// Load modules
import axios from 'axios';

// Get constants
import { UPLOAD_FAILURE, UPLOAD_SUCCESS, DELETE_FILE, DELETE_FILE_ERROR } from '../constants/upload';

// Get actions
import { updateUser } from './entities/user';
import { updateClient } from './entities/client';

/**
 * Trigger successfull error
 * @returns {Object}
 */
export const uploadSuccess = () => {
  return {
    type: UPLOAD_SUCCESS
  }
}

/**
 * Trigger unsuccessfull action
 * @param {Object} error 
 * @returns {Object}
 */
export const uploadFail = error => {
  return {
    type: UPLOAD_FAILURE,
    error
  }
}

/**
 * Send upload request to the API
 * @param {Object} file 
 * @param {String} name,
 * @param {String} uploadType
 * @returns {Function}
 */
export const uploadRequest = ({ file, name, uploadType }) => {
  let data = new FormData();
  data.append('uploads[]', file);
  data.append('name', name);

  return (dispatch) => {
    axios.post('/api/upload', data, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        if (uploadType.entity == 'user') {
          dispatch(updateUser({ _id: uploadType.id, avatar: response.data.result }));
        } else if (uploadType.entity == 'client') {
          dispatch(updateClient({ _id: uploadType.id, logo: response.data.result }));
        }

        return dispatch(uploadSuccess());
      })
      .catch(error => dispatch(uploadFail(error)));
  }
}

/**
 * Send file deleting request to API
 * @param {String} url 
 */
export const deleteFile = (url) => {
  return (dispatch) => {
    axios.post('/api/upload/delete', { url }, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then (response => {
        dispatch({ type: DELETE_FILE });
      })
      .catch(error => {
        dispatch({ type: DELETE_FILE_ERROR, error });
      });
  }
}