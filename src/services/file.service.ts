import axios from "../common/axios";

export async function uploadFile(file: File): Promise<{ uri: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post("files/v1", formData);
  console.log("uploadFileuploadFile " + JSON.stringify(res));
  return res.data;
}

export async function uploadFiles(
  files: File[] | FileList
): Promise<{ uris: string[] }> {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append("files", file));
  const res = await axios.post("files/v1/multi", formData);
  return res.data;
}
