'use strict';
const hl = require('hledger');
const path = require('path');
const _ = require('lodash');

const file = path.resolve('2018.ledger');

const listEntries = async (req, res) => {
  const data = hl.tableize(await hl(['-f', file, 'print']));
  return res.json(data);
};

const getEntryById = (req, res) => {};

const createEntry = (req, res) => {};

const updateEntryById = (req, res) => {};

const deleteEntry = (req, res) => {};

module.exports = {
  listEntries
}
