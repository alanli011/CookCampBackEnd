const express = require('express');
const { asyncHandler, handleValidationErrors } = require('../utils/utils');
const bcrypt = require('bcryptjs');
const { User, Project } = require('../db/models');
const { requireAuth } = require('../utils/auth.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//validate Password
const router = express.Router();

module.exports = router;
