import React from 'react';

const CardHeader = (props) => {
    return (
        <div className={`card-header ${props.className}`}>
            {props.children}
        </div>
    )
};

export default CardHeader;