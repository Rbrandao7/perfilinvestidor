function formatCnpj(val){

    let data = val.replace(/\D/g, "");

    let cnpj = `${data.substr(0, 2)}.${data.substr(2, 3)}.${data.substr(
        5,
        3
    )}/`;
    if (data.length > 12) {
        cnpj += `${data.substr(8, 4)}-${data.substr(12, 2)}`;
    } else {
        cnpj += data.substr(8);
    }
    return cnpj;

}

export default formatCnpj;