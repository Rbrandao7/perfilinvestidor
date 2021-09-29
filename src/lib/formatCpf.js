function cpfFormat(val) {

    let data = val.replace(/\D/g, "");

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

    return cpf;

}


export default cpfFormat;