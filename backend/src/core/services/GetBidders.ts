import BlockchainEventRepository from '../repositories/BlockchainEventRepository'
import BidItemEvent from '../entities/BidItemEvent'


export default class GetBidders {
    private blockchainEventRepository: BlockchainEventRepository;

    constructor(blockchainEventRepository: BlockchainEventRepository) {
        this.blockchainEventRepository = blockchainEventRepository;
    }

    public execute(): BidItemEvent[] {
        return this.blockchainEventRepository.getTransactionsByEventType("BidAnItem") || new Array;
    }
}