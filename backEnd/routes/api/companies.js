const express = require('express');
const router = express.Router();

const Company = require('models/Company');
const { authenticateJWT } = require('utils');

router.get('/api/companies', authenticateJWT, async (req, res) => {
    const companies = await Company.find({});

    return companies;
});