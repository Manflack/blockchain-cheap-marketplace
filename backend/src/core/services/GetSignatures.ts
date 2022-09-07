import BlockchainEventRepository from '../repositories/BlockchainEventRepository'
import BidApprovedEvent from '../entities/BidApprovedEvent'

export default class GetSignatures {
    private blockchainEventRepository: BlockchainEventRepository;

    constructor(blockchainEventRepository: BlockchainEventRepository) {
        this.blockchainEventRepository = blockchainEventRepository;
    }

    public execute(): BidApprovedEvent[] {
        return this.blockchainEventRepository.getTransactionsByEventType("BidApproved") || new Array;
    }
}