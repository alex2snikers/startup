import React from 'react';
import styled from 'styled-components';

import Task from 'containers/Task';

import { useFetchBoardData } from './hooks';

const ColumsWrapper = styled.ul`
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

    margin: 0;
    padding: 0 10px;
`;

const Column = styled.li`
    list-style:none;
    min-width: 200px;
    background: red;
    min-height: 200px;
    padding: 5px;
`;

const Board = ({ match }) => {
    const handleOnDragstart = (ev) => {
        const id = ev.currentTarget.getAttribute('id');

        ev.dataTransfer.setData('taskId', id);
        ev.dataTransfer.dropEffect = "move";
    }

    const handleOnDragOver = (ev) => {
        ev.preventDefault();
        ev.currentTarget.style.backgroundColor = 'green';
    }

    const handleOnDragLeave = (ev) => {
        ev.preventDefault();
        ev.currentTarget.style.backgroundColor = 'red';
    }

    const handleOnDrop = (ev) => {
        ev.preventDefault();
        const taskId = ev.dataTransfer.getData('taskId');

        console.warn('ON DROP', taskId);
        ev.target.appendChild(document.getElementById(taskId));
    }

    const { data, isLoading } = useFetchBoardData(match.params.projectId);

    return isLoading
        ? <div> loading ...</div>
        : <section>
            <ColumsWrapper>
                {data.map((board) => {
                    return (
                        <Column
                            id={board.column._id}
                            key={board.column._id}
                            onDrop={handleOnDrop}
                            onDragOver={handleOnDragOver}
                            onDragLeave={handleOnDragLeave}
                        >
                            <header>{board.column.title}</header>
                            {board.tasks.map(task => <Task
                                key={task._id}
                                id={task._id}
                                data={task}
                                onDragStart={handleOnDragstart}
                            />)}
                        </Column>
                    );
                })}
            </ColumsWrapper>
        </section>
}

export default Board;