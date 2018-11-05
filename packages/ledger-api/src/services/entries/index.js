'use strict';
const hl = require('hledger');
const moment = require('moment');
const path = require('path');
const { appendFile } = require('graceful-fs');
const { promisify } = require('util');
const afp = promisify(appendFile);
const R = require('ramda');

const { loadAndNormalizeEntries } = require('./util');

const file = path.resolve('2018.ledger');

const listEntries = async (req, res) => {
  const data = await loadAndNormalizeEntries(file);
  return res.json(data);
};

const getEntriesById = async ({params: { id }}, res) => {
  const data = await loadAndNormalizeEntries(file);
  
  return res.json(data[id]);
};

const createEntry = async ({
  body: {
    date = moment().format('MM/DD'),
    description = moment().format(),
    source,
    destination,
    amount
  } 
}, res) => {
  const entryStr = `\n${date} ${description}\n  ${destination}  \$${amount}\n  ${source}\n`

  await afp(file, entryStr);
  const data = await loadAndNormalizeEntries(file);
  const entry = R.nth(-1, data);
  return res.json(entry);
};

const updateEntryById = (req, res) => {};

const deleteEntry = (req, res) => {};

module.exports = {
  listEntries,
  getEntriesById,
  createEntry
}
