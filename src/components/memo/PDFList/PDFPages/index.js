import React from "react";
import { PDFJS } from "pdfjs-dist";
import pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import "./index.scss";
// import { PDFJS } from "pdfjs-dist";

// PDFJS.workerSrc =
//   "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.338/pdf.worker.js";
// PDFJS.workerSrc =
//   "@intelllex/react-pdf/node_modules/pdfjs-dist/build/pdf.worker.js";
// PDFJS.workerSrc = "file://public/pdf.worker.js";
const SCROLL_TOP_PADDING = 200;

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.js`;

export class PdfPages extends React.Component {
  componentDidMount() {
    console.log("되냐?");
    this.stream(this.props);
  }

  // componentWillUnmount() {
  //   const { pdf } = this.state;
  //   pdf && pdf.destroy();
  //   this.documentPromise && this.documentPromise.cancel();
  // }

  stream = (props) => {
    console.log("되냐?1111");
    const url = props.url;
    if (url) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "arraybuffer";
      console.log("되냐?222");
      xhr.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          this.props.updateProgressBar(percent);
        }
      };
      console.log("되냐?3333");
      xhr.onload = () => {
        if (xhr.status === 200) {
          const _ab = xhr.response;
          this.pdf = _ab;
          console.log("되냐?444");
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
    console.log("되냐?555");
    if (!src) {
      return;
    }
    console.log("되냐?6666");
    const loadPDF = await pdfjsLib.getDocument(src).promise;
    console.log("되냐?777 " + loadPDF.numPages);
    this._pdf = await loadPDF;
    console.log("되냐?888");
    await this.props.setPdf(loadPDF);
  };

  render() {
    return <div />;
  }
}

export default PdfPages;
