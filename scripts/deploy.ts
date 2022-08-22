import { ethers } from "hardhat";

const FIRST_ACCOUNT_ADDRESS = <string>process.env.FIRST_ACCOUNT_ADDRESS;

const SECOND_ACCOUNT_ADDRESS = <string>process.env.SECOND_ACCOUNT_ADDRESS;
const SECOND_ACCOUNT_PRIVATE_KEY = <string>process.env.SECOND_ACCOUNT_PRIVATE_KEY;

async function main() {

  const Owner = await ethers.getContractFactory("Owner");
  const owner = await Owner.deploy();

  const GameCoin = await ethers.getContractFactory("GameCoin");
  const gameCoin = await GameCoin.deploy("3000000000000000000000");

  const GameItem = await ethers.getContractFactory("GameItem");
  const gameItem = await GameItem.deploy();

  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(gameCoin.address);

  console.log("owner", owner.address);
  console.log("gamecoin", gameCoin.address);
  console.log("gameitem", gameItem.address);
  console.log("marketplace", marketplace.address);

  const secondAccountProvider = new ethers.Wallet(SECOND_ACCOUNT_PRIVATE_KEY);
  const secondAccountSigner = secondAccountProvider.connect(ethers.provider);

  const secondAccountMarketplace = marketplace.connect(secondAccountSigner);
  // marketplace.signer is firstAccount
  // secondAccountMarketplace.signer is secondAccount

  console.log("has first account: transfer all unit of token that deployer has to second account");
  const transferAction = await gameCoin.transfer(SECOND_ACCOUNT_ADDRESS, "3000000000000000000000");

  console.log("has first account: generate item to deployer, means first account");
  const generateItemAction = await gameItem.generateItem("https://localhost:8080/this_item_never_exists_but_idk_morty_brp_this_is_an_easter_egg.json");
  const itemId = <string> await getItemId(generateItemAction);

  console.log("has first account: approve to contract all items:", itemId);
  const approveItemAction = await gameItem.setApprovalForAll(marketplace.address, true);

  console.log("has first account: auction the item generated with 1gmc costs");
  const auctionAnItem = await marketplace.auctionItem("1000000000000000000", itemId); // costs 1 gmc

  console.log("has second account: bid an auctioned item");
  const bidItemAction = await secondAccountMarketplace.bidItem(FIRST_ACCOUNT_ADDRESS, "1000000000000000000", itemId);

  console.log("has first account: approve bidder");
  const aproveBidderAction = await marketplace.approveBidder(SECOND_ACCOUNT_ADDRESS, "1000000000000000000", itemId)

  console.log("has contract owner (API), finish the transaction");


}

async function getItemId(generateItemAction: any): Promise<String> {

  const wait = await generateItemAction.wait();

  const itemGeneratedEvent = wait.events[1];

  const { newItemId } = itemGeneratedEvent.args;

  return newItemId;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
