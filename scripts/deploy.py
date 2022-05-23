from brownie import NFT_Market
from web3 import Web3
from scripts.helpful_scripts import get_account


def deploy():
    account = get_account()
    # nft_contract = NFT_Market.deploy({"from":account})
    if len(NFT_Market) <=0:
        print(f"Deploying NFT_Market contract")
        nft_contract = NFT_Market.deploy({"from":account})
    else:
        nft_contract = NFT_Market[len(NFT_Market)-1]
        
        
def getNFT():
    account = get_account()
    nft_contract = NFT_Market[len(NFT_Market)-1]
    
    tx = nft_contract.getNFTs({'from':account})
    print(tx)
    
        
          
def main():
    deploy()
    getNFT()