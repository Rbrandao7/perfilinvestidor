import React from 'react';
import Form from './components/Form';


function App() {


  return (
    <div className="container p-3 border shadow-sm mt-4 mb-4 bg-light">
      <h3 className="text-center">
        Análise de Perfil do Investidor (API)
      </h3>
      <p className="text-justify lh-sm">
        A Análise de Perfil do Investidor (API), também conhecida como “Suitability” em outros países, é uma metodologia que
        tem por objetivo auxiliar o investidor a identificar o seu perfil e verificar a adequação de seus investimentos em relação
        a seus objetivos, situação financeira, conhecimento sobre os produtos de investimento, atendendo a Resolução CVM nº 30, de
        11 de maio de 2021.
        Azumi DTVM, elabora o Questionário API com objetivo de auxiliá-lo a identificar seu perfil de investidor (<strong>conservador,
          moderado ou arrojado</strong>) e recomendar os investimentos mais  adequados  a esse perfil. Para cada questão, escolha a alternativa
        que mais se aproxima dos seus objetivos e expectativas de investimento.
      </p>

      <Form />
   


    </div>

  );
}

export default App;
