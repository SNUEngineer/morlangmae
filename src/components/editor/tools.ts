import Header from '@editorjs/header';
import Image from '@editorjs/image';
// import Delimiter from '@editorjs/delimiter'
import Attaches from './attaches';

// export const EDITOR_JS_TOOLS = {
//   embed: Embed,
//   table: Table,
//   paragraph: Paragraph,
//   list: List,
//   warning: Warning,
//   code: Code,
//   linkTool: LinkTool,
//   image: Image,
//   raw: Raw,
//   header: Header,
//   quote: Quote,
//   marker: Marker,
//   checklist: CheckList,
//   inlineCode: InlineCode,
//   simpleImage: SimpleImage
// }

// import Images from './images';
import { uploadFile } from '../../services/file.service'

// const images: any = Images
export const EDITOR_JS_TOOLS = {
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file: File) {
          return uploadFile(file).then(res => {
            return {
              success: 1,
              file: {
                url: res.uri
              }
            }
          });
        }
      }
    }
  },
  header: Header,
  // images: images,
  // image: Image,

  // delimiter: Delimiter,
  // attaches: Attaches,
}
