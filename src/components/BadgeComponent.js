import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const BadgeComponent = ({list}) => {
    return(
        <span>
            {
                list.map(a =>
                    <Tooltip title={a.description} arrow placement="right">
                        <p>{a.name}</p>
                    </Tooltip>)
            }
        </span>
    )
}

export default BadgeComponent;