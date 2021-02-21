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
    height: 200px;
`;

const Board = ({ match }) => {
    const { data, isLoading } = useFetchBoardData(match.params.projectId);

    return isLoading
        ? <div> loading ...</div>
        : <section>
            <ColumsWrapper>
                {data.map((board) => {
                    return (
                        <Column key={board.column._id}>
                            <header>{board.column.title}</header>
                            {board.tasks.map(task => <Task key={task._id} data={task} />)}
                        </Column>
                    );
                })}
            </ColumsWrapper>
        </section>
}

export default Board;