import Ui from './ui';
import Uploader from './uploader';
import css from './index.css';

// TEMP
import css2 from '../index.css';

export default class Images {

  static get toolbox() {
    return {
      icon: `<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150.242V79c0-18.778-15.222-34-34-34H79c-18.778 0-34 15.222-34 34v42.264l67.179-44.192 80.398 71.614 56.686-29.14L291 150.242zm-.345 51.622l-42.3-30.246-56.3 29.884-80.773-66.925L45 174.187V197c0 18.778 15.222 34 34 34h178c17.126 0 31.295-12.663 33.655-29.136zM79 0h178c43.63 0 79 35.37 79 79v118c0 43.63-35.37 79-79 79H79c-43.63 0-79-35.37-79-79V79C0 35.37 35.37 0 79 0z"/></svg>`,
      title: 'Images',
    };
  }

  static get pasteConfig() {
    return {
      tags: ['img'],
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i,
      },
      files: {
        mimeTypes: ['image/*'],
      },
    };
  }

  static tempFiles = [];
  static tempUploader = undefined;

  constructor({ data, api, config }) {
    this.api = api;
    this.config = {
      endpoints: config.endpoints || '',
      field: config.field || 'image',
      types: config.types || 'image/*',
      uploader: config.uploader || undefined,
    };

    this.uploader = new Uploader({
      config: this.config,
      onUpload: (response) => this.onUpload(response),
      onError: (error) => { } // this.uploadingFailed(error),
    });

    this.ui = new Ui({
      api,
      config: this.config,
      onSelectFiles: () => {
        this.uploader.uploadSelectedFiles({
          onPreview: (src) => {
            this.ui.showPreloader(src);
          },
        });
      },
    });

    this._data = {};
    this.data = data;
    this.images = data.files;
  }

  render() {
    return this.ui.render(this.data);
  }

  renderSettings() {
    return this.tunes.render(this.data);
  }

  save() {
    return this._data;
  }

  onUpload(response) {
    this.images = response;
  }

  appendCallback() {
    this.ui.nodes.fileButton.click();
  }

  set images(files) {
    this._data.files = files || [];

    if (files && files.length > 0) {
      this.ui.fillImage(files[0]);
    }
  }

  async onPaste(event) {
    switch (event.type) {
      case 'tag': {
        const image = event.detail.data;

        this.uploadUrl(image.src);
        break;
      }
      case 'pattern': {
        const url = event.detail.data;

        this.uploadUrl(url);
        break;
      }
      case 'file': {
        const file = event.detail.file;

        Images.tempFiles.push(file);
        if (Images.tempUploader === undefined) {
          Images.tempUploader = setTimeout(() => this.uploadTempFiles(), 100);
        } else {
          this.api.blocks.delete(this.api.blocks.getCurrentBlockIndex());
        }
        break;
      }
    }
  }

  uploadTempFiles() {
    this.uploadFiles(Images.tempFiles);
    Images.tempFiles = [];
    Images.tempUploader = undefined;
  }

  uploadFiles(files) {
    this.uploader.uploadByFiles(files, {
      onPreview: (src) => {
        this.ui.showPreloader(src);
      },
    });
  }

  uploadUrl(url) {
    this.ui.showPreloader(url);
    this.uploader.uploadByUrl(url);
  }
}
