import axios from 'axios';
import { useQuery } from 'react-query';

export const useFetchBoardData = (projectId) => {
    console.warn('projectId', projectId);
      
    return useQuery(['columns', projectId], async() => {
        return await axios.get(`/api/columns?projectId=${projectId}`);
    }, {
        refetchOnWindowFocus: false,
    });
}
