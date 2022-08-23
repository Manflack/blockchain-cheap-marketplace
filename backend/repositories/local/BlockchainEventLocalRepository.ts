import BlockchainEvent from '../../core/entities/BlockchainEvent'
import BlockchainEventRepository from '../../core/repositories/BlockchainEventRepository'

let DATABASE = new Map<string, BlockchainEvent[]>();

export default class BlockchainEventLocalRepository implements BlockchainEventRepository {

    public getTransactionsByEventType(eventType: string): BlockchainEvent[] | undefined {
        return DATABASE.get(eventType);
    }

    public putTransactionEvent(event: BlockchainEvent): void {
        if(DATABASE.get(event.type) === undefined) {
            DATABASE.set(event.type, []);
        }
        DATABASE.get(event.type)!.push(event);
    }
}