const express = require('express');
const router = express.Router();

const Project = require('../../models/Project');
const { authenticateJWT } = require('../../utils');

router.get('/', authenticateJWT, async (req, res) => {
    const companies = await Project.find();

    res.status(200).json(companies);
});

module.exports = router;