'use strict'
const R = require('ramda');
const hl = require('hledger');

const loadEntries = async (file) => hl.tableize(await hl(['-f', file, 'print']));

const groupByTransactions = R.compose(
  Object.values,
  R.groupBy((txn) => Number(txn.txnidx) - 1)
)

const generateRawTransaction = R.reduce((a, b) => {
  const entryAsString = `  ${b.account}  ${b.commodity}${b.amount}`;
  return R.isNil(a) 
    ? `${b.date} ${b.description}\n  ${entryAsString}` 
    : `${a}\n  ${entryAsString}`;
}, null);

const addRawTransactionToTransactionMap = R.map((txns) => (
  {
    txns,
    raw: generateRawTransaction(txns)
  }
));

const loadAndNormalizeEntries = async (file) => R.compose(
  addRawTransactionToTransactionMap,
  groupByTransactions
)(await loadEntries(file))

module.exports = {
  loadEntries,
  loadAndNormalizeEntries
};
