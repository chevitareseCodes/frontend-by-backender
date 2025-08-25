import { HTTPErrorFactory } from './Errors.js'


export class Roteiros
{
    id;
    nome;
    ensino;
    ativo;

    /**
     * 
     * @param { number | string } id 
     * @param { string } nome 
     * @param { boolean } ensino 
     * @param { boolean } ativo 
     */
    constructor(id, nome, ensino, ativo)
    {
        this.id = id;
        this.nome = nome;
        this.ensino = ensino;
        this.ativo = ativo;
    }
}


/**
 * @template T
 */
export class Service
{
    url;

    /**
     * 
     * @param { string } url 
     */
    constructor(url)
    {
        this.url = url;
    }

    /**
     * 
     * @param { Response } response
     */
    async validateResponse(response)
    {
        if(!response.ok)
        {
            throw HTTPErrorFactory(response.status, response.text);
        }
    }

    /**
     * 
     * @returns { Promise<T> }
     */
    async list()
    {
        const response = await fetch(this.url);
        this.validateResponse(response);
        return await response.json();
    }
}

