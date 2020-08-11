export default class Ui {
  constructor({ api, config, onSelectFile }) {
    this.api = api;
    this.config = config;
    this.onSelectFile = onSelectFile;
    this.nodes = {
      wrapper: this.make('div'),
      fileButton: this.createFileButton(),
      fileContainer: this.make('div'),
    };
    this.nodes.wrapper.appendChild(this.nodes.fileButton);
  }

  render(toolData) {
    return this.nodes.wrapper;
  }

  createFileButton() {
    const button = this.make('div');
    button.addEventListener('click', () => {
      this.onSelectFile();
    });

    return button;
  }

  make(tagName, classNames = null, attributes = {}) {
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
  };
}
