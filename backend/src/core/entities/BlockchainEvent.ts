


export default abstract class BlockchainEvent {
    type: string;

    constructor(type: string) {
        this.type = type;
    }
}