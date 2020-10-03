import Ui from './ui';
import Uploader from './uploader';

export default class Files {

    static get toolbox() {
        return {
            icon: 'FILE',
            title: 'Files',
        };
    }

    static get pasteConfig() {
        return {
            files: {
                mimeTypes: ['application/pdf'],
            },
        };
    }

    static tempFiles = [];
    static tempUploader = undefined;

    constructor({data, api, config}) {
        this.api = api;
        this.config = {
            endpoints: config.endpoints || '',
            field: config.field || 'file',
            types: config.types || 'application/pdf',
            uploader: config.uploader || undefined,
        };

        this.uploader = new Uploader({
            config: this.config,
            onUpload: (response) => this.onUpload(response),
            onError: (error) => {} // this.uploadingFailed(error),
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
    }

    render() {
        return this.ui.render(this.data);
    }

    renderSettings() {
        return this.tunes.render(this.data);
    }

    save() {
        return this.data;
    }

    onUpload(response) {
        this.images = response;
    }

    appendCallback() {
        this.ui.nodes.fileButton.click();
    }

    set images(files) {
        this._data.files = files || {};

        this.ui.fillImage(files[0]);
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
                
                Files.tempFiles.push(file);
                if (Files.tempUploader === undefined) {
                    Files.tempUploader = setTimeout(() => this.uploadTempFiles(), 100);
                } else {
                    this.api.blocks.delete(this.api.blocks.getCurrentBlockIndex());
                }
                break;
            }
        }
    }

    uploadTempFiles() {
        this.uploadFiles(Files.tempFiles);
        Files.tempFiles = [];
        Files.tempUploader = undefined;
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
