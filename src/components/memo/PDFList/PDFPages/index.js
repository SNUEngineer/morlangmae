import React from "react";
import { PDFJS } from "pdfjs-dist";
import pdfjsLib from "pdfjs-dist";
import "./index.scss";
const SCROLL_TOP_PADDING = 200;

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.js`;

export class PdfPages extends React.Component {
  componentDidMount() {
    this.stream(this.props);
  }

  stream = (props) => {
    const url = props.url;
    if (url) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "arraybuffer";
      xhr.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          this.props.updateProgressBar(percent);
        }
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          const _ab = xhr.response;
          this.pdf = _ab;
          this.loadPDF(_ab);
        } else {
          console.error("Error while requesting", url);
        }
      };

      xhr.onerror = () => {
        console.error("Error while requesting", url);
      };

      xhr.send();
    }
  };

  loadPDF = async () => {
    const src = this.pdf;
    if (!src) {
      return;
    }
    const loadPDF = await pdfjsLib.getDocument(src).promise;
    this._pdf = await loadPDF;
    await this.props.setPdf(loadPDF);
  };

  render() {
    return <div />;
  }
}

export default PdfPages;
