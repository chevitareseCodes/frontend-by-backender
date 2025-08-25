
/**
 * 
 * @param { string } data
 * @returns { HTMLElement } 
 */
export function createCell(data)
{
    const cell = document.createElement('td');
    cell.innerText = data;
    return cell;
}

/**
 * @template { T }
 * @param { T } rowData 
 * @returns { HTMLElement }
 */
export function createRow(rowData)
{
    const row = document.createElement('tr');

    for(const key in rowData)
        { row.appendChild(createCell(rowData[key])); }
    return row;
}

/**
 * 
 * @param { Array<string> } columns 
 * @returns { HTMLElement }
 */
export function createHeadder(columns)
{
    const headder = document.createElement('tr');

    for(const column of columns)
    {
        const cell = document.createElement('th');
        cell.innerText = column;
        headder.appendChild(cell);
    }

    return headder;
}


const dataTableCounter = 0;
/**
 * 
 * @returns { string }
 */
function generateTableDefaultId()
{
    const tableId = `dataTable-${dataTableCounter}`;
    dataTableCounter++;
    return tableId;
}

/**
 * @template T
 * @param { Array<string> } columns 
 * @param { T[] } rowsData 
 * @param { string | undefined } tableId 
 * @returns { HTMLElement }
 */
export function createTable(columns, rowsData, tableId)
{
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');
    if(tableId)
        { table.id = tableId; }
    else
        { table.id = generateTableDefaultId(); }

    table.appendChild(createHeadder(columns));
    table.appendChild(tableBody);
    rowsData.forEach(rowData => tableBody.appendChild(createRow(rowData)));


    return table;
}


