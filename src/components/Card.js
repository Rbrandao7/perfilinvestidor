import React from 'react';
import CardHeader from '../components/CardHeader';


const Card = (props) => {
    return (

        <div className="card mt-4">

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