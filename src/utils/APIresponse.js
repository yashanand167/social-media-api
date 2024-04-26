export class APIresponse{
    constructor(message = "Success",data,statusCode){
        this.message = message,
        this.data = data,
        this.statusCode = statusCode 
    }
}