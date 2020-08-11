import axios from '../common/axios';

export async function searchProject({ title }: { title: string }) {
  const res = await axios.post(
    "/projects/v1",
    {
      title
    }
  );
}
