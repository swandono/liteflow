import { Client } from 'pg';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
require('dotenv').config();

const web3 = createAlchemyWeb3(
  `wss://eth-mainnet.g.alchemy.com/v2/HEqcQYalI7PIKXhJ77PLDKtQ5YvRyKsk`
);

const saleTopic =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
const nftContractAddress = '0x82Cb9D20862641301C987f0b096086d32bC11B65';

const configData = {
  address: nftContractAddress,
  topics: [saleTopic]
};

const client = new Client();

client.connect();

web3.eth.subscribe('logs', configData).on('data', (data: any) => {
  web3.eth.getTransactionReceipt(data.transactionHash).then(function (data) {
    let logs = data.logs;
    if (web3.utils.hexToNumber(logs[0].topics[3])) {
      // console.log(web3.eth.abi.decodeParameter("address", logs[0].topics[1]));
      // console.log(web3.eth.abi.decodeParameter("address", logs[0].topics[2]));
      // console.log(web3.utils.hexToNumber(logs[0].topics[3]));
      store(
        data.transactionHash,
        web3.eth.abi.decodeParameter('address', logs[0].topics[1]),
        web3.eth.abi.decodeParameter('address', logs[0].topics[2]),
        web3.utils.hexToNumber(logs[0].topics[3]),
        data.contractAddress,
        1,
        0
      );
    }
  });
  // web3.eth.ens.isApprovedForAll(data.transactionHash).then(function (data) {});
});

const store = async (
  trans_hash: any,
  seller_address: any,
  buyer_address: any,
  tokenId: any,
  collectionId: any,
  quantity: any,
  amount: any
) => {
  const data = await client.query(
    `INSERT INTO Sale (trans_hash, seller_address, buyer_address, tokenId, collectionId, quantity, amount) VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [
      trans_hash,
      seller_address,
      buyer_address,
      tokenId,
      collectionId,
      quantity,
      amount
    ]
  );
  // console.log('[data]',data);
};
