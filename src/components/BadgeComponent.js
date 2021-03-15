import React from 'react';
import { Tooltip } from '@material-ui/core';

const BadgeComponent = ({list}) => {
    return(
        <span className="pt-2 E-scrollable">
            {
                list.map(a =>
                    <Tooltip 
                    key={a.name}
                    title={a.description} 
                    arrow placement="right">
                        <p>{a.name}</p>
                    </Tooltip>)
            }
        </span>
    )
}

export default BadgeComponent;