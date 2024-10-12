// if (typeof global === 'undefined') {
//   window.global = window; // Polyfill for global in browsers
// }

import './App.css';
//import abi from "./contractJson/CropCertification.json";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css'
import QRCode from 'react-qr-code';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
//import * as PushAPI from '@pushprotocol/restapi';



const contractAddress = '0xc75419DdCa7c5277402Fa114A5478b85ffF4ad79'; // Replace with your contract address
const contractABI =  [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "cropId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "cropType",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "farmer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isCertified",
          "type": "bool"
        }
      ],
      "name": "CropSubmitted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "crops",
      "outputs": [
        {
          "internalType": "string",
          "name": "cropType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "farmer",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isCertified",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cropId",
          "type": "uint256"
        }
      ],
      "name": "getCrop",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalCrops",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_cropType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "submitCrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  
const MainPage = () => {
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  //const navigate = useNavigate();

  const checkMetaMaskConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setIsMetaMaskConnected(true);
          setUserAddress(accounts[0]);
         
          // Check if the page has already reloaded
        
        // if (hasReloaded==false) {
        //   // Set a flag to avoid continuous reloading
        //   localStorage.setItem('hasReloaded', 'true');
        //   window.location.reload();
        //   hasReload=true; // Reload the page once
        
        // }
        
      } else {
          setIsMetaMaskConnected(false);
          setErrorMessage('Please connect your MetaMask wallet.');
        }
      } catch (error) {
        
        
         setIsMetaMaskConnected(false);
        // setErrorMessage('');
      
      
      }
    } else {
      setIsMetaMaskConnected(false);
      setErrorMessage('MetaMask is not installed. Please install MetaMask to continue.');
    }
  };
 
 
  useEffect(() => {
    checkMetaMaskConnection();
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setUserAddress(accounts[0]);
        window.location.reload();
      } else {
        setIsMetaMaskConnected(false);
        setErrorMessage('Please connect your MetaMask wallet.');
      }
    };
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const handleSubmitCrop = async () => {
    if (!isMetaMaskConnected) {
      alert('Please connect MetaMask to submit the crop.');
      return;
    }

  //   try {
      
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     console.log('Provider initialized:', provider);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(contractAddress, contractABI, signer);
 
  //     const tx = await contract.submitCrop(cropType, quantity);
  //     await tx.wait();

  //     const totalCrops = await contract.getTotalCrops();
  //     const newCropId = totalCrops - 1;
  //     console.log(tx)
  //     // const url = `${window.location.origin}/certification/${newCropId}`;
  //     // setQrCodeData(url);
  //     // navigate(`/certification/${newCropId}`);
  //   } catch (error) {
  //     console.error('Error submitting crop:', error);
  //     alert('Failed to submit the crop. Please try again.');
  //   }
  // };
  
  try {
    // Initialize Web3 and MetaMask provider
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      console.log('Web3 provider initialized:', web3);

      // Get the accounts connected with MetaMask
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];
      console.log('Connected account:', userAddress);

      // Get contract instance
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log(contract)

      // Submit crop to the contract
      const bigIntQuantity = BigInt(quantity);
      const tx = await contract.methods.submitCrop(cropType, quantity).send({
          

        
        from: userAddress, // The user's connected MetaMask account
        gas: await contract.methods.submitCrop(cropType, bigIntQuantity).estimateGas({ from: userAddress }), // Estimate gas for the transaction
      });

      console.log('Transaction:', tx);

      // Get the total crops from the contract after submission
      const totalCrops = await contract.methods.getTotalCrops().call();
      console.log(totalCrops)
      const newCropId = totalCrops - BigInt(1);  // Get the newly added crop ID
      
      console.log('New Crop ID:', newCropId);


      // If needed, you can set a URL for QR code generation here
       const url = `${window.location.origin}/certification/${newCropId}`;
       setQrCodeData(url);
       //navigate(`/certification/${newCropId}`);
    } else {
      console.error('MetaMask not detected. Please install MetaMask.');
    }
  } catch (error) {
    console.error('Error submitting crop:', error);
    alert('Failed to submit the crop. Please try again.');
  }
  };

  return (
    <div className="main-container">
           
            <div className="shape shape1"></div>
            <div className="shape shape2"></div>

            <h1 className="main-title" >Welcome to the Crop Certification System</h1>
            {errorMessage && <h2 className="error">{errorMessage}</h2>}

            {isMetaMaskConnected ? (
                <div className="welcome-container">
                    <h2 className="welcome-text">Welcome, Farmer {userAddress && userAddress.slice(0, 6)}...</h2>
                    <p className="submit-prompt">Submit your crop for certification.</p>

                    <div className="input-container">
                        <label className="input-label"><h3>Crop Type:</h3></label>
                        <input
                            type="text"
                            value={cropType}
                            onChange={(e) => setCropType(e.target.value)}
                            className="crop-input"
                        />

                        <label className="input-label"><h3>Quantity (in kg):</h3></label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="quantity-input"
                        />

                        <button onClick={handleSubmitCrop} className="submit-button">Submit Crop</button>
                    </div>

                    {qrCodeData && (
                        <div className="qr-container">
                            <h2 className="qr-title">Crop Submitted! Certification QR Code:</h2>
                            <QRCode value={qrCodeData} className="qr-code" />
                            <p>
                                <a href={qrCodeData} target="_blank" rel="noopener noreferrer" className="qr-link">
                                    <h4>{qrCodeData}</h4>
                                </a>
                            </p>
                            <p className="qr-instructions"><h4>Scan the QR code or click the link to view certification details!</h4></p>
                        </div>
                    )}
                </div>
            ) : (
                <p className="meta-mask-prompt">Please connect your MetaMask wallet to proceed.</p>
            )}
        </div>
    );
};



