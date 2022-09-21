import { useState } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'

// check comment for git ***********************
//const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
//const client = ipfsHttpClient('https://hexnft.infura-ipfs.io:5001/api/v0')

import HexEventRegistration from '../contracts/ethereum-contracts/HexEventRegistration.json'
//import BoredPetsNFT from '../contracts/ethereum-contracts/BoredPetsNFT.json'

// new stuff
import axios from 'axios';
import { contractAddress,PINATA_KEY,PINATA_SECRET } from './config';


export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ gmail: '', name: '', organisation: '' , designation: '' })
  const router = useRouter()




   async function uploadToIPFS() {
    const { gmail, name, organisation, designation } = formInput
    if (!gmail || !name || !organisation || !designation ) {
      return
    } else {
      // first, upload metadata to IPFS
      const data = JSON.stringify({
        gmail, name, organisation, designation
      }) 
      try{
                    // const resFile = await axios({
                    //     method: "post",
                    //     url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    //     data: data,
                    //     headers:{
                    //         'pinata_api_key':PINATA_KEY,
                    //         'pinata_secret_api_key':PINATA_SECRET,
                    //         'Content-Type':'multipart/form-data'
                    //     },
                    // });
                    //const url = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                    //alert("url onChange "+ url);
                    //const ImageURL = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                    setFileUrl("https://gateway.pinata.cloud/ipfs/QmWyUTERPpKzY7tzA2iDzfzktNG8PSjj9PXZYU4Hx2jFB4");
                    return fileUrl;
            } //end of try
        catch (error) {
        console.log('Error uploading file: ', error)
        alert("Failure in uploadToIPFS -" + error)
      } 
    }
  }

  async function eventRegstration() {
    const web3Modal = new Web3Modal()
    //console.log("line 99  : " + web3Modal);
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const url = await uploadToIPFS()
    const networkId = await web3.eth.net.getId()
    // console.log("line 104  : " + networkId);
    const { gmail, name, organisation, designation } = formInput
    // console.log("line 106  : " + gmail + " " + name);
    // Mint the NFT
    const HexEventRegistrationContractAddress = HexEventRegistration.networks[networkId].address;
    // console.log("line 109  : " + HexEventRegistrationContractAddress);
    const HexEventRegistrationContract = new web3.eth.Contract(HexEventRegistration.abi, HexEventRegistrationContractAddress)
    // console.log("line 111  : " + HexEventRegistrationContract);
    const accounts = await web3.eth.getAccounts()
    // console.log("line 113  : " + accounts[0]);
    //const HexEventRegistrationContract = new web3.eth.Contract(HexEventRegistration.abi, HexEventRegistration.networks[networkId].address)
    //let listingFee = await HexEventRegistrationContract.methods.getListingFee().call()
    //listingFee = listingFee.toString()
    //alert("url line 69 - " + url)
    //alert("account used for listing " + accounts[0])
    // HexEventRegistration.methods.mint(url).send({ from: accounts[0] }).on('receipt', function (receipt) {
    //     console.log('minted');
    //     //List the NFT
    //     const tokenId = receipt.events.NFTMinted.returnValues[0];
    //     HexEventRegistrationContract.methods.createHexRegToken(tokenId, gmail,name,organisation, designation)
    //     .send({ from: accounts[0]}).on('receipt', function () {
    //             console.log('listed');
    //             router.push('/');
    //         });
    // });
    HexEventRegistrationContract.methods.createHexRegToken(url, gmail,name,organisation, designation)
    .send({ from: accounts[0]}).on('receipt', function () {
        console.log('listed');
        router.push('/');
    });
    
  }


  async function eventRegstrationCount(){
    const web3Modal = new Web3Modal()
    //console.log("line 99  : " + web3Modal);
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const url = await uploadToIPFS()
    const networkId = await web3.eth.net.getId()
    // console.log("line 104  : " + networkId);
    const { gmail, name, organisation, designation } = formInput
    // console.log("line 106  : " + gmail + " " + name);
    // Mint the NFT
    const HexEventRegistrationContractAddress = HexEventRegistration.networks[networkId].address;
    // console.log("line 109  : " + HexEventRegistrationContractAddress);
    const HexEventRegistrationContract = new web3.eth.Contract(HexEventRegistration.abi, HexEventRegistrationContractAddress)
    // console.log("line 111  : " + HexEventRegistrationContract);
    const accounts = await web3.eth.getAccounts()
    HexEventRegistrationContract.methods.getParticipentsCount().call().then(console.log);
  }

  return (
    <div className="flex justify-center">
      
      <div className="w-1/2 flex flex-col pb-12">
        <button onClick={eventRegstrationCount} className="font-bold mt-4 bg-teal-400 text-white rounded p-4 shadow-lg">
          No Of Resistrations
        </button>
        <input 
          placeholder="Enter Gmail"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, gmail: e.target.value })}
        />
        <textarea
          placeholder="Enter Name"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <input
          placeholder="Organisation"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, organisation: e.target.value })}
        />
        <input
          placeholder="Designaation"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, designation: e.target.value })}
        />
        {/* <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        /> */}
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={eventRegstration} className="font-bold mt-4 bg-teal-400 text-white rounded p-4 shadow-lg">
          Registor
        </button>
      </div>
    </div>
  )
}

