import ajax from '@codexteam/ajax';

export default class Uploader {
  constructor({ config, onUpload, onError }) {
    this.config = config;
    this.onUpload = onUpload;
    this.onError = onError;
  }

  uploadSelectedFiles({ onPreview }) {
    const preparePreview = function (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e) => {
        onPreview(e.target.result);
      };
    };

    let upload;
    if (this.config.uploader && typeof this.config.uploader.uploadByFiles === 'function') {
      upload = ajax.selectFiles({ accept: this.config.types, multiple: true }).then((files) => {
        preparePreview(files[0]);
        const customUpload = this.config.uploader.uploadByFiles(files);
        return customUpload
      })
    } else {
      upload = ajax.transport({
        url: this.config.endpoints.byFile,
        accept: this.config.types,
        headers: this.config.additionalRequestHeaders,
        beforeSend: (files) => {
          preparePreview(files[0]);
        },
        fieldName: this.config.field,
        multiple: true,
      }).then((response) => response.body);

    }

    upload.then((response) => {
      this.onUpload(response);
    }).catch((error) => {
      this.onError(error);
    });
  }

  uploadByFiles(files, { onPreview }) {
    const reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      onPreview(e.target.result);
    }

    let upload;
    if (this.config.uploader && typeof this.config.uploader.uploadByFiles === 'function') {
      upload = this.config.uploader.uploadByFiles(files);
    } else {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append(this.config.field, file);
      });

      upload = ajax.post({
        url: this.config.endpoints.byFile,
        data: formData,
        type: ajax.contentType.JSON,
        headers: this.config.additionalRequestHeaders
      }).then(response => response.body);
    }

    upload.then((response) => {
      this.onUpload(response);
    }).catch((error) => {
      this.onError(error);
    });
  }
}
