const express = require('express');
const router = express.Router();

const Tasks = require('../../models/Task');
const Column = require('../../models/Column');
const Project = require('../../models/Project');

const { authenticateJWT } = require('../../utils');

router.get('/', authenticateJWT, async (req, res) => {
    const companies = await Project.find();

    res.status(200).json(companies);
});



router.get('/:id/board', authenticateJWT, async (req, res) => {
    const projectId = req.params.id;
    const columns = await Column.find({ projectId });

    const data =  await Promise.all(
        [...columns.map(async (column) => {
            const unsortedTasks = await Tasks.find({ projectId, columnId: column._id });
            const headTask = unsortedTasks.find(task => task.after === null)
            const sortedTasks = [];
            
            if (headTask) {
                sortedTasks.push(headTask);

                for (let i = 0; i < unsortedTasks.length; i++) {
                    const nextTask = unsortedTasks.find((task => task._id === sortedTasks[i]));
                    sortedTasks.push(nextTask);
                }
            }

            console.warn('unsortedTasks', unsortedTasks);
            if (unsortedTasks.length) {
                console.log('after', unsortedTasks[0].after);
            }
            console.warn('headTask', headTask);
            
            return {
                column, 
                tasks: sortedTasks,
            };
        })]
    );

    res.status(200).json(data);
});

module.exports = router;