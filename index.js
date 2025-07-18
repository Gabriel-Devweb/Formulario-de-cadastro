function Cadastrar() {
    let txt01 = document.getElementById('txt01')
    let txt02 = document.getElementById('txt02')
    let txt03 = document.getElementById('txt03')

    if (txt01.value == '' || txt02.value == '' || txt03.value == '') {
        alert('Preencha todos os campos')
        return
    } else {
        alert('Cadastro realizado com sucesso!')
}
}