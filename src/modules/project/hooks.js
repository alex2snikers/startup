import axios from 'axios';
import { useQuery } from 'react-query';

export const useGetProjects = () => {
    const query = useQuery('projects', async () => {
       return await axios.get('/api/projects');
    },
    {
        refetchOnWindowFocus: false,
    });

    return query;
};