import React, { useState, useEffect } from 'react';
import Question from './Question';
import Card from '../components/Card';
import Check from '../components/Check';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import PDFPF from '../template-pf.pdf';


let questions = [
    {
        title: "Qual a finalidade do Investimento e preferências quanto à assunção de riscos?",
        id: "question1",
        options: [
            {
                title: "Preservar meu capital ao longo do tempo, com segurança mesmo abrindo mão de rentabilidade",
                weight: 0,
                id: "ans1opt1",
                name: "question1",
                positionX:61,
                positionY:572,
            },
            {
                title: "Aumentar meu capital, com rentabilidade e segurança",
                weight: 5,
                id: "ans1opt2",
                name: "question1",
                positionX:61,
                positionY:562,
            },
            {
                title: "Rentabilidade, independente do risco, aumentando, inclusive, o valor investido",
                weight: 10,
                id: "ans1opt3",
                name: "question1",
                positionX:61,
                positionY:547,
            }
        ]

    },
    {
        title: "Por quanto tempo você pretende deixar seus recursos aplicados?",
        id: "question2",
        options: [
            {
                title: "Menos de 1 ano",
                weight: 0,
                id: "ans2opt1",
                name: "question2",
                positionX:61,
                positionY:510,
            },
            {
                title: "Entre 1 ano e 3 anos",
                weight: 5,
                id: "ans2opt2",
                name: "question2",
                positionX:61,
                positionY:500,
            },
            {
                title: "Acima de 3 anos",
                weight: 10,
                id: "ans2opt3",
                name: "question2",
                positionX:61,
                positionY:487
            }
        ]

    },
    {
        title: "Sobre quais investimentos abaixo você tem conhecimento?",
        id: "question3",
        options: [
            {
                title: "Poupança, CDB, LCI, LCA ou Fundos DI",
                weight: 2,
                id: "ans3opt1",
                name: "question3",
                positionX:61,
                positionY:450
            },
            {
                title: "Além dos anteriores, outros produtos de Renda Fixa (como investimentos atrelados à inflação e títulos prefixados) ou Fundos Multimercados",
                weight: 5,
                id: "ans3opt2",
                name: "question3",
                positionX:61,
                positionY:439
            },
            {
                title: "Além dos anteriores, Ações, Fundos de Ações ou Fundos Estruturados ( FIP, FIDC, FII, etc.)",
                weight: 9,
                id: "ans3opt3",
                name: "question3",
                positionX:61,
                positionY:414
            },
            {
                title: "Além de todos os anteriores, também conheço Derivativos",
                weight: 10,
                id: "ans3opt4",
                name: "question3",
                positionX:61,
                positionY:402
            },
            {
                title: "Não conheço produtos de investimentos",
                weight: 0,
                id: "ans3opt5",
                name: "question3",
                positionX:61,
                positionY:390
            },
        ]

    },
    {
        title: "Nos últimos 12 meses qual a natureza das operações realizadas no mercado de valores mobiliários?",
        id: "question4",
        options: [
            {
                title: "Poupança, CDB, LCI, LCA ou Fundos DI",
                weight: 2,
                id: "ans4opt1",
                name: "question4",
                positionX:61,
                positionY:353
            },
            {
                title: "Produtos de Renda Fixa (como investimentos atrelados à inflação e títulos prefixados) ou Fundos Multimercados",
                weight: 5,
                id: "ans4opt2",
                name: "question4",
                positionX:61,
                positionY:342
            },
            {
                title: "Ações, Fundos de Ações ou Fundos Estruturados ( FIP, FIDC, FII, etc.)",
                weight: 9,
                id: "ans4opt3",
                name: "question4",
                positionX:61,
                positionY:330
            },
            {
                title: "Derivativos",
                weight: 10,
                id: "ans4opt4",
                name: "question4",
                positionX:61,
                positionY:318
            },
            {
                title: "Não investi nos últimos 12 meses",
                weight: 0,
                id: "ans4opt5",
                name: "question4",
                positionX:61,
                positionY:306
            },
        ]

    },
    {
        title: "Com qual frequência você investiu nos últimos 12 meses?",
        id: "question5",
        options: [
            {
                title: "No mínimo, 12 vezes",
                weight: 10,
                id: "ans5opt1",
                name: "question5",
                positionX:61,
                positionY:353
            },
            {
                title: "Aproximadamente 6 vezes",
                weight: 5,
                id: "ans5opt2",
                name: "question5",
                positionX:61,
                positionY: 341
            },
            {
                title: "Aproximadamente 4 vezes",
                weight: 3,
                id: "ans5opt3",
                name: "question5",
                positionX:61,
                positionY:329
            },
            {
                title: "Aproximadamente 2 vezes",
                weight: 1,
                id: "ans5opt4",
                name: "question5",
                positionX:61,
                positionY:317
            },
            {
                title: "Não investi nos últimos 12 meses",
                weight: 0,
                id: "ans5opt5",
                name: "question5",
                positionX:61,
                positionY:305
            },
        ]

    },
    {
        title: "Qual das alternativas melhor classifica sua formação acadêmica e experiência com o Mercado Financeiro?",
        id: "question6",
        options: [
            {
                title: "Não possuo formação acadêmica ou conhecimento do Mercado Financeiro",
                weight: 1,
                id: "ans6opt1",
                name: "question6",
                positionX:61,
                positionY:'xxxx'
            },
            {
                title: "Possuo formação acadêmica em outra área, mas não tenho experiência com o Mercado Financeiro",
                weight: 2,
                id: "ans6opt2",
                name: "question6",
                positionX:61,
                positionY:'xxxx'
            },
            {
                title: "Possuo formação acadêmica em outra área, mas possuo conhecimento sobre o Mercado financeiro",
                weight: 4,
                id: "ans6opt3",
                name: "question6",
                positionX:61,
                positionY:'xxxx'
            },
            {
                title: "Possuo formação acadêmica na área financeira ou pleno conhecimento sobre o Mercado Financeiro",
                weight: 5,
                id: "ans6opt4",
                name: "question6",
                positionX:61,
                positionY:'xxxx'
            },
        ]

    },
    {
        title: "Qual sua renda mensal média declarada?",
        id: "question7",
        options: [
            {
                title: "Até R$ 1.200",
                weight: 0,
                id: "ans7opt1",
                name: "question7",
            },
            {
                title: "De R$ 1.201 até R$ 5.000",
                weight: 1,
                id: "ans7opt2",
                name: "question7",
            },
            {
                title: "De R$ 5.001 até R$ 10.000",
                weight: 2,
                id: "ans7opt3",
                name: "question7",
            },
            {
                title: "Acima de R$ 10.000",
                weight: 4,
                id: "ans7opt4",
                name: "question7",
            },
        ]

    },
    {
        title: "Qual o valor dos ativos (bens materiais, imóveis e aplicações financeiras) que compõem seu patrimônio?",
        id: "question8",
        options: [
            {
                title: "Até R$ 10.000",
                weight: 0,
                id: "ans8opt1",
                name: "question8",
            },
            {
                title: "De R$ 10.001 até R$ 100.000",
                weight: 1,
                id: "ans8opt2",
                name: "question8",
            },
            {
                title: "De R$ 100.001 até R$ 500.000",
                weight: 2,
                id: "ans8opt3",
                name: "question8",
            },
            {
                title: "De R$ 500.001 até R$ 1.000.000",
                weight: 4,
                id: "ans8opt4",
                name: "question8",
            },
            {
                title: "Acima de R$ 1.000.000 ",
                weight: 5,
                id: "ans8opt5",
                name: "question8",
            },
        ]

    },
    {
        title: "Considerando suas necessidades futuras de recursos, qual é a sua expectativa em relação aos seus investimentos?",
        id: "question9",
        options: [
            {
                title: "Não planejo nesse momento resgatar meus investimentos e nem realizar novas aplicações ",
                weight: 2,
                id: "ans9opt1",
                name: "question9",
            },
            {
                title: "Não planejo nesse momento regatar meus investimentos e pretendo realizar novas aplicações",
                weight: 3,
                id: "ans9opt2",
                name: "question9",
            },
            {
                title: "Posso precisar de parte dos meus investimentos para pagar despesas no curto prazo",
                weight: 1,
                id: "ans9opt3",
                name: "question9",
            },
            {
                title: "Conto com esses investimentos para complementar minha renda",
                weight: 0,
                id: "ans9opt4",
                name: "question9",
            },
            {
                title: "Não possuo necessidades futuras de recursos, com relação aos investimentos",
                weight: 5,
                id: "ans9opt5",
                name: "question9",
            },
        ]

    },
    {
        title: "Do seu pratimônio e receitas declaradas, qual o volume em (%) investido nos últimos 12 meses?",
        id: "question10",
        options: [
            {
                title: "Investi menos de 10%",
                weight: 1,
                id: "ans10opt1",
                name: "question10",
            },
            {
                title: "Investi entre 10,01% a 25%",
                weight: 2,
                id: "ans10opt2",
                name: "question10",
            },
            {
                title: "Investi entre 25,01% a 70%",
                weight: 3,
                id: "ans10opt3",
                name: "question10",
            },
            {
                title: "Investi acima de 70%",
                weight: 5,
                id: "ans10opt4",
                name: "question10",
            },
            {
                title: "Não  investi nos  últimos 12 meses",
                weight: 0,
                id: "ans10opt5",
                name: "question10",
            },
        ]

    }
];

