function atualizarProdutos() {

    const ul = document.getElementById('listaProdutos')
    ul.innerHTML = ''

    const produtos = fetch('https://pi-fatec2s-maracujadesign.onrender.com/produtos/')
    .then(resposta => resposta.json())
    .then(produtosDados => {
        produtosDados.forEach(produto => {

            const par = document.createElement('p')
            const form = document.createElement('input')

            form.setAttribute("type", "submit");
            form.setAttribute("class", "list")
            form.addEventListener('click', () => procurarProduto(produto.id))
            form.setAttribute("value", `ID: ${produto.id}
Produto: ${produto.descricao}
Tipo: ${produto.tipoProduto}
Valor: R$${produto.valorVenda}`)

            const ul = document.getElementById('listaProdutos')
            ul.appendChild(form)
            ul.appendChild(par)
        }) 
    })
}

atualizarProdutos()

function procurarProduto(id){
    const client = fetch(`https://pi-fatec2s-maracujadesign.onrender.com/produtos/${id}`)
    .then(resposta => {
        if(resposta.status != 200){
            atualizarProdutos()
            throw erro("Produto não existe")
        }
        return resposta.json()
    })
    .catch(erro => alert('Produto não existe!'))
    .then(produtoDados => {

        const ul = document.getElementById('listaProdutos')
        const par = document.createElement('p')
        ul.innerHTML = ''

        const procProduto = document.createElement('p')
        procProduto.className = 'reg'
        procProduto.innerText = `Descrição: ${produtoDados.descricao}
        Ficha Técnica: ${produtoDados.fichaTecnica}

        Unidade de Medida: ${produtoDados.unidadeMedida}
        Tipo de Produto: ${produtoDados.tipoProduto}

        Valor de Compra: R$${produtoDados.valorCompra}
        Valor de Venda: R$${produtoDados.valorVenda}`
        
        ul.appendChild(procProduto)
        ul.appendChild(par)

        //botao Update
        const btnUpdate = document.createElement('button')
        btnUpdate.className = "btn2"
        btnUpdate.innerText = "Alterar"
        btnUpdate.addEventListener('click', () => alterarProduto(produtoDados.id))
        ul.appendChild(btnUpdate)

        ul.appendChild(par)

        //botao Delete
        const btnDelete = document.createElement('button')
        btnDelete.className = "btn2"
        btnDelete.innerText = "Remover"
        btnDelete.addEventListener('click', () => deletarProduto(produtoDados.id))
        ul.appendChild(btnDelete)
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

function alterarProduto(id){
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

        const ul = document.getElementById('listaProdutos')
        const par = document.createElement('p')
        ul.innerHTML = ''

        const attProduto = document.createElement('form')
        attProduto.className = 'reg'
        attProduto.method = 'post'
        attProduto.id = 'formAtt'
        
        const attId = document.createElement('input')
        attId.type = 'hidden'
        attId.id = 'id'
        attId.value = produtoDados.id

        let attDescricao = document.createElement('input')
        attDescricao.setAttribute("type", "text")
        attDescricao.setAttribute('name', 'descricao')
        attDescricao.setAttribute('placeholder', 'Descrição')
        attDescricao.setAttribute('id', 'descricao')
        attDescricao.setAttribute('class', 'form-control')
        attDescricao.setAttribute('value', produtoDados.descricao)

        let attFichaTecnica = document.createElement('input')
        attFichaTecnica.setAttribute("type", "text")
        attFichaTecnica.setAttribute('name', 'fichaTecnica')
        attFichaTecnica.setAttribute('placeholder', 'Descrição Longa')
        attFichaTecnica.setAttribute('id', 'fichaTecnica')
        attFichaTecnica.setAttribute('class', 'form-control')
        attFichaTecnica.setAttribute('value', produtoDados.fichaTecnica)

        let attUnidadeMedida = document.createElement('input')
        attUnidadeMedida.setAttribute("type", "text")
        attUnidadeMedida.setAttribute('name', 'unidadeMedida')
        attUnidadeMedida.setAttribute('placeholder', 'Unidade de Medida')
        attUnidadeMedida.setAttribute('id', 'unidadeMedida')
        attUnidadeMedida.setAttribute('class', 'form-control')
        attUnidadeMedida.setAttribute('value', produtoDados.unidadeMedida)

        let attTipoProduto = document.createElement('input')
        attTipoProduto.setAttribute("type", "text")
        attTipoProduto.setAttribute('name', 'tipoProduto')
        attTipoProduto.setAttribute('placeholder', 'Tipo de Produto')
        attTipoProduto.setAttribute('id', 'tipoProduto')
        attTipoProduto.setAttribute('class', 'form-control')
        attTipoProduto.setAttribute('value', produtoDados.tipoProduto)

        let attValorCompra = document.createElement('input')
        attValorCompra.setAttribute("type", "number")
        attValorCompra.setAttribute('step', '0.01')
        attValorCompra.setAttribute('name', 'valorCompra')
        attValorCompra.setAttribute('placeholder', 'Valor de Entrada')
        attValorCompra.setAttribute('id', 'valorCompra')
        attValorCompra.setAttribute('class', 'form-control')
        attValorCompra.setAttribute('value', produtoDados.valorCompra)

        let attValorVenda = document.createElement('input')
        attValorVenda.setAttribute("type", "number")
        attValorVenda.setAttribute('step', '0.01')
        attValorVenda.setAttribute('name', 'valorVenda')
        attValorVenda.setAttribute('placeholder', 'Valor de Venda')
        attValorVenda.setAttribute('id', 'valorVenda')
        attValorVenda.setAttribute('class', 'form-control')
        attValorVenda.setAttribute('value', produtoDados.valorVenda)


        const submit = document.createElement('button')
        submit.className = 'btn2'
        submit.innerText = 'Alterar'

        attProduto.appendChild(attId)

        attProduto.appendChild(attDescricao)
        attProduto.appendChild(attFichaTecnica)
        attProduto.appendChild(attUnidadeMedida)
        attProduto.appendChild(attTipoProduto)

        attProduto.appendChild(attValorCompra)
        attProduto.appendChild(attValorVenda)

        attProduto.appendChild(submit)

        attProduto.appendChild(par)

        ul.appendChild(attProduto)

        const att = document.getElementById('formAtt')
        att.addEventListener('submit', (event) => {
            event.preventDefault()
            //console.log(event.target.id.value)
            modificarProduto(event)
        })
    })
}

function modificarProduto(form){
    const produtoAtt = {
        descricao: form.target.descricao.value,
        fichaTecnica: form.target.fichaTecnica.value,
        unidadeMedida: form.target.unidadeMedida.value,
        tipoProduto: form.target.tipoProduto.value,
        valorCompra: form.target.valorCompra.value,
        valorVenda: form.target.valorVenda.value
    }
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/produtos/${form.target.id.value}`,{
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(produtoAtt)
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao modificar!')
        }
        else alert('Modificado com sucesso!')
        window.location.href = "produtoList.html"
    })
}