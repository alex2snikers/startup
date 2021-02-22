import React from 'react';
import styled from 'styled-components';

const TaskWrapper = styled.section`
    min-height: 150px;
    background: yellow;
`;

const Task = ({ data, ...props }) => {
    return (
        <TaskWrapper
            draggable="true"
            {...props}
        >
            <header>CNS-test</header>
            <label>{data.title}</label>
        </TaskWrapper>
    );
}

export default Task;
