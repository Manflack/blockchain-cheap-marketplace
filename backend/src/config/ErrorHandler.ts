import { Request, Response, NextFunction } from 'express';
import ApiError from '../controller/response/ApiError';


function handleError(
    err: TypeError | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
 ) {
    let apiError = err;

    if(!(err instanceof ApiError)) {
        apiError = new ApiError("Oh no Morty, this is unbelievable, idk what just happen'", req.body);
    }

    res.status((apiError as ApiError).status).send(apiError);
}

export default handleError;