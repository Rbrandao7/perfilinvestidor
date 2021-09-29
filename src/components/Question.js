import React from 'react';
import Option from './Option';
import BigCheck from './BigCheck';

const Question = (props) => {

    let isSelect = Object.values(props.answers)[props.index]["selected"];
    let arraySelected = Array.from(Object.values(props.answers),(el)=>{
        return el.optionId;
    });
    
    
    
    return (
        <div className="mt-4">
            <h5 className= {isSelect === true ? "text-primary" : ""}>{isSelect === true ? <BigCheck/> :  props.index+1}  - {props.question.title} </h5>
            {
                props.question.options.map((q) => <Option key={q.id} option={q} onSelect={props.onSelect} isSelected={arraySelected.includes(q.id)} />)
            }
        </div>
    )
};

export default Question;