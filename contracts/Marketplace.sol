// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "contracts/GameItem.sol";
import "contracts/Owner.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is GameItem, Ownable {

    ERC20 gameCoin;
    address marketplaceAddress;

    constructor(address gmcTokenAddress) {
        gameCoin = ERC20(gmcTokenAddress);
        marketplaceAddress = address(this);
    }

    // owner approve all tokens (erc721) that wants to auction to marketplace
    // owner emit event sellerAuctionAnItem
        // offchain listen to this event and shows into component "in auctions"
        // when auction concludes, transfer token to buyer(bidder)

    function auctionItem(uint256 initialAmount, uint256 itemId)
        _ensureItemExists(itemId)
        _ensureOwnerOf(msg.sender, itemId)
        _ensureApproved(msg.sender, marketplaceAddress)
        public
    {
        emit AuctionAnItem(msg.sender, initialAmount, itemId);
    }

    function approveBidder(address buyer, uint256 amount, uint256 itemId)
        _ensureOwnerOf(msg.sender, itemId)
        public
    {
        emit BidApproved(msg.sender, buyer, amount, itemId);
    }

    function bidItem(address seller, uint256 amount, uint256 itemId)
        _ensureItemExists(itemId)
        _ensurePayable(gameCoin, amount)
        public
    {
        // here the buyer "approved" an auction, offchain will listen event
        emit BidAnItem(seller, msg.sender, amount, itemId);
    }

    //this function can be called by owner contract
    //will be called when the events bidApproved and bidItem got emited
    //because its considered that both parts "approved" the transaction
    function completeAuctionBid(address seller, address buyer, uint256 amount, uint256 itemId) 
        onlyOwner
        public
    {
        //transfer validate allowance and balance, and will validate item ownership

        transferFrom(seller, buyer, itemId);
        gameCoin.transferFrom(buyer, seller, amount);
        
        emit AuctionFinished(seller, buyer, amount, itemId);
    }

    event AuctionAnItem(address seller, uint256 initialAmount, uint256 itemId);
    event BidAnItem(address seller, address buyer, uint256 amount, uint256 itemId);
    event BidApproved(address seller, address buyer, uint256 amount, uint256 itemId);
    event AuctionFinished(address seller, address buyer, uint256 amount, uint256 itemId);


    // buyer approve erc20 to marketplace
    // buyer emit event buyerCompletedAnAuctionItem 

    // UTILS

    modifier _ensureItemExists(uint256 itemId) {
        require(_exists(itemId), "Item not exists");
        _;
    }

    modifier _ensureOwnerOf(address owner, uint256 itemId) {
        require(owner == ownerOf(itemId), "Sender not owner of item");
        _;
    }

    modifier _ensureApproved(address owner, address operator) {
        require(isApprovedForAll(owner, operator), "Contract is not approved");
        _;
    }

    modifier _ensurePayable(IERC20 token, uint256 amount) {
        uint256 balanceOwner = token.balanceOf(msg.sender);
        uint256 balanceAllowedToContract = token.allowance(msg.sender, marketplaceAddress);
        
        require(balanceOwner >= amount, "Insufficiend funds to bought item");
        require(balanceAllowedToContract >= amount, "Insufficiend allowance to smart contract, increase them before continue");
        _;
    }
}