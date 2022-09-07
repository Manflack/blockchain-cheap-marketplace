import BlockchainEventRepository from '../repositories/BlockchainEventRepository'
import AuctionItemEvents from '../entities/AuctionItemEvent'

export default class getAuctionItems {
    private blockchainEventRepository: BlockchainEventRepository;

    constructor(blockchainEventRepository: BlockchainEventRepository) {
        this.blockchainEventRepository = blockchainEventRepository;
    }

    public execute(): AuctionItemEvents[] {
        return this.blockchainEventRepository.getTransactionsByEventType("AuctionAnItem") || new Array;
    }
}