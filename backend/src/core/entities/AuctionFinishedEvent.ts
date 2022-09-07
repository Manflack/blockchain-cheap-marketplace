import BlockchainEvent from './BlockchainEvent'

export default class AuctionFinishedEvent extends BlockchainEvent {
    seller: string;
    buyer: string;
    amount: string;
    itemId: string;

    constructor(seller: string, buyer:string, amount: string, itemId: string) {
        super("AuctionFinished");
        this.seller = seller;
        this.buyer = buyer;
        this.amount = amount;
        this.itemId = itemId;
    }
}