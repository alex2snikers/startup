import axios from 'axios';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

export const useGetProjects = () => {
    const history = useHistory();

    const query = useQuery('projects', async () => {
        const response = await axios.get('/api/projects');

        return {
            data: response.data,
        };
    },
    {
        refetchOnWindowFocus: false,
    });

    if (query.data && history.location.pathname === '/') {
        history.push(`/${query.data.data[0]._id}/board`);
    }

    return query;
};