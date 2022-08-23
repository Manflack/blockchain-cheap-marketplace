import BlockchainEvent from './BlockchainEvent'

export default class ItemGeneratedEvent extends BlockchainEvent {
    owner: string;
    itemId: string;

    constructor(owner: string, itemId: string) {
        super("ItemGenerated");
        this.owner = owner;
        this.itemId = itemId;
    }
}