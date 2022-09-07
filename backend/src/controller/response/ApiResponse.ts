export default class ApiResponse {
    type: string;
    response: Object;

    constructor(_data: Object) {
        this.type = "success";
        this.response = _data;
    }
}