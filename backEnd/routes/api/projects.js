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
            const tasks = await Tasks.find({ projectId, columnId: column._id });

            return {
                column, 
                tasks,
            };
        })]
    );

    res.status(200).json(data);
});

module.exports = router;