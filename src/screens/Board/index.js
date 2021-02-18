import React from 'react';

import { useFetchBoardData } from './hooks';

const Board = ({ match }) => {
    const boardData = useFetchBoardData(match.params.projectId);

console.warn(boardData);


    return (
        <div>hello</div>
    );
}

export default Board;