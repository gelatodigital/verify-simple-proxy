import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

// Process Env Variables
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.19",

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },

  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      forking: {
        url: `https://rpc.zkatana.gelato.digital`,
        blockNumber: 80000,
      },
    },

    zKatana: {
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 1261120,
      url: `https://rpc.zkatana.gelato.digital`,
    },
  },

  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
  etherscan: {
    apiKey: {
      zkatana: "ETHERSCAN_KEY",
    },
    customChains: [
      {
        network: "zkatana",
        chainId: 1261120,
        urls: {
          apiURL: "<API URL of zKatana's block explorer>",
          browserURL: "<Browser URL of zKatana's block explorer>",
        },
      },
    ],
  },
};

export default config;
