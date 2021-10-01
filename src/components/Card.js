import React from 'react';
import CardHeader from '../components/CardHeader';
import styled from './Card.module.css';


const Card = (props) => {
    return (

        <div className={styled.perfil_card_margin}>

            <CardHeader className={`bg-primary fw-bold text-white`}>
                Sua pontuação e perfil
            </CardHeader>
            <div className="card-body">
                {props.children}
            </div>
        </div>

    )
};

export default Card;