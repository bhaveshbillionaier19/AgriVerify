// const Web3 = require('web3');
// console.log('Web3 version:', Web3.version);
// const { abi, evm } = require('C:/Users/HP/Desktop/Unidao block chain/week 3 UniDao test/artifacts/contracts/certificate.sol/CropCertification.json'); // Path to your contract's ABI and bytecode

// // Connect to Ganache
// const web3 = new Web3('HTTP://127.0.0.1:7545'); // Ganache's RPC URL

// async function main() {
//   // Step 1: Get accounts from Ganache
//   const accounts = await web3.eth.getAccounts();

//   // Step 2: Create a contract instance
//   const certificateContract = new web3.eth.Contract(abi);

//   // Step 3: Deploy the contract
//   const deployedContract = await certificateContract.deploy({
//     data: evm.bytecode.object, // Bytecode of your contract
//   })
//   .send({
//     from: accounts[0], // Use the first account from Ganache
//     gas: 1500000, // Set a reasonable gas limit
//     gasPrice: '30000000000', // Adjust gas price as needed
//   });

//   // Step 4: Log the deployed contract address
//   console.log("Deployed contract address:", deployedContract.options.address);
// }

// // Run the main function and catch errors
// main()
//   .then(() => process.exit(0)) // Exit the process with success
//   .catch((error) => {
//     console.error(error); // Log any error
//     process.exit(1); // Exit with failure
//   });

// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("CertificateModule", (m) => {
  

  const certificate = m.contract("CropCertification");
  console.log("Deployed contract address:",`${certificate.address}`);
  return { certificate };
  

 
});
//0xc75419DdCa7c5277402Fa114A5478b85ffF4ad79
















// const hre = require("hardhat");

// async function main() {
//   // Step 1: Get the contract factory for your contract
//   const Certificate = await hre.ethers.getContractFactory("CropCertification");

//   // Step 2: Deploy the contract
//   const certificate = await Certificate.deploy(); // Deploy contract

//   // Step 3: Wait for the contract to be deployed
//   //await certificate.deployed(); // This waits for the contract to be mined

//   // Step 4: Log the deployed contract address
//   console.log("Deployed contract address:", certificate.address);
// }

// // Run the main function and catch errors
// main()
//   .then(() => process.exit(0)) // Exit the process with success
//   .catch((error) => {
//     console.error(error); // Log any error
//     process.exit(1); // Exit with failure
//   });






















// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


// module.exports = buildModule("CertificateModule", (m) => {
// const certificate = m.contract("CropCertification");
// console.log("Deployed contract address:",`${certificate.address}`);
// return { certificate };
  
// });
//0x5FbDB2315678afecb367f032d93F642f64180aa






// async function main() {
//   const Certificate = await ethers.getContractFactory("CropCertification"); // Replace with your contract name
//   const certificate = await Certificate.deploy(); // Deploy contract
  

//   console.log("Deployed contract address:", certificate.address); // Log contract address
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
