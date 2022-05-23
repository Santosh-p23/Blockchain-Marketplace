import React from 'react'
import { ChainId, DAppProvider, Rinkeby, Localhost , Kovan} from "@usedapp/core"
import { Header } from "./components/Header"
import {Container} from "@material-ui/core"
import {NFTs} from "./components/Main"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


// const config = {
//   readOnlyChainId: Localhost.chainID,
//   readOnlyUrls: {
//     [Localhost.chainID]: 'http://127.0.0.1:8545',
//   },
//   networks:[Localhost]
// }

// const config ={
//   readOnlyChainId: Rinkeby.chainId,
//   readOnlyUrls: {
//     [Rinkeby.chainId]: 'https://rinkeby.infura.io/v3/b6674e80ae9f4233a63b0cc45c80cddd',
//   },
//   networks :[Rinkeby]
// }

const config ={
  readOnlyChainId : Kovan.chainId,
  readOnlyUrls:{
    [Kovan.chainId]: 'https://kovan.infura.io/v3/b6674e80ae9f4233a63b0cc45c80cddd',
  },
  networks:[Kovan]
}

function App() {
  return (
    <DAppProvider config={config}>
      <Header />
      <Container maxWidth="md">
        <h1>NFT Marketplace</h1>
        <NFTs />
      </Container>
    </DAppProvider>
  )
}

export default App