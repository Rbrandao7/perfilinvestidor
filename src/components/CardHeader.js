import React from 'react';

const CardHeader = (props) => {
    return (
        <h2 className={`card-header ${props.className}`}>
            {props.children}
        </h2>
    )
};

export default CardHeader;