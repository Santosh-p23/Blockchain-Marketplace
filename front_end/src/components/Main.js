import { useEffect, useState } from "react"
import { useEthers, useContractFunction , useCall} from "@usedapp/core"
import { constants, utils , ethers} from "ethers"
import NFT_Market from "../chain-info/contracts/NFT_Market.json"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/deployments/map.json"
import  {Shop} from "./Shop"
import {NFTForm} from "./NFTForm"

import {Button, Card} from '@mui/material';

export const NFTs = () => {
    // address
    // abi
    // chainId
    const [nfts, setNfts] = useState([])
    const[ nftForm, setNftForm] = useState(false)
    const [fetchComplete, setFetchComplete] = useState(false)

    const { chainId } = useEthers() 
    const { abi } = NFT_Market
    const nftMarketAddress = chainId ? networkMapping[String(chainId)]["NFT_Market"][0] : constants.AddressZero
    
    // const nftMarketInterface = new utils.Interface(abi)
    // const nftMarketContract = new Contract(nftMarketAddress, nftMarketInterface)
    // const { state, send } = useContractFunction(nftMarketContract, "addNFT",{transactionName:"Add NFT"})

    const fetchNFTs = async() =>{
        // const payload = await send()
        // console.log(state)
        // console.log( await payload)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); 
        const signer = await provider.getSigner();
        const nft_contract = new ethers.Contract(nftMarketAddress, abi, signer);

        const count = await nft_contract.tokenCounter();
        // console.log(count);
        setNfts([])
        for (let i=0; i< parseInt(count) ; i++){
        
        const nft = await nft_contract.getNFT(i);
        if(nft){
            setNfts(nfts =>[...nfts, nft])
        }

        if(i === parseInt(count)-1){
            setFetchComplete(true)
        }
        }  
    }


    const fetchNFT = async()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); 
        const signer = await provider.getSigner();
        const nft_contract = new ethers.Contract(nftMarketAddress, abi, signer);

        const count = await nft_contract.getNFTs();
        console.log(count)
        setNfts(count)
        setFetchComplete(true)
    }


    // const addNFT = async() =>{
    //     await send("Luke Skywalker","The Chosen One !","image_uri_BOOM", 100000000)
    
    // }

    // const getNFT = async() =>{
    //     await send()
    // }

    const addNFTs = async() =>{

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const nftMarket = new ethers.Contract(
          nftMarketAddress,
          abi,
          signer
        );

        const addedNFT = await nftMarket.addNFT("Darth Vader","The apprentice to the Emperor","image_uri_BOOM_ boom_boom", 1000000000,{gasLimit: 1000000})

        console.log('Mining...');
        await addedNFT.wait();
        console.log('Mined --');
    }




    return (
        <div>

            <Button variant="contained" sx={{marginRight:"-0.5rem"}} onClick ={()=>{
                fetchNFTs()
            }}>Get NFTs</Button>

            <Button onClick ={()=>{
                setNftForm(!nftForm)
            }} variant="outlined">Add NFTs</Button>
            {nftForm && <NFTForm nftMarketAddress ={nftMarketAddress} abi ={abi}/>}
 
            <Shop nfts={nfts}  nftMarketAddress ={nftMarketAddress} abi ={abi}/>

        </div>
    )
}