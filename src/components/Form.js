import React, { useState, useEffect } from 'react';
import Question from './Question';
import Card from '../components/Card';
import Check from '../components/Check';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
import PDFPF from '../template-pf.pdf';
import fontCalibri from '../calibri.ttf';
import fontCalibriBold from '../calibri-bold.ttf';
import assistantRegular from '../assistant.ttf';
import questions from '../questions.json';
import perfis from '../perfis.json';
import cpfFormat from '../lib/formatCpf';
import formatCnpj from '../lib/formatCnpj';
import testCpf from '../lib/testCpf';
import styled from './Form.module.css';
import parseDate from '../lib/parseDate';

const Form = () => {

    const [soma, setSoma] = useState();
    const [cpf, setCpf] = useState('');
    const [cpfValid, setCpfValid] = useState(false);
    const [nome, setNome] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [data, setData] = useState('');
    const [local, setLocal] = useState('');
    const [gerandoPdf, setGerandoPdf] = useState(false);
    const [answers, setAnswers] = useState({
        question1: {
            selected: false,
            weight: 0,
            optionId: '',
        },
        question2: {
            selected: false,
            weight: 0,
            optionId: '',
        },
        question3: {
            selected: false,
            weight: 0,
            optionId: '',
        },
        question4: {
            selected: false,
            weight: 0,
            optionId: '',
        },
        question5: {
            selected: false,
            weight: 0,
            optionId: '',
        },
        question6: {
            selected: false,
            weight: 0,
            optionId: '',
        },
        question7: {
            selected: false,
            weight: 0,
            optionId: '',
        },
        question8: {
            selected: false,
            weight: 0,
            optionId: '',
        },
        question9: {
            selected: false,
            weight: 0,
            optionId: '',
        },
        question10: {
            selected: false,
            weight: 0,
            optionId: '',
        },
    })

    useEffect(() => {
        setFormValid(checkFormValid());
        setSoma(calcSum());
        setCpfValid(testCpf(cpf))

    }, [cpf, nome, soma, { ...answers }, local, data])

    const handlerQuestionSelection = (evt) => {

        let value = parseInt(evt.target.value);
        let question = evt.target.getAttribute("name");
        let questionId = evt.target.getAttribute("id");

        let oldValue = { ...answers };
        oldValue[question]['weight'] = value;
        oldValue[question]['selected'] = true;
        oldValue[question]['optionId'] = questionId;

        setAnswers(oldValue);

    };

    const handlerData = (evt) => {

        setData(evt.target.value);
    }

    const handlerInputCpf = (evt) => {
        setLocal(evt.target.value);
    }

    const handlerCnpjChange = (event) => {
        //      setCnpj(formatCnpj(event.target.value));
    }

    const handleCpfChange = (event) => {

        if (event.target.value.length > 14) return '';

        setCpf(cpfFormat(event.target.value));
    };

    const handlerLocal = (evt) => {
        setLocal(evt.target.value);
    }

    const handlerInputNome = (evt) => {
        setNome(evt.target.value);
    }

    const checkFormValid = () => {
        return Object.values(answers).every((answer) => answer.selected) && nome !== "" && cpf !== "" && local !== "" && data !== "" && cpfValid === true;
    }

    const handlerPdfGen = async () => {

        setGerandoPdf(true);
        const url = PDFPF;
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const TimesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

        const calibriFontBytes = await fetch(fontCalibri).then(res => res.arrayBuffer());
        const calibriBoldFontBytes = await fetch(fontCalibriBold).then(res => res.arrayBuffer());
        const assistantRegularFontBytes = await fetch(assistantRegular).then(res => res.arrayBuffer());
        pdfDoc.registerFontkit(fontkit)
        const calibriRegular = await pdfDoc.embedFont(calibriFontBytes);
        const calibriBold = await pdfDoc.embedFont(calibriBoldFontBytes);
        const assistantRegularFont = await pdfDoc.embedFont(assistantRegularFontBytes);


        const pages = pdfDoc.getPages()
        const firstPage = pages[0];
        const SecondPage = pages[1];
        const { width, height } = firstPage.getSize()
        SecondPage.drawText(nome, {
            x: 230,
            y: 85,
            size: 10,
            font: calibriRegular,
            color: rgb(0, 0, 0),
        });

        SecondPage.drawText(cpf, {
            x: 230,
            y: 65,
            size: 10,
            font: calibriRegular,
            color: rgb(0, 0, 0),
        });

        SecondPage.drawText(local, {
            x: 210,
            y: 153,
            size: 10,
            font: calibriRegular,
            color: rgb(0, 0, 0),
        });
        
        SecondPage.drawText(parseDate(data), {
            x: 360,
            y: 153,
            size: 10,
            font: calibriRegular,
            color: rgb(0, 0, 0),
        });

        SecondPage.drawText(selectPerfil()[0]+":", {
            x: 47,
            y: 350,
            size: 12,
            font: calibriBold,
            color: rgb(0, 0, 0),
        });

        SecondPage.drawText(selectPerfil()[1], {
            x: 47,
            y: 330,
            size: 10,
            font: assistantRegularFont,
            lineHeight: 11,
            color: rgb(0, 0, 0),
        });

        //  Marca as respostas
        Object.entries(answers).forEach(([chave, valor], index) => {
            let postionX = questions[index]["options"].find(item => item.id == Object.values(answers)[index]["optionId"]).positionX;
            let postionY = questions[index]["options"].find(item => item.id == Object.values(answers)[index]["optionId"]).positionY;
            let page = questions[index]["options"].find(item => item.id == Object.values(answers)[index]["optionId"]).page;

            pages[page].drawRectangle({
                x: postionX,
                y: postionY,
                width: 10,
                height: 10,
                borderColor: rgb(0.15, 0.35, 0.60),
                borderWidth: 1.2,
            })
        })



        const pdfBytes = await pdfDoc.save()

        var blob = new Blob([pdfBytes], { type: "application/pdf" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = "teste.pdf";
        link.download = fileName;
        link.click();
        setGerandoPdf(false);
    }

    const calcSum = () => {

        return Object.values(answers).reduce((t, { weight }) => t + weight, 0);
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
                        <div className="col-md-12">
                            <div className="card-body">
                                <h3>{selectPerfil()[0]}</h3>
                                <p className="card-text">
                                    {selectPerfil()[1]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <p>
                    Declaro que:
                </p>
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
                            <label htmlFor="local" className="form-label">Local <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="local" onChange={handlerLocal} value={local} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="data" className="form-label">Data <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" id="data" onSelect={handlerData} onChange={handlerData} value={data} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">
                                Nome
                                <span className="text-danger">*</span>


                            </label>
                            <input type="text" className="form-control" id="nome" onChange={handlerInputNome} value={nome} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="cpf" className="form-label">
                                CPF
                                <span className="text-danger">*</span>
                                
                            </label>
                            <input type="tel" className="form-control" id="cpf" onChange={handleCpfChange} value={cpf} />
                            {cpfValid === true ? '' : <span className={styled.perfil_erro_cpf}>Digite um cpf válido</span>}
                        </div>
                    </div>
                </div>

                {formValid === false ?
                    <p className={styled.perfil_alerta_preenchimento}>Selecione todas as opões e preencha todos os campos</p> :
                    <div className={styled.perfil_container_botao}>
                       {gerandoPdf === false ? 
                       <button onClick={handlerPdfGen} type="submit" className="fusion-button button-flat button-small button-default button-1 fusion-button-default-span fusion-button-default-type">Gerar PDF</button>
                        : <p>Por favor, aguarde. Gerando pdf...</p>
                       }
                    </div>
                }



            </Card>
        </>
    )
};

export default Form;