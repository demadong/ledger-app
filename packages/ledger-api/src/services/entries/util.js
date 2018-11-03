'use strict'
const R = require('ramda');
const hl = require('hledger');


const loadEntries = async (file) => hl.tableize(await hl(['-f', file, 'print']));

const normalizeTransactions = async (txns) => {
  const groupByTransactions = R.groupBy((txn) => txn.txnidx);
  const generateRawTransaction = R.reduce((a, b) => {
    const entryAsString = `  ${b.account}  ${b.commodity}${b.amount}`;
    return R.isNil(a) ?
      `${b.date} ${b.description}\n  ${entryAsString}` :
      `${a}\n  ${entryAsString}`;
  }, null);
  const addRawTransactionToTransactionMap = R.map((txn) => (
    {
      transactions: txn,
      rawTransaction: generateRawTransaction(txn)
    }
  ));

  return R.compose(addRawTransactionToTransactionMap, groupByTransactions)(await txns);
}

module.exports = {
  loadEntries,
  normalizeTransactions
};
