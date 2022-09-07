import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config'

const firstAccountPrivateKey = <string>process.env.FIRST_ACCOUNT_PRIVATE_KEY;
const secondAccountPrivateKey = <string>process.env.SECOND_ACCOUNT_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      accounts: [
        { privateKey: firstAccountPrivateKey, balance: "10000000000000000000000" },
        { privateKey: secondAccountPrivateKey, balance: "10000000000000000000000" }
      ]
    }
  }
};

export default config;
