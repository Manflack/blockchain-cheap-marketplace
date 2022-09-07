import BlockchainEvent from '../entities/BlockchainEvent'

export default interface BlockchainEventRepository {
    getTransactionsByEventType(eventType: string): BlockchainEvent[] | undefined;

    putTransactionEvent(event: BlockchainEvent): void;
}