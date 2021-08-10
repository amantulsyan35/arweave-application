import Arweave from 'arweave';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

async function getWalletAddress(wallet) {
  return arweave.wallets.jwkToAddress(wallet);
}

async function getAddressBalance(key) {
  const balance = await arweave.wallets.getBalance(key);
  const convert = arweave.ar.winstonToAr(balance);
  return convert;
}

async function createDataTransaction(data, key) {
  let transform = JSON.stringify(data);
  let transaction = await arweave.createTransaction({ data: transform }, key);

  transaction.addTag('Application', 'arweave-confessions');

  return transaction;
}

async function signAndSubmitTransaction(transaction, key) {
  await arweave.transactions.sign(transaction, key);
  let response = await arweave.transactions.post(transaction);
  return response;
}

async function getTransactionData(id) {
  return await arweave.transactions.getData(id, { decode: true, string: true });
}

async function queryData(key) {
  let walletAddress = await getWalletAddress(key);
  walletAddress = walletAddress.toString();
  const txids = await arweave.arql({
    op: 'and',
    expr1: {
      op: 'equals',
      expr1: 'from',
      expr2: walletAddress,
    },
    expr2: {
      op: 'equals',
      expr1: 'Application',
      expr2: 'arweave-confessions',
    },
  });

  return txids;
}

export {
  getWalletAddress,
  getAddressBalance,
  createDataTransaction,
  signAndSubmitTransaction,
  getTransactionData,
  queryData,
};
