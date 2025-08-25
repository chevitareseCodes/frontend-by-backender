import * as Service from './Service.js';
import * as DataTable from './DataTable.js'


/** @type {Service.Service<Service.Roteiros>} */
const service = new Service.Service('http://localhost:8000/roteiros/');

/**
 * 
 * @returns { Promise<HTMLElement> }
 */
async function createTable()
{
    const tableColumns = ['ID', 'Nome', 'Ensino', 'Ativo'];
    const rowsData = await service.list();
    
    const table = DataTable.createTable(tableColumns, rowsData, 'injected-DataTable');

    return table;
}

/**
 * 
 * @param { HTMLElement } obj 
 */
async function appendTableOn(obj)
{
    if(obj.querySelector('#injected-DataTable'))
        { console.log('DataTable alredy injected'); }
    else
        { obj.appendChild(await createTable()); }
}

/**
 * 
 * @param { HTMLElement } obj 
 */
function appendCardOn(obj)
{
    const card = document.createElement('div');
    card.className = 'card';
    card.id = 'injected-card';
    
    appendTableOn(card);
    obj.appendChild(card);
}

/**
 * 
 * @param { HTMLElement } obj 
 */
export function tryAppendCardOn(obj)
{
    if(obj.querySelector('#injected-card'))
        { console.log('card alredy injected'); }
    else
        { appendCardOn(obj); }
}

