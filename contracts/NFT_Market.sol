// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFT_Market {

    struct NFT{
        uint256 token_id;
        address owner;
        string name;
        string description;
        string image;
        uint256 price;
        address approved_to;
        address[] approval_list;
        uint256 timestamp;
    }
    uint256 public tokenCounter;
    NFT public nft;

    // uint256 public fee;
    // bytes32 public keyhash;

    mapping(address => NFT[]) public NFT_List;
    mapping(uint256 => address) public tokenIdToOwner;
    mapping(uint256 => NFT) public tokenIdToNFT;

//     constructor(address _vrf_address,
//                 address _link,
//                 bytes32 _keyhash,
//                 uint256 _fee) public  
//                 VRFConsumerBase(_vrf_address, _link ) {
        
//         tokenCounter =0;
//         keyhash = _keyhash;
//         fee = _fee;

// }


    function addNFT( string memory _name, string memory _description, string memory _image, uint256 _price) public returns (uint256){
        NFT memory new_NFT = nft;
        new_NFT.name = _name;
        new_NFT.description = _description;
        new_NFT.image = _image;
        new_NFT.price = _price;
        new_NFT.timestamp = block.timestamp;
        new_NFT.owner = msg.sender;
        new_NFT.token_id = tokenCounter;
        tokenCounter++;
        
        tokenIdToOwner[new_NFT.token_id] = msg.sender;
        tokenIdToNFT[new_NFT.token_id] = new_NFT;
        NFT_List[msg.sender].push(new_NFT);
        return new_NFT.token_id;
    }

    function getNFT(uint256 _token_id) public view returns (NFT memory ){
        return tokenIdToNFT[_token_id];
    }

    function getNFTs() public view returns(NFT[] memory)
    {
        return NFT_List[msg.sender];

    }

    function purchaseNFT(uint256 _token_id) public payable
    {
        require(msg.sender != tokenIdToOwner[_token_id]); //&& msg.sender == tokenIdToNFT[_token_id].approved_to, "Not eligible to purchase this NFT");
        for(uint256 i =0; i<NFT_List[tokenIdToOwner[_token_id]].length; i++){
            if(_token_id == NFT_List[tokenIdToOwner[_token_id]][i].token_id){

                require(msg.value == tokenIdToNFT[_token_id].price, "The amount is wrong!");
                payable(tokenIdToOwner[_token_id]).transfer(msg.value);


                NFT_List[tokenIdToOwner[_token_id]][i] = NFT_List[tokenIdToOwner[_token_id]][NFT_List[tokenIdToOwner[_token_id]].length -1];
                NFT_List[tokenIdToOwner[_token_id]].pop();

                tokenIdToNFT[_token_id].owner = msg.sender;
                tokenIdToOwner[_token_id] = msg.sender;

                NFT_List[msg.sender].push(tokenIdToNFT[_token_id]);
            }
        }

    }

    function setApprove(uint256 _token_id, address _to) public returns (bool){
        require(msg.sender == tokenIdToOwner[_token_id]);
        tokenIdToNFT[_token_id].owner = _to;
        return true;
    }

    function requestApproval(uint256 _token_id) public {
        require(msg.sender != tokenIdToNFT[_token_id].owner);
        tokenIdToNFT[_token_id].approval_list.push(msg.sender);
    }


    function destroyNFT(uint256 _token_id) public{

        require(msg.sender == tokenIdToOwner[_token_id]);
        
        for(uint256 i =0; i<NFT_List[msg.sender].length; i++){
            if(_token_id == NFT_List[msg.sender][i].token_id){
                NFT_List[msg.sender][i] = NFT_List[msg.sender][NFT_List[msg.sender].length -1];
                NFT_List[msg.sender].pop();

                delete tokenIdToNFT[_token_id];


            }
        }

    }

    // function fulfillRandomness(bytes32 requestTd, uint256 _random_number) internal override{

    // }

}