import BlockchainEvent from './BlockchainEvent'

export default class BidApproved extends BlockchainEvent {
    seller: string;
    buyer: string;
    amount: string;
    itemId: string;

    constructor(seller: string, buyer:string, amount: string, itemId: string) {
        super("BidApproved");
        this.seller = seller;
        this.buyer = buyer;
        this.amount = amount;
        this.itemId = itemId;
    }
}