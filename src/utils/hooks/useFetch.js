import { useQuery } from 'react-query';
import axios from 'axios';

export const useFetchData = (key) => {
  const { data, error, loading } = useQuery(key, async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${key}`
    );
    return response.json();
  });
  return { data, error, loading };
};

export const useMutationData = (key) => {
  const { data, error, loading } = useQuery(key, async () => {
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/${key}`
    );
    return response.json();
  });
  return { data, error, loading };
}
