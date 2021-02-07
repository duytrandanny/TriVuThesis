import React from 'react';

const TimeComponent = ({time}) => {
    if(typeof(time) === "number") {
        if(time < 0) {
            return <p>
                {(0 - time).toLocaleString()} BCE
            </p>
        } else {
            return <p>
                Year {time.toLocaleString()}
            </p>
        }
    } else {
        return <p>
            {time}
        </p>
    }
}

export default TimeComponent;