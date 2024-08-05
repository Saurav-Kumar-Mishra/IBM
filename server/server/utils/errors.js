class CustomApiError extends Error{
    constructor(message){
        super(message);
    }
}

class BadRequestError extends CustomApiError{
    constructor(message){
        super(message);
        this.status = 400;
    }
}

class AuthorizationError extends CustomApiError{
    constructor(message){
        super(message);
        this.status = 401;
    }
}

class AuthenticationError extends CustomApiError{
    constructor(message){
        super(message);
        this.status = 403;
    }
}

class NotFoundError extends CustomApiError{
    constructor(message){
        super(message);
        this.status = 404;
    }
}

module.exports = {
    CustomApiError,
    BadRequestError,
    AuthorizationError,
    AuthenticationError,
    NotFoundError
}