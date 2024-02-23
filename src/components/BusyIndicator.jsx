import React from 'react';

const BusyIndicator = ({busy}) => {
    return (
        busy ? <div className="busy-indicator">Loading...</div> : null
    );
}

export default BusyIndicator;
