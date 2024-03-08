
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Table({ data = [], columnHeaders, className = '' }) {

    return (
        <div className={"card " + className}>
            <DataTable value={data} size='small'>
                {columnHeaders.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} body={col.body} />
                ))}
            </DataTable>
        </div>
    );
}
