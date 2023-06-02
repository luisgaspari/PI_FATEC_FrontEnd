function criarProduto(form){
    const produtoNovo = {
        descricao: form.target.descricao.value,
        fichaTecnica: form.target.fichaTecnica.value,
        unidadeMedida: form.target.unidadeMedida.value,
        tipoProduto: form.target.tipoProduto.value,
        valorCompra: form.target.valorCompra.value,
        valorVenda: form.target.valorVenda.value
    }
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/produtos`,{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(produtoNovo)
    })
    .then(resposta => {
        if(resposta.status != 201){
            alert('Erro ao cadastrar!')
        }
        else {
            alert('Cadastrado com sucesso!')
            window.location.href = "produto.html"
        }
    })
}


const formReg = document.getElementById('formCadastro')
formReg.addEventListener('submit', (event) => {
    event.preventDefault()
    //console.log(event.target.descricao.value)
    criarProduto(event)
})