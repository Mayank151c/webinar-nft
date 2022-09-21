// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';


contract HexEventRegistration is  ERC721URIStorage,ReentrancyGuard  {
      using Counters for Counters.Counter;
      Counters.Counter private _tokenIds;
      //Counters.Counter private _itemsSold;

        address payable owner;
        uint256 listingPrice = 0.00001 ether;

        struct RegNft {
            uint256 tokenId;
            address payable seller;
            string gmail;
            string name;
            string organisation;
            string designation;
        }

        mapping(uint256 => RegNft) private idToRegNft;

        event RegNftCreatyed(
            uint256 indexed tokenId,
            address seller,
            string gmail,
            string name,
            string organisation,
            string designation
        );

        // REG Mayank - give correct Token name
        constructor() ERC721('REG-hexNft', 'hexNFT') {
            owner = payable(msg.sender);
        }

        // REG - Mayank
        /* Mints a token and lists it in the marketplace */
        function createHexRegToken(string memory tokenURI,string memory gmail,string memory name,string memory organisation,string memory designation) public payable returns (uint256){
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();

            _mint(msg.sender, newTokenId);
            _setTokenURI(newTokenId, tokenURI);
            createHexRegNft(newTokenId,gmail,name,organisation,designation);
            return newTokenId;
        }

        // REG Vishal
        function createHexRegNft(uint256 tokenId,string memory gmail,string memory name,string memory organisation,string memory designation) private {
            // require(price > 0, 'Price must be at least 1 wei');
            // require(msg.value == listingPrice, 'Price must be equal to listing price');

            idToRegNft[tokenId] = RegNft(
            tokenId,
            payable(msg.sender),
            // payable(address(this)),
            gmail,
            name,
            organisation,
            designation
            );

            _transfer(msg.sender, address(this), tokenId);
            emit RegNftCreatyed(tokenId, msg.sender,gmail,name,organisation,designation);
        }

        function getParticipentsCount() public view returns (uint256){
            uint256 itemCount = _tokenIds.current();
            return itemCount;
        }

}