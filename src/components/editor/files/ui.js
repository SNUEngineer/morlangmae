export default class Ui {
    constructor({ api, config, onSelectFiles }) {
        this.api = api;
        this.config = config;
        this.onSelectFiles = onSelectFiles;
        this.nodes = {
            wrapper: make('div'),
            imageContainer: make('div'),
            fileButton: this.createFileButton(),
            imageEl: undefined,
            imagePreloader: make('div'),
        };

        this.nodes.imageContainer.appendChild(this.nodes.imagePreloader);
        this.nodes.wrapper.appendChild(this.nodes.imageContainer);
        this.nodes.wrapper.appendChild(this.nodes.fileButton);
    }

    static get status() {
        return {
            EMPTY: 'empty',
            UPLOADING: 'loading',
            FILLED: 'filled',
        };
    }

    render(toolData) {
        if (!toolData.file || Object.keys(toolData.file).length === 0) {
            this.toggleStatus(Ui.status.EMPTY);
        } else {
            this.toggleStatus(Ui.status.UPLOADING);
        }

        return this.nodes.wrapper;
    }

    createFileButton() {
        const button = make('div');
        button.innerHTML = '파일을 선택해주세요';
        button.addEventListener('click', () => {
            this.onSelectFiles();
        });
        return button;
    }

    showPreloader(src) {
        this.nodes.imagePreloader.style.backgroundImage = `url(${src})`
        this.toggleStatus(Ui.status.UPLOADING);
    }

    hidePreloader() {
        this.nodes.imagePreloader.style.backgroundImage = '';
        this.toggleStatus(Ui.status.EMPTY);
    }

    fillImage(url) {
        this.nodes.imageEl = make('img');
        this.nodes.imageEl.addEventListner('load', () => {
            this.toggleStatus(Ui.status.FILLED);

            if (this.nodes.imagePreloader) {
                this.nodes.imagePreloader.style.backgroundImage = '';
            }
        });

        this.nodes.imageContainer.appendChild(this.nodes.imageEl);
    }

    toggleStatus(status) {
        for (const statusType in Ui.status) {
            if (Object.prototype.hasOwnProperty.call(Ui.status, statusType)) {
                //
            }
        }
    }
}

export const make = function make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName);
    
    if (Array.isArray(classNames)) {
        el.classList.add(...classNames);
    } else if (classNames) {
        el.classList.add(classNames);
    }

    for (const attrName in attributes) {
        el[attrName] = attributes[attrName];
    }

    return el;
}
