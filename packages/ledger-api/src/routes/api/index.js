'use strict';

const express = require('express');
const entriesController = require('./entries');
const accountsController = require('./accounts');
const reportsController = require('./reports');

let router = express.Router();

router.use(['/entry', '/entries'], entriesController);
router.use(['/account', '/accounts'], accountsController);
router.use(['/report', '/reports'], reportsController);

module.exports = router;
