// Retorna a data selecionada no input date retirando o timezone.

function parseDate(date){

    let newDate = new Date(date);
    let timeZone = newDate.getTimezoneOffset()/60;

    return new Date((newDate.setHours((newDate).getHours()+timeZone))).toLocaleDateString();
}

export default parseDate;


