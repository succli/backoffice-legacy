// Load modules
const path = require('path');
const jimp = require('jimp');
const fs = require('fs');

// Set upload dir in a contant
const UPLOAD_DIR = 'public/images';

module.exports = {

  /**
   * Upload files and returns the url in a JSON object
   * REST endpoint: POST /api/upload
   * @param {Object} req Request object
   * @param {Object} res Result object
   * @param {Function} next Next function
   */
  upload: function (req, res, next) {
    if (!req.files) {
      return res.status(500).json({ message: 'No files.' });
    }

    let files = req.files.uploads;

    uploadFile(files[0], req.body.name)
      .then(result => {
        return res.status(200).json({ message: 'Successfully uploaded file.', result })
      })
      .catch(error => {
        return res.status(500).json({ message: 'Error uploading file.', error });
      });
  },

  /**
   * Finds file from url and delete it
   * REST endpoint: POST /api/upload/delete
   * @param {Object} req Request object
   * @param {Object} res Result object
   */
  delete: function (req, res) {
    const url = req.body.url;

    if (url.length === 0) {
      return res.status(404).json({ message: 'File not exists.' });
    }

    let filePath = url.replace(`http://${process.env.DOMAIN}`, '');
    filePath = path.resolve('public') + filePath;

    fs.lstat(filePath, (error, stats) => {
      if (typeof stats !== 'undefined' && stats.isFile()) {
        fs.unlink(filePath, error => {
          if (error) {
            return res.status(500).json({ message: 'Error deleting file.', error });
          }

          return res.status(200).json({ message: 'Successfully deleted file.' });
        });
      } else {
        return res.status(404).json({ message: 'File not exists.' });
      }
    })
  }
}

/**
 * Resize and then uploads file with the given hash as filename in a Promise
 * @param {Object} file 
 * @param {String} hash 
 */
function uploadFile (file, hash) {

  return new Promise((resolve, reject) => {
    jimp.read(file.path)
      .then(image => {
        const ratio = 800 / image.bitmap.width;
        const fileName = `${hash}.${image.getExtension()}`;
        const filePath = path.resolve(UPLOAD_DIR) + `/${fileName}`;
        const url = `http://${process.env.DOMAIN}/images/${fileName}`;

        image.scale(ratio)
          .write(filePath, (error, body) => {
            if (error) {
              return reject(error);
            }

            return resolve(url);
          })
      })
      .catch(error => {
        return reject(error);
      })
  })
}