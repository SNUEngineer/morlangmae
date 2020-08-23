import axios from '../common/axios';

export async function uploadFile(file: File): Promise<{ uri: string }> {
  const formData = new FormData()
  formData.append("file", file)
  const res = await axios.post("files/v1", formData)
  return res.data
}
