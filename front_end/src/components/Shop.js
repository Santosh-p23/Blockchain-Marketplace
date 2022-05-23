import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { constants, utils , ethers} from "ethers"





export const Shop = ({ nfts, nftMarketAddress, abi } ) =>{


    const buy_nft = async(token_id, price) =>{

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const nftMarket = new ethers.Contract(
          nftMarketAddress,
          abi,
          signer
        );


        const addedNFT = await nftMarket.purchaseNFT(token_id,{value:price, gasLimit: 1000000})

        console.log('Mining...');
        await addedNFT.wait();
        console.log('Mined --');

    }

  return (
      <div>
          {nfts ?<> <AppBar sx={{m:2}} position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            NFTs
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Container sx={{py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {nfts.map((card) => (
              <Grid item key={card.name} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                     {card.name}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={ () => buy_nft(card.token_id, card.price) }>Buy</Button>
                    <Typography>
                        price:{card.price.toString()}
                    </Typography>
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main></>:<h1>No NFTs</h1>}
     
                
      </div>
 
 );

}
