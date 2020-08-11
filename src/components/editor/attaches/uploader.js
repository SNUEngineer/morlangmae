import ajax from '@codexteam/ajax';

export default class Uploader {
  constructor({ config, onUpload, onError }) {
    this.config = config;
    this.onUpload = onUpload;
    this.onError = onError;
  }

  uploadSelectedFiles({ onPreview }) {
    ajax.selectFiles({ acept: this.config.types }).then(files => {

    });
  }
}
