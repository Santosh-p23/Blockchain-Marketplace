import React, {useState} from 'react'

import Card from '@mui/material/Card';
import {Input, FormGroup, Button, FormLabel} from "@mui/material"


import { constants, utils , ethers} from "ethers"


export const NFTForm = ({nftMarketAddress, abi}) => {

const [nft_name, setNft_name] = useState("")
const [nft_description, setNft_description] = useState("")
const [nft_uri, setNft_uri] = useState("")
const [price, setNft_price] = useState(0)

const add_NFT = async()=>{
    if( nft_name && nft_description && nft_uri && price){

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const nftMarket = new ethers.Contract(
          nftMarketAddress,
          abi,
          signer
        );


        const addedNFT = await nftMarket.addNFT(nft_name, nft_description,nft_uri,price,{gasLimit: 1000000})

        console.log('Mining...');
        await addedNFT.wait();
        console.log('Mined --');

        setNft_name("")
        setNft_description("")
        setNft_uri("")
        setNft_price(0)
    }
}

  return (
    <div>
        <Card sx={{mt: 3}}>  
        <FormGroup >
        <FormLabel sx={{textAlign: "center"}}><h3>Add NFTs</h3></FormLabel>
        <Input type="text"
            sx={{ m: 3}}
               name="nft_name"
               onChange={ (e) => setNft_name(e.target.value)}
               value={nft_name} />
        <Input type="text"  sx={{ m: 3}}
               name="nft_description"
               onChange={(e) => setNft_description(e.target.value)}
               value={nft_description} />
        <Input type="text"  sx={{ m: 3}}
               name="nft_uri"
               onChange={(e)=>{setNft_uri(e.target.value)}}
               value={nft_uri} />
        <Input type ="number"  sx={{ m: 3}}
                name="price"
                onChange={(e)=>{setNft_price(e.target.value)}}
                value={price} />

        <Button sx ={{ m:3}}variant="outlined"  onClick={()=>{
            add_NFT()
        }}>Add NFTs</Button>

        </FormGroup>
        </Card>
    </div>
  )
}