import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import styles from './styles.m.scss';

import Task from 'containers/Task';

import { useFetchBoardData, useUpdateTaskMutation } from './hooks';

const ColumsWrapper = styled.ul`
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

    margin: 0;
    padding: 0 10px;
`;

const Column = styled.li`
    display: grid;
    grid-row-gap: 10px;
    grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));

    list-style:none;
    min-width: 200px;
    background: red;
    min-height: 200px;
    padding: 5px;
`;

// const Board = ({ match }) => {
//     const handleOnDragstart = (ev) => {
//         const id = ev.currentTarget.getAttribute('id');

//         ev.dataTransfer.setData('taskId', id);
//         ev.dataTransfer.dropEffect = "move";
//     }

//     const handleOnDragOver = (ev) => {
//         ev.preventDefault();
//         ev.currentTarget.style.backgroundColor = 'green';
//     }

//     const handleOnDragLeave = (ev) => {
//         ev.preventDefault();
//         ev.currentTarget.style.backgroundColor = 'red';
//     }

//     const handleOnDrop = (ev) => {
//         console.warn('ev.currentTarget', ev.currentTarget);
        
//         ev.preventDefault();
//         ev.stopPropagation();
//         const taskId = ev.dataTransfer.getData('taskId');

//         console.warn('ON DROP', taskId);
//         ev.currentTarget.appendChild(document.getElementById(taskId));
//     }

//     const { data, isLoading } = useFetchBoardData(match.params.projectId);

//     return isLoading
//         ? <div> loading ...</div>
//         : <section>
//             <ColumsWrapper>
//                 {data.map((board) => {
//                     return (
//                         <DragDropContext
//                             id={board.column._id}
//                             key={board.column._id}
//                             onDrop={handleOnDrop}
//                             onDragOver={handleOnDragOver}
//                             onDragLeave={handleOnDragLeave}
//                         >
//                             {/* <header>{board.column.title}</header> */}
//                             {board.tasks.map(task => <Task
//                                 key={task._id}
//                                 id={task._id}
//                                 data={task}
//                                 onDragStart={handleOnDragstart}
//                             />)}
//                         </DragDropContext>
//                     );
//                 })}
//             </ColumsWrapper>
//         </section>
// }


const Board = ({ match }) => {
    const { mutate: updateTask } = useUpdateTaskMutation();
    const { data, isLoading, ...props } = useFetchBoardData(match.params.projectId);

    const onBeforeCapture = (ev) => {
        console.log('onBeforeCapture', ev);
    };
    
    const onBeforeDragStart = (ev) => {
        console.log('onBeforeDragStart', ev);
    };
    
    const onDragStart = (ev) => {
        console.log('onDragStart', ev);
    };
    
    const onDragUpdate = (ev) => {
        console.log('onDragUpdate', ev);
    };
    
    const onDragEnd = (ev) => {
        const newPosition = ev.destination.index + 1;

        updateTask({
            id: ev.draggableId,
            position: newPosition,
            columnId: ev.source.droppableId,
            source: ev.source,
            destination: ev.destination,
        });

        console.log('onDragEnd', ev);
    };

    return isLoading
        ? <div> loading ...</div>
        : <section className={styles['board']}>
            <DragDropContext
                onBeforeCapture={onBeforeCapture}
                onBeforeDragStart={onBeforeDragStart}
                onDragStart={onDragStart}
                onDragUpdate={onDragUpdate}
                onDragEnd={onDragEnd}
            >
                {data.map((board) => (
                    <Droppable
                        key={board.column._id}
                        droppableId={board.column._id}
                    >
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                            {...provided.droppableProps}
                            >
                                {board.tasks.map((task, index) => <Task
                                    key={task._id}
                                    id={task._id}
                                    index={index}
                                    data={task}
                                />)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </section>
}

// {data.map((board) => {
//     return (
//         <Droppable
//             id={board.column._id}
//             key={board.column._id}
//         >
//             {/* <header>{board.column.title}</header> */}
//             {board.tasks.map(task => <Task
//                 key={task._id}
//                 id={task._id}
//                 data={task}
//                 // onDragStart={handleOnDragstart}
//             />)}
//         </Droppable>
//     );
// })}

export default Board;