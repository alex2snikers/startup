import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const TaskWrapper = styled.section`
    min-height: 150px;
    background: yellow;
`;

const Task = ({ data, index }) => {
    return (
        <Draggable draggableId={data._id} index={index}>
            {(provided, snapshot) => (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                <h4>{data.title}</h4>
                </div>
            )}
        </Draggable>
    );
}

export default Task;
