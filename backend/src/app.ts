import express from 'express';
import ErrorHandler from "./config/ErrorHandler"

import { getAuctionItems, signatured, getBidders } from "./controller/BlockchainTransactionController"

const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('common'))




app.get("/api/v1/blockchain/auction-items", getAuctionItems);

app.get("/api/v1/blockchain/bidders", getBidders);

app.get("/api/v1/blockchain/signatured", signatured);




app.use(ErrorHandler)

app.listen(3000);

export default app;