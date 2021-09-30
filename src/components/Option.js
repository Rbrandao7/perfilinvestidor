import React, { useState } from 'react';

const Option = (props) => {



    return (
        <>
            <div className="form-check">
                <input onChange={props.onSelect} className="form-check-input" checked={props.isSelected} type="radio" name={props.option.name} id={props.option.id} value={props.option.weight} />
                <label className="form-check-label" htmlFor={props.option.id}>
                    {props.option.title}
                </label>
            </div>
        </>

    )
};

export default Option;