import React, {useState} from 'react'

import Card from '@mui/material/Card';
import {Input, FormGroup, Button, FormLabel, InputLabel} from "@mui/material"


import { constants, utils , ethers} from "ethers"


import { create } from 'ipfs-http-client'

const client = create('https://ipfs.infura.io:5001/api/v0')


export const NFTForm = ({nftMarketAddress, abi}) => {

const [nft_name, setNft_name] = useState("")
const [nft_description, setNft_description] = useState("")
const [nft_file, setNft_file] = useState("")

const [price, setNft_price] = useState(0)

const add_NFT = async()=>{

  console.log("here")
    if( nft_name && nft_description && nft_file && price){

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const nftMarket = new ethers.Contract(
          nftMarketAddress,
          abi,
          signer
        );

        const added = await client.add(nft_file)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        const addedNFT = await nftMarket.addNFT(nft_name, nft_description,url,(price * 10**18/ 1940),{gasLimit: 1000000})

    
       

        console.log('Mining...');
        await addedNFT.wait();
        console.log('Mined --');

        setNft_name("")
        setNft_description("")
        setNft_file("")
        setNft_price(0)
    }
}

  return (
    <div>
        <Card sx={{m: 3}}>  
        <FormGroup >
        <FormLabel sx={{textAlign: "center"}}><h3>Add NFTs</h3></FormLabel>
        <InputLabel sx={{ml: 2}}>Name</InputLabel>
        <Input type="text"
            sx={{ m: 3}}
            name="nft_name"
            onChange={ (e) => setNft_name(e.target.value)}
            value={nft_name} />
        <InputLabel  sx={{ml: 2}}>Description</InputLabel>
        <Input type="text"  sx={{ m: 3}}
               name="nft_description"
               onChange={(e) => setNft_description(e.target.value)}
               value={nft_description} />
        <InputLabel  sx={{ml: 2}}>URI</InputLabel>
        <Input type="file"  sx={{ m: 3}}
               name="nft_file"
               onChange={(e)=>{setNft_file(e.target.files[0])}}/>
        <InputLabel  sx={{ml: 2}}>Price</InputLabel>
        <Input type ="number"  sx={{ m: 3}}
                name="price"
                onChange={(e)=>{setNft_price(e.target.value)}}
                value={price} />


        <Button sx ={{ m:3 ,mb:10}}variant="outlined"  onClick={()=>{
            add_NFT()
        }}>Add NFTs</Button>

        </FormGroup>
        </Card>
    </div>
  )
}