let perfis = {
    "Conservador": `
        Clientes com este perfil têm como objetivo a preservação do capital e possuem baixa tolerância a riscos. 
        Também é representado por clientes que, apesar de estarem dispostos a correr um pouco mais de riscos na 
        busca por retornos diferenciados, tenham necessidade de sacar os recursos em curto período de tempo.`,
    "Moderado":
        `Clientes com este perfil estão dispostos a correr alguns riscos em investimentos, buscando um 
        retorno diferenciado no médio prazo, com baixa necessidade de liquidez no curto prazo, havendo disponibilidade 
        para diversificar parte das aplicações em alternativas mais arrojadas.`,
    "Arrojado": `
        Este perfil é representado por clientes com alta tolerância a riscos, baixa ou nenhuma necessidade de liquidez no 
        curto/médio prazo e que estejam dispostos a aceitar as oscilações dos mercados de risco (e possíveis perdas) na busca 
        por retornos diferenciados no longo prazo.
        `
}

const Form = () => {
    console.log("RRRE")
    const [soma, setSoma] = useState();
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [data, setData] = useState(new Date());
    const [local,setLocal] = useState('');
    const [answers,setAnswers] = useState({
        question1: {
            selected:false,
            weight:0,
        },
        question2: {
            selected:false,
            weight:0,
        },
        question3: {
            selected:false,
            weight:0,
        },
        question4: {
            selected:false,
            weight:0,
        },
        question5: {
            selected:false,
            weight:0,
        },
        question6: {
            selected:false,
            weight:0,
        },
        question7: {
            selected:false,
            weight:0,
        },
        question8: {
            selected:false,
            weight:0,
        },
        question9: {
            selected:false,
            weight:0,
        },
        question10: {
            selected:false,
            weight:0,
        },
    })
    
    useEffect(()=>{
        console.log("adasdad",cpf !== "")
        setFormValid(checkFormValid());
        setSoma(calcSum());
    },[cpf,nome,soma,{...answers},local,data])
    
    const handlerQuestionSelection = (evt) => {

        let value = parseInt(evt.target.value);
        let question = evt.target.getAttribute("name");
        let oldValue = {...answers};
        oldValue[question]['weight'] = value;
        oldValue[question]['selected'] = true;  
        setAnswers(oldValue);
        
    };

    const handlerData = (evt) =>{
        setData(evt.target.value);
    }

    const handlerInputCpf = (evt) => {             
        setLocal(evt.target.value);        
    }

    const handlerCnpjChange = (event) =>{

        let data = event.target.value.replace(/\D/g, "");

        let cnpj = `${data.substr(0, 2)}.${data.substr(2, 3)}.${data.substr(
            5,
            3
          )}/`;
          if (data.length > 12) {
            cnpj += `${data.substr(8, 4)}-${data.substr(12, 2)}`;
          } else {
            cnpj += data.substr(8);
          }
          data = cnpj;
    }

    const handleCpfChange = (event) => {
      
        let data = event.target.value.replace(/\D/g, "");

        if (data.length > 11) return;
         
          let cpf = "";
          let parts = Math.ceil(data.length / 3);
          for (let i = 0; i < parts; i++) {
            if (i === 3) {
              cpf += `-${data.substr(i * 3)}`;
              break;
            }
            cpf += `${i !== 0 ? "." : ""}${data.substr(i * 3, 3)}`;
          }
          data = cpf;
          setCpf(data);        
        
      };

  

    const handlerLocal = (evt) =>{
        setLocal(evt.target.value);

    }

    const handlerInputNome = (evt) => {
        setNome(evt.target.value);        
    }

    const checkFormValid = () =>{
        return Object.values(answers).every((answer) => answer.selected) && nome !== "" && cpf !== "" && local !== "" && data !== "";
    }

    const handlerPdfGen = async () => {
        const url = PDFPF;
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const TimesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

        const pages = pdfDoc.getPages()
        const firstPage = pages[0];
        const SecondPage = pages[1];
        const { width, height } = firstPage.getSize()
        SecondPage.drawText(nome, {
            x: 225,
            y: 104,
            size: 10,
            font: TimesRomanFont,
            color: rgb(0.95, 0.1, 0.1),
        });

        SecondPage.drawText(cpf, {
            x: 225,
            y: 85,
            size: 10,
            font: TimesRomanFont,
            color: rgb(0.95, 0.1, 0.1),
        })

        firstPage.drawRectangle({
            x: 61,
            y: 265,
            width: 10,
            height: 10,
            borderColor: rgb(1, 0, 0),
            borderWidth: 1.5,
          })
        const pdfBytes = await pdfDoc.save()
        console.log(pdfBytes)
        var blob = new Blob([pdfBytes], { type: "application/pdf" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = "teste.pdf";
        link.download = fileName;
        link.click();

    }

    const calcSum = () => {
       
        return Object.values(answers).reduce((t, {weight}) => t + weight, 0);
    };

    const selectPerfil = () => {
        if (soma >= 33) {
            return ["Arrojado", perfis["Arrojado"]];
        } else if (soma >= 23 && soma <= 32) {
            return ["Moderado", perfis["Moderado"]];
        } else if (soma >= 0 && soma <= 22) {
            return ["Conservador", perfis["Conservador"]];

        }
        return ["Selecione todas as perguntas", ""];
    }

    return (
        <>
            <form>
                {
                    questions.map((question, index) => <Question key={question.id} index={index} question={question} onSelect={handlerQuestionSelection} sum={calcSum} answers={answers} />)
                }
            </form>
            <Card>
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-1 p-3 center-score">
                            {soma}
                        </div>
                        <div className="col-md-11">
                            <div className="card-body">
                                <h5 className="card-title">{selectPerfil()[0]}</h5>
                                <p className="card-text">
                                    {selectPerfil()[1]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <p>
                    <Check />
                    As informações contidas neste questionário são verdadeiras, estando ciente que as recomendações de investimento
                    dependem dessas informações.
                </p>
                <p>
                    <Check />
                    Tomei conhecimento do meu perfil de investimento aferido a partir das informações prestadas mediante o preenchimento
                    deste questionário e estou ciente que a Instituição informará se as operações por mim realizadas estão de acordo
                    com aquelas recomendadas para o meu perfil de investimento.
                </p>
                <p>
                    <Check />
                    Comprometo-me a manter o questionário atualizado, informando prontamente quaisquer eventuais alterações.
                </p>

                <div className="row">
                    <div className="col-12 col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">Nome <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="nome" onChange={handlerInputNome} value={nome} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="cpf" className="form-label">CPF <span className="text-danger">*</span></label>
                            <input type="tel" className="form-control" id="cpf" onChange={handleCpfChange} value={cpf} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="local" className="form-label">Local <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="local" onChange={handlerLocal} value={local} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="data" className="form-label">Data <span className="text-danger">*</span></label>
                            <input type="date"  className="form-control" id="data" onSelect={handlerData} onChange={handlerData} value={data} />
                        </div>
                    </div>
                </div>

                {formValid === false ? 
                    <p className="text-small text-center text-danger">Selecione todas as opões e preencha todos os campos</p> :
                    <div className="d-flex justify-content-center">
                        <button onClick={handlerPdfGen} type="submit" className="btn btn-primary">Gerar PDF</button>

                    </div>
                }



            </Card>
        </>
    )
};

export default Form;