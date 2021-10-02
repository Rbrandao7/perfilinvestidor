import React, { useState } from 'react';
import Form from './components/Form';
import styled from './App.module.css';
import questionsPf from './questionsPf.json';
import questionsPj from './questionsPj.json';
import templatePf from './template-pf.pdf';
import templatePj from './template-pj.pdf';


function App() {

  const [perfilSelecionado, setPerfilSelecionado] = useState('');

  const handlerSelecaoPerfil = (evt) => {

    setPerfilSelecionado(evt.target.getAttribute('perfil'));

  };


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

      {
        perfilSelecionado === '' ?
          <div className={styled.perfil_container_selecao_pessoa}>
            <button type="button" onClick={handlerSelecaoPerfil} perfil="pf" className="fusion-button button-flat button-small button-default button-1 fusion-button-default-span fusion-button-default-type">Pessoa Física</button>
            <button type="button" onClick={handlerSelecaoPerfil} perfil="pj" className="fusion-button button-flat button-small button-default button-1 fusion-button-default-span fusion-button-default-type">Pessoa Jurídica</button>
          </div>
          :
          perfilSelecionado === 'pf' ? <Form questions={questionsPf} perfil="pf" template={templatePf}/> : <Form questions={questionsPj} pefil="pj" template={templatePj}/>
      }

    </div>

  );
}

export default App;
