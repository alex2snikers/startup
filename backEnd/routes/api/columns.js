const express = require('express');
const router = express.Router();

const Columns = require('../../models/Columns');
const { authenticateJWT } = require('../../utils');

router.get('/', authenticateJWT, async (req, res) => {
    const projectId = req.query.projectId;
    
    const columns = await Columns.find({ projectId });

    res.status(200).json(columns);
});

module.exports = router;