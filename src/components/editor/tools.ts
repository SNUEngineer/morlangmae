import { uploadFiles, uploadFile } from "../../services/file.service";
import Paragraph from "@editorjs/paragraph";
import Header from "./header";
import Images from "./images";
import Files from "./files";

async function uploadByFile(file: File) {
  const res = await uploadFile(file);
  return res.uri;
}
async function uploadByFiles(files: File[]) {
  // if (files.length === 1) {
  //   const res = await uploadFile(files[0]);
  //   return res.uri;
  // }
  const res = await uploadFiles(files);
  return res.uris;
}

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: "헤더",
      preserveBlank: true,
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  paragraph: {
    class: Paragraph,
    // inlineToolbar: false,
    config: {
      placeholder: "내용",
      preserveBlank: true,
    },
  },
  images: {
    class: Images,
    config: {
      uploader: {
        uploadByFiles,
      },
    },
  },
  // files: {
  //   class: Files,
  //   config: {
  //     uploader: {
  //       uploadByFiles,
  //     },
  //   }
  // }
};
