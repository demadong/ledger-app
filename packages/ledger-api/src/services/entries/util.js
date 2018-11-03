'use strict'
const R = require('ramda');
const hl = require('hledger');


const loadEntries = async (file) => hl.tableize(await hl(['-f', file, 'print']));

const normalizeTransactions = async (txns) => R.groupBy((txn) => txn.txnidx)(await txns);

module.exports = {
  loadEntries,
  normalizeTransactions
};