const CertificationPage = () => {
  const { cropId } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [cropType,setCropType] = useState(null);
  const [quantity,setquantity] = useState(null);
  const [farmer,setfarmer] = useState(null);
  const [isCertified,setisCertified] = useState(null);
                  

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          const details = await contract.methods.getCrop(cropId).call();
  
          setCropType(details[0]);
          setquantity(details[1]);
          setfarmer(details[2]);
          setisCertified(details[3]);
  
          // If the crop is certified, send a push notification
          // if (details[3]) {
          //   await sendPushNotification(details[2], cropId);
          // }
        } else {
          setErrorMessage('MetaMask is not installed.');
        }
      } catch (error) {
        console.error('Error fetching crop details:', error);
        setErrorMessage('Failed to fetch crop details. Please try again.');
      }
    };
  
    fetchCropDetails();
  }, [cropId]);

  // if (!cropDetails) {
  //     return <div>Loading...</div>;
  // }

 // const [cropType, quantity, farmer, isCertified] = cropDetails;
  // let cropType, quantity, farmer, isCertified;

  // Ensure details is not null or undefined and has the expected length
  // if (Array.isArray(cropDetails) && cropDetails.length === 4) {
  //     [cropType, quantity, farmer, isCertified] = cropDetails;
  // } else {
  //     return <div>Error: Invalid crop details format.</div>;
  // }
  
  // const sendPushNotification = async (farmerAddress, cropId) => {
  //   try {
      
      
  //     const pushSDKConfig = {
  //       env: 'staging', // Use 'prod' for production or 'staging' for testing
  //       blockchain: 'eip155', // Ethereum's chain ID format
  //       networkId: 1337, // For Ganache local blockchain (adjust for other networks)
  //     };
      
  //     if (!farmerAddress || typeof farmerAddress !== 'string') {
  //       throw new Error('Invalid farmer address');
  //     } 
  //     const formattedFarmerAddress = ethers.utils.getAddress(farmerAddress);
  //     // Create ethers provider and signer
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
      
  //     console.log('Notification Configuration:', {
  //       signer: signer,
  //       farmerAddress: formattedFarmerAddress,
  //       recipients: `eip155:${pushSDKConfig.networkId}:${formattedFarmerAddress}`,
  //       channel: `eip155:${pushSDKConfig.networkId}:0xF5724a3B83B73cC3eF695Ebf0a0a4597e5Ae9Bda`,
  //       env: pushSDKConfig.env,
  //     });




  //     const response = await PushAPI.payloads.sendNotification({
  //       signer: signer, // Use the ethers.js signer
  //       type: 1, // Broadcast notification
  //       identityType: 2, // Wallet address identity type
  //       notification: {
  //         title: 'Crop Certified!',
  //         body: `Your crop with ID ${cropId} has been certified.`,
  //       },
  //       payload: {
  //         title: 'Crop Certification Complete',
  //         body: `Your crop with ID ${cropId} has been successfully certified.`,
  //         cta: '', 
  //         img: '', 
  //       },
  //       recipients: `eip155:${pushSDKConfig.networkId}:${formattedFarmerAddress}`, //to whom i am sendinf
  //       channel: 'eip155:1337:0xF5724a3B83B73cC3eF695Ebf0a0a4597e5Ae9Bda', // channel
  //       env: 'pushSDKConfig.env', 
  //     });

  //     console.log('Notification sent:', response);
  //   } catch (error) {
  //     console.error('Error sending notification:', error);
  //   }
  // };


  return (
    <div className="certification-container">
            <h2>Crop Certification Details for Crop ID: {cropId}</h2>
            {errorMessage ? (
                <p className="error">{errorMessage}</p> // Added class for error styling
            ) : (
                <>
                    <p>Crop Type: {cropType}</p>
                    <p>Quantity: {Number(quantity)}</p>
                    <p>Farmer Address: {farmer}</p>
                    <p>Is Certified: {isCertified ? 'Yes' : 'No'}</p>
                </>
            )}
        </div>
    );
};

// const subscribeToNotifications = () => {
//     return (
//       <div>
//         <h2>Subscribe to Crop Notifications</h2>
//         <PushNotification
//           address={userAddress} // Farmer's wallet address
//           optIn={true} // Opt-in the farmer for notifications
//         />
//       </div>
//     );
//   };

// const CertificationPage = () => {
//   const { cropId } = useParams();

//   return (
//     <div>
//       <h2>Crop Certification Details for Crop ID: {cropId}</h2>
//       <p>Crop certification details will be fetched from the blockchain here.</p>
//     </div>
//   );
// };

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/certification/:cropId" element={<CertificationPage />} />
    </Routes>
  </Router>
);

export default App;


