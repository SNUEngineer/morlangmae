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

        const upload = ajax.transport({
            url: this.config.endpoints.byFile,
            accept: this.config.types,
            headers: this.config.additionalRequestHeaders,
            beforeSend: (files) => {
                preparePreview(files[0]);
            },
            fieldName: this.config.field,
            multiple: true,
        }).then((response) => response.body);

        upload.then((response) => {
            this.onUpload(response);
        }).catch((error) => {
            this.onError(error);
        });

        // if (this.config.uploader && typeof this.config.uploader.uploadByFile === 'function') {
        //     upload = ajax.selectFiles({ accept: this.config.types }).then((files) => {
        //         preparePreview(files[0]);

        //         const customUpload = this.config.uploader.uploadByFiles(files);
        //     })
        // }
    }

    uploadByFiles(files, { onPreview }) {
        const reader = new FileReader();

        console.log(files);

        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            onPreview(e.target.result);
        }

        const formData = new FormData();

        files.forEach((file) => {
            formData.append(this.config.field, file);
        });
        
        console.log(formData)

        const upload = ajax.post({
            url: this.config.endpoints.byFile,
            data: formData,
            type: ajax.contentType.JSON,
            headers: this.config.additionalRequestHeaders
        }).then(response => response.body);

        upload.then((response) => {
            this.onUpload(response);
        }).catch((error) => {
            this.onError(error);
        });
    }
}
