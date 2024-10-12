// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CropCertification {

    struct Crop {
        string cropType;
        uint256 quantity;
        address farmer;
        bool isCertified;
    }

    Crop[] public crops;

    event CropSubmitted(
        uint256 cropId,
        string cropType,
        uint256 quantity,
        address indexed farmer,
        bool isCertified
    );

    function submitCrop(string memory _cropType, uint256 _quantity) public {
        crops.push(Crop({
            cropType: _cropType,
            quantity: _quantity,
            farmer: msg.sender,
            isCertified: true
        }));

        uint256 cropId = crops.length - 1;
        emit CropSubmitted(cropId, _cropType, _quantity, msg.sender, true);
    }

    function getCrop(uint256 _cropId) public view returns (string memory, uint256, address, bool) {
        require(_cropId < crops.length, "Crop ID out of range");
        Crop storage crop = crops[_cropId];
        return (crop.cropType, crop.quantity, crop.farmer, crop.isCertified);
    }

    function getTotalCrops() public view returns (uint256) {
        return crops.length;
    }
}
