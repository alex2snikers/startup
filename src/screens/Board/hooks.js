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

const reorderTasks = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const useUpdateTaskMutation = () => {
    const queryClient = useQueryClient();
    const match = useRouteMatch('/:projectId');

    return useMutation((task) => {
        axios.put(`/api/tasks/${task.id}`, {
            position: task.position,
        })
    }, {
        onSuccess: (a, bodyRequest) => {
            const columns = queryClient.getQueryData(['columns', match.params.projectId]);
            const chengedColumns = columns.map(item => {
                if (item.column._id === bodyRequest.columnId) {
                    const newTaskOrder = reorderTasks(
                        item.tasks,
                        bodyRequest.source.index,
                        bodyRequest.destination.index,
                    );
        
                    return {
                        ...item,
                        tasks: newTaskOrder,
                    }
                }

                return item;
            })
            
            queryClient.setQueryData(['columns', match.params.projectId], chengedColumns)
        },
    });
}
