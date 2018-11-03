'use strict'
const R = require('ramda');
const hl = require('hledger');


const loadEntries = async (file) => {
  return hl.tableize(await hl(['-f', file, 'print']));  
};

const normalizeTransactions = async (txns) => {
  const resolvedTxns = await txns;
  return R.groupBy((txn) => txn.txnidx)(resolvedTxns);
};

module.exports = {
  loadEntries,
  normalizeTransactions
};
