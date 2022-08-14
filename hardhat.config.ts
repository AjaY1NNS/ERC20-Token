import { HardhatUserConfig,task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    binance_testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      blockGasLimit: 100000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: 10,
      },
    },
    cronos_testnet: {
      url: "https://evm-t3.cronos.org",
      blockGasLimit: 100000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: 10,
      },
    },
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: 10,
      },
    },
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;