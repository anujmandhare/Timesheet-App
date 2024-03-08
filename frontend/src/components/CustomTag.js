
import React from 'react';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';



export default function CustomTag({ children, tooltip }) {
    return (
        <span>
            <Tooltip target=".customTag" >{tooltip}</Tooltip>
            <Tag className='customTag' data-pr-position="left">{children}</Tag>
        </span>
    );
}
