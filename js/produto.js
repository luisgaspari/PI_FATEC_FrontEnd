function atualizarProdutos() {

    const ul = document.getElementById('listaProdutos')
    ul.innerHTML = ''

    const produtos = fetch('https://pi-fatec2s-maracujadesign.onrender.com/produtos/')
    .then(resposta => resposta.json())
    .then(produtosDados => {
        produtosDados.forEach(produto => {

            const div = document.createElement('div')
            const li = document.createElement('input')
            li.setAttribute("class", "list-group-item d-flex justify-content-between list-group-item-secondary btn1")
            li.setAttribute("type", "submit");
            li.setAttribute('data-toggle', 'modal')
            li.setAttribute('data-target', '#listModal')
            li.addEventListener('click', () => listarProduto(produto.id))
            li.value = `ID: ${produto.id}
Produto: ${produto.descricao}
Tipo: ${produto.tipoProduto}
Valor: R$${produto.valorVenda}`

            div.appendChild(li)

            // Adiciona um botão de excluir para cada produto
            const botaoExcluir = document.createElement("button")
            botaoExcluir.textContent = "Excluir"
            botaoExcluir.className = "btn btn-danger btn-sm btn2"
            botaoExcluir.addEventListener('click', () => deletarProduto(produto.id))
            div.appendChild(botaoExcluir)

            // Adiciona um botão de atualizar para cada produto
            const botaoAtualizar = document.createElement("button")
            botaoAtualizar.textContent = "Atualizar"
            botaoAtualizar.className = "btn btn-warning btn-sm btn2"
            botaoAtualizar.setAttribute('data-toggle', 'modal')
            botaoAtualizar.setAttribute('data-target', '#updateModal')
            botaoAtualizar.addEventListener("click", () => procurarProduto(produto.id))
            div.appendChild(botaoAtualizar)

            document.getElementById("listaProdutos").appendChild(div)
        }) 
    })
}

function procurarProduto(id){
    const product = fetch(`https://pi-fatec2s-maracujadesign.onrender.com/produtos/${id}`)
    .then(resposta => {
        if(resposta.status != 200){
            atualizarProdutos()
            throw erro("Produto não existe")
        }
        return resposta.json()
    })
    .catch(erro => alert('Produto não existe!'))
    .then(produtoDados => {
        document.getElementById('attId').value = produtoDados.id
        document.getElementById('attDescricao').value = produtoDados.descricao
        document.getElementById('attFichaTecnica').value = produtoDados.fichaTecnica
        document.getElementById('attUnidadeMedida').value = produtoDados.unidadeMedida
        document.getElementById('attTipoProduto').value = produtoDados.tipoProduto
        document.getElementById('attValorCompra').value = produtoDados.valorCompra
        document.getElementById('attValorVenda').value = produtoDados.valorVenda
    })
}

function listarProduto(id){
    const product = fetch(`https://pi-fatec2s-maracujadesign.onrender.com/produtos/${id}`)
    .then(resposta => {
        if(resposta.status != 200){
            atualizarProdutos()
            throw erro("Produto não existe")
        }
        return resposta.json()
    })
    .catch(erro => alert('Produto não existe!'))
    .then(produtoDados => {
        document.getElementById('listId').value = produtoDados.id
        document.getElementById('listDescricao').value = produtoDados.descricao
        document.getElementById('listFichaTecnica').value = produtoDados.fichaTecnica
        document.getElementById('listUnidadeMedida').value = produtoDados.unidadeMedida
        document.getElementById('listTipoProduto').value = produtoDados.tipoProduto
        document.getElementById('listValorCompra').value = produtoDados.valorCompra
        document.getElementById('listValorVenda').value = produtoDados.valorVenda
    })
}

function deletarProduto(id){
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/produtos/${id}`,{
        method: 'DELETE'
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao excluir!')
        }
        else alert('Excluído com sucesso!')
        atualizarProdutos()
    })
}

function modificarProduto(form){
    const produtoAtt = {
        descricao: form.target.attDescricao.value,
        fichaTecnica: form.target.attFichaTecnica.value,
        unidadeMedida: form.target.attUnidadeMedida.value,
        tipoProduto: form.target.attTipoProduto.value,
        valorCompra: form.target.attValorCompra.value,
        valorVenda: form.target.attValorVenda.value
    }
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/produtos/${form.target.attId.value}`,{
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(produtoAtt)
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao modificar!')
        }
        else alert('Modificado com sucesso!')
        window.location.href = "produto.html"
    })
}



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
    //console.log(event.target.nome.value)
    criarProduto(event)
})


atualizarProdutos()
const Att = document.getElementById('formAtt')
Att.addEventListener('submit', (event) => {
    event.preventDefault()
    //console.log(event.target.attNome.value)
    modificarProduto(event)
})