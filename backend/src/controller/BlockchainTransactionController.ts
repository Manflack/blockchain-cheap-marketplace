import { Request, Response } from "express"
import ApiResponse from "./response/ApiResponse";


// repositories
import BlockchainEventLocalRepository from "../repositories/local/BlockchainEventLocalRepository";
const blockchainEventRepository = BlockchainEventLocalRepository.getInstance();

// usecases
import GetAuctionItems from "../core/services/GetAuctionItems"
import GetBidders from "../core/services/GetBidders"
import GetSignatures from "../core/services/GetSignatures"

const getAuctionItemsUsecase = new GetAuctionItems(blockchainEventRepository);
const getBiddersUsecase = new GetBidders(blockchainEventRepository);
const getSignaturesUsecase = new GetSignatures(blockchainEventRepository);


async function getAuctionItems(req: Request, res: Response) {
    const auctionItems = getAuctionItemsUsecase.execute();
    buildResponse(res, auctionItems);
}

async function getBidders(req: Request, res: Response) {
    const bidders = getBiddersUsecase.execute();
    buildResponse(res, bidders);
}

async function signatured(req: Request, res: Response) {
    const signatures = getSignaturesUsecase.execute();
    buildResponse(res, signatures);
}

function buildResponse(res: Response, response: Object): void {
    res.send(new ApiResponse(response)).status(200);
}

export { getAuctionItems, signatured, getBidders };