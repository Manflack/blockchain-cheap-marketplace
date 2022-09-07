export default class ApiError {
    message: string;
    type: string;
    data: string;
    status: number;

    constructor(_message: string, _data: string) {
        this.type = "error";
        this.message = _message;
        this.data = _data;
        this.status = 400;
    }
}