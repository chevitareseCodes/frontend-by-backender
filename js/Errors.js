export class BaseError extends Error
{
    statusCode;
    serverMessage;

    /**
     * 
     * @param { string } message 
     * @param { number } statusCode 
     * @param { string | undefined } serverMessage 
     */
    constructor(message, statusCode, serverMessage)
    {
        super(message);
        this.statusCode = statusCode;
        this.serverMessage = serverMessage;
    }
}


export class ServerError extends BaseError
{
    /**
     * 
     * @param { string } message 
     * @param { 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511 } statusCode 
     * @param { string | undefined } serverMessage 
     */
    constructor(message, statusCode, serverMessage)
    {
        super(message, statusCode, serverMessage)
    }
}


export class ClientError extends BaseError
{
    /**
     * @param { string } message
     * @param { 400 | 401 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 } statusCode
     * @param { string | undefined } serverMessage 
     */
    constructor(message, statusCode, serverMessage)
    {
        super(message, statusCode, serverMessage);
    }
}


export class InternalServerError extends ServerError
{
    constructor(message = 'Internal Server Error', serverMessage = undefined)
    {
        super(message, 500, serverMessage);
    }
}

export class NotImplementedError extends ServerError
{
    constructor(message = 'Not Implemented', serverMessage = undefined)
    {
        super(message, 501, serverMessage);
    }
}

export class BadGatewayError extends ServerError
{
    constructor(message = 'Bad Gateway', serverMessage = undefined)
    {
        super(message, 502, serverMessage);
    }
}

export class ServiceUnavailableError extends ServerError
{
    constructor(message = 'Service Unavailable', serverMessage = undefined)
    {
        super(message, 503, serverMessage);
    }
}

export class GatewayTimeoutError extends ServerError
{
    constructor(message = 'Gateway Timeout', serverMessage = undefined)
    {
        super(message, 504, serverMessage);
    }
}


export class BadRequestError extends ClientError
{
    constructor(message = 'Bad Request')
    {
        super(message, 400, serverMessage = undefined);
    }
}

export class UnauthorizedError extends ClientError
{
    constructor(message = 'Unauthorized')
    {
        super(message, 401, serverMessage = undefined);
    }
}

export class ForbiddenError extends ClientError
{
    constructor(message = 'Forbidden')
    {
        super(message, 403, serverMessage = undefined);
    }
}

export class NotFoundError extends ClientError
{
    constructor(message = 'Not Found')
    {
        super(message, 404, serverMessage = undefined);
    }
}

export class TooManyRequestsError extends ClientError
{
    constructor(message = 'Too Many Requests')
    {
        super(message, 429, serverMessage = undefined);
    }
}


/**
 * 
 * @param { number } statusCode 
 * @param { string } [serverMessage] 
 * @returns { Error }
 */
export function HTTPErrorFactory(statusCode, serverMessage = '') {
    let message;

    switch (statusCode)
    {
        case 400:
            return new BadRequestError(serverMessage);
        case 401:
            return new UnauthorizedError(serverMessage);
        case 403:
            return new ForbiddenError(serverMessage)
        case 404:
            message = "Recurso não encontrado (404)."; // TODO
            break;
        case 408:
            message = "Tempo de requisição esgotado (408).";
            break;
        case 500:
            message = "Erro interno do servidor (500).";
            break;
        case 502:
            message = "Bad Gateway (502).";
            break;
        case 503:
            message = "Serviço indisponível (503).";
            break;
        case 504:
            message = "Gateway Timeout (504).";
            break;
        default:
            break;
    }

    if(statusCode >= 500)
        { return new ServerError('Internal Server Error', statusCode, serverMessage); }
    else if(statusCode >= 400)
        { return new ClientError('Client Error', statusCode, serverMessage); }

    return new Error(`StatusCode ${statusCode} is not an Error`);
}

