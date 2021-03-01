import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const useFetchBoardData = (projectId) => {
    return useQuery(['columns', projectId], async() => {
        const response = await axios.get(`/api/projects/${projectId}/board`);

        return response.data;
    }, {
        refetchOnWindowFocus: false,
    });
}

export const useUpdateTaskMutation = () => {
    const queryClient = useQueryClient();
    const match = useRouteMatch('/:projectId');

    return useMutation((task) => {
        axios.put(`/api/tasks/${task.id}`, {
            position: task.position,
        })
    }, {
        onSuccess: (a, bodyRequest, context) => {
            console.warn(bodyRequest);
            
            const columns = queryClient.getQueryData(['columns', match.params.projectId]);
            console.warn(columns[0].tasks);
            
            // TODO : Optimaze HERE
            const newColumnsData = columns.map(item => {
                if (item.column._id === bodyRequest.columnId) {
                    item.tasks.map(task => {
                        if (task._id === bodyRequest.id) {
                            task.position = bodyRequest.position;
                        }

                        return task
                    });

                }
            
                return item;
            });

            console.warn(newColumnsData[0].tasks);
            
        },
    });
}
