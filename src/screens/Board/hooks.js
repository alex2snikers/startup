import axios from 'axios';
import { useQuery } from 'react-query';

export const useFetchBoardData = (projectId) => {
    return useQuery(['columns', projectId], async() => {
        const response = await axios.get(`/api/projects/${projectId}/board`);

        return response.data;
    }, {
        refetchOnWindowFocus: false,
    });
}
