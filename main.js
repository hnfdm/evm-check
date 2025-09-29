const fs = require('fs');
const path = require('path');
const { ethers } = require('ethers');
const chain = require(path.join(__dirname, 'chainmulti.js'));

const walletsPath = path.join(__dirname, 'wallets.json');
let wallets;
try {
  wallets = JSON.parse(fs.readFileSync(walletsPath, 'utf8'));
} catch (error) {
  console.error("Error reading wallets.json:", error);
  process.exit(1);
}

const provider0 = new ethers.providers.JsonRpcProvider(chain.RPC_URL0, chain.CHAIN_ID0);
//const provider1 = new ethers.providers.JsonRpcProvider(chain.RPC_URL1, chain.CHAIN_ID1);
//const provider2 = new ethers.providers.JsonRpcProvider(chain.RPC_URL2, chain.CHAIN_ID2);
//const provider3 = new ethers.providers.JsonRpcProvider(chain.RPC_URL3, chain.CHAIN_ID3);
//const provider4 = new ethers.providers.JsonRpcProvider(chain.RPC_URL4, chain.CHAIN_ID4);
//const provider5 = new ethers.providers.JsonRpcProvider(chain.RPC_URL5, chain.CHAIN_ID5);
const provider6 = new ethers.providers.JsonRpcProvider(chain.RPC_URL6, chain.CHAIN_ID6);
const provider7 = new ethers.providers.JsonRpcProvider(chain.RPC_URL7, chain.CHAIN_ID7);

// Array of providers and their corresponding chain symbols
const providers = [
  { provider: provider0, symbol: chain.SYMBOL0 },
  { provider: provider1, symbol: chain.SYMBOL1 },
  { provider: provider2, symbol: chain.SYMBOL2 },
  { provider: provider3, symbol: chain.SYMBOL3 },
  { provider: provider4, symbol: chain.SYMBOL4 },
  { provider: provider5, symbol: chain.SYMBOL5 },
  { provider: provider6, symbol: chain.SYMBOL6 },
  { provider: provider7, symbol: chain.SYMBOL7 },
];

async function checkBalances() {
  for (const wallet of wallets) {
    console.log(`Checking balances for wallet: ${wallet.address}`);
    for (const { provider, symbol } of providers) {
      try {
        const balance = await provider.getBalance(wallet.address);
        const formattedBalance = Number(ethers.utils.formatEther(balance)).toFixed(2);
        console.log(
          `💰 Wallet - [${wallet.address}] has a balance of [${formattedBalance} ${symbol}]`
        );
      } catch (error) {
        console.error(
          `Error getting balance for wallet ${wallet.address} on chain ${provider.network.chainId}:`,
          error
        );
      }
    }
  }
}

checkBalances();
