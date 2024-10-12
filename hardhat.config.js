// require("@nomicfoundation/hardhat-toolbox");

// module.exports = {
//   solidity: "0.8.27", // Solidity version
//   networks: {
//     hardhat: {
//       chainId: 31337, // Hardhat default Chain ID
//     },
//     localhost: {
//       url: "http://127.0.0.1:8545", // Localhost for Hardhat node
//       chainId: 31337, // Chain ID for Hardhat Network
//     },
//   },
// };
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.18", // or your preferred Solidity version
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545", // Ganache local blockchain URL
      accounts: [
        // Use the private keys from Ganache accounts, OR simply use mnemonic from Ganache if needed.
        "0xd96f78e5a1cd4cc34eb9af6cd673548945e1c442f73608bf8aa9693ddfd87b0d",
        
        // Add more keys if needed
      ],
      gasPrice: 20000000000, // Adjust gas price if necessary
      chainId: 1337 // Make sure it matches Ganache's chainId
    }
  }
};