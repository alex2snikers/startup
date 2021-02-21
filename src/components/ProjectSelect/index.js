import React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useRouteMatch } from 'react-router-dom';

const ProjectSelect = (props) => {
    const history = useHistory();
    const match = useRouteMatch('/:projectId');
    const queryClient = useQueryClient();
    const projectsQuesy = queryClient.getQueryData('projects');

    const handleOnChange = ({ currentTarget }) => {
        const projectId = currentTarget.getAttribute('data-id');

        history.push(`/${projectId}/board`);
    }

    return projectsQuesy
        ? <div className="btn-group" role="group" aria-label="Basic example">
            <div className="btn-group">
                <button type="info" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    {projectsQuesy.data.find(project => project._id === match.params.projectId).title}
                </button>
                <ul className="dropdown-menu">
                    {projectsQuesy.data.map((item) => (
                        <li key={item._id}>
                            <button data-id={item._id} className="dropdown-item" type="button" onClick={handleOnChange}>{item.title}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        : 'loading...';
}

export default ProjectSelect;
