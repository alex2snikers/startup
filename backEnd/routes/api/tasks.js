const express = require('express');
const router = express.Router();

const Task = require('../../models/Task');
const { authenticateJWT } = require('../../utils');

router.put('/:id', authenticateJWT, async (req, res) => {
    const taskId = req.params.id;
    
    await Task.updateOne({ _id: taskId}, {
        position: req.body.position,
    })

    res.status(200).json({});
});

module.exports = router;
