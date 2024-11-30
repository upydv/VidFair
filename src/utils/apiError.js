class ApiError extends Error{
    constructor (
        statusCode,
        message="something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.erros=errors

        if(stack){
            this.stack=stack
        }else{
            CaptureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}