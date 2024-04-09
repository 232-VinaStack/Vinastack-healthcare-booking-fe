import { useQuery, useMutation } from 'react-query';
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
  return useMutation(
    async (newData) => {
      // Use newData for clarity
      const response = await axios({
        method: 'POST',
        url: `http://172.22.176.1:8080/${key}`,
        data: newData, // Use newData consistently
      });
      return response.json();
    },
    {
      // Optional mutation configuration object
      onSuccess: (data) => {
        // Handle successful mutation (optional)
        console.log('Mutation successful:', data);
      },
      onError: (error) => {
        // Handle mutation errors (optional)
        console.error('Mutation error:', error);
      },
    }
  );
};
