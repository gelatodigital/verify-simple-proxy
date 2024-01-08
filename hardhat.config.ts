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

    unreal: {
      url: "https://rpc.unreal.gelato.digital",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },

  etherscan: {
    apiKey: {
      zkatana: "XXXX",
      unreal: "XXXX",
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
      {
        network: "unreal",
        chainId: 18231,
        urls: {
          apiURL: "https://unreal.blockscout.com/api",
          browserURL: "https://unreal.blockscout.com",
        },
      },
    ],
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true,
  },
};

export default config;
