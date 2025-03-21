# Crop Certification System

## Overview

The **Crop Certification System** is a decentralized application (dApp) that allows farmers to submit their crops for certification on the blockchain. By leveraging smart contracts, this application ensures transparency and security in the crop certification process. Farmers can easily connect their MetaMask wallets, submit crop details, and receive a unique QR code for certification.

## Features

- **MetaMask Integration**: Allows users to connect their Ethereum wallets to interact with the smart contract.
- **Crop Submission**: Farmers can submit crop details, including type and quantity, which are stored on the blockchain.
- **QR Code Generation**: Upon successful crop submission, a QR code is generated for certification, which links to the crop details.
- **View Certification Details**: Users can view certification details by navigating to a dedicated page using the crop ID.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Web3.js**: A library to interact with the Ethereum blockchain.
- **Ethereum Smart Contracts**: The core functionality is powered by smart contracts that handle crop submissions and storage.
- **MetaMask**: A cryptocurrency wallet that allows users to manage their Ethereum accounts and interact with the blockchain.
- **React Router**: For navigation and routing within the application.
- **QRCode React**: A React component for generating QR codes.

## How its working:

- First, we deploy the smart contract by compiling it on the Ganache test network, configuring the hardhat.config.js file to connect to the Ganache network. After deployment, we obtain the contract's JSON file and extract the ABI, which we then integrate into our main application file to enable interaction with the contract's functions.

- Using Web3.js, we establish a connection between the frontend and the smart contract. Once users log in through their MetaMask wallets, they can input the crop name and quantity, which will be sent to the blockchain via the defined smart contract function.

- Upon successful submission, a QR code is generated along with a link that users can either scan or click. This action redirects them to the certification page, where we retrieve and display the certification details of the crops from the blockchain.


[Watch the video](https://youtu.be/xOWlkgG9veg)


## References
- https://hardhat.org/hardhat-runner/docs/getting-started#overview
- https://stackoverflow.com/
- https://github.com/kshitijofficial/coffeDapp (refer this project for installation)







































## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/crop-certification-system.git

2. **Navigate to the project directory:**:
   ```bash
   cd crop-certification-system

3. **Install dependencies:**:
   ```bash
   npm install

4. **Run the application**:
   ```bash
   npm run dev

## Since the smart contract is deployed on the Ganache test network, it will function as long as the Ganache network is running on the user's local system. To see the application in action, please refer to the accompanying video that demonstrates its functionality alongside the README file for detailed instructions.  
   
