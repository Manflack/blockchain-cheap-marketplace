import BlockchainEvent from './BlockchainEvent'

export default class AuctionItemEvent extends BlockchainEvent {
    seller: string;
    initialAmount: string;
    itemId: string;

    constructor(seller: string, initialAmount: string, itemId: string) {
        super("AuctionAnItem");
        this.seller = seller;
        this.initialAmount = initialAmount;
        this.itemId = itemId;
    }
}