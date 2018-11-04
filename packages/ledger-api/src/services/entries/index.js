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
  const entry = `\n${date} ${description}\n  ${destination}  \$${amount}\n  ${source}\n`

  await afp(file, entry);
  const data = hl.tableize(await hl(['-f', file, 'print']));
  const { txnidx: latestID }= R.takeLast(1, data)[0];
  const entries = R.filter(R.propEq('txnidx', latestID))(data);
  return res.json({ entries });
};

const updateEntryById = (req, res) => {};

const deleteEntry = (req, res) => {};

module.exports = {
  listEntries,
  getEntriesById,
  createEntry
}
