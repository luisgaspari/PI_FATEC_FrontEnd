function atualizarFornecedores() {

    const ul = document.getElementById('listaFornecedores')
    ul.innerHTML = ''

    const fornecedores = fetch('https://pi-fatec2s-maracujadesign.onrender.com/fornecedores/')
    .then(resposta => resposta.json())
    .then(fornecedoresDados => {
        fornecedoresDados.forEach(fornecedor => {

            const div = document.createElement('div')
            const li = document.createElement('input')
            li.setAttribute("class", "list-group-item d-flex justify-content-between list-group-item-secondary btn1")
            li.setAttribute("type", "submit");
            li.setAttribute('data-toggle', 'modal')
            li.setAttribute('data-target', '#listModal')
            li.addEventListener('click', () => listarForecedor(fornecedor.id))
            li.value = `ID: ${fornecedor.id}
Nome: ${fornecedor.nome}
E-mail: ${fornecedor.email}
Telefone: ${fornecedor.telefone}`

            div.appendChild(li)

            // Adiciona um botão de excluir para cada fornecedor
            const botaoExcluir = document.createElement("button")
            botaoExcluir.textContent = "Excluir"
            botaoExcluir.className = "btn btn-danger btn-sm btn2"
            botaoExcluir.addEventListener('click', () => deletarForecedor(fornecedor.id))
            div.appendChild(botaoExcluir)

            // Adiciona um botão de atualizar para cada fornecedor
            const botaoAtualizar = document.createElement("button")
            botaoAtualizar.textContent = "Atualizar"
            botaoAtualizar.className = "btn btn-warning btn-sm btn2"
            botaoAtualizar.setAttribute('data-toggle', 'modal')
            botaoAtualizar.setAttribute('data-target', '#updateModal')
            botaoAtualizar.addEventListener("click", () => procurarFornecedor(fornecedor.id))
            div.appendChild(botaoAtualizar)

            document.getElementById("listaFornecedores").appendChild(div)
        }) 
    })
}

function procurarFornecedor(id){
    const client = fetch(`https://pi-fatec2s-maracujadesign.onrender.com/fornecedores/${id}`)
    .then(resposta => {
        if(resposta.status != 200){
            atualizarFornecedores()
            throw erro("Fornecedor não existe")
        }
        return resposta.json()
    })
    .catch(erro => alert('Fornecedor não existe!'))
    .then(fornecedorDados => {

        document.getElementById('attId').value = fornecedorDados.id
        document.getElementById('attNome').value = fornecedorDados.nome
        document.getElementById('attTelefone').value = fornecedorDados.telefone
        document.getElementById('attEmail').value = fornecedorDados.email
        document.getElementById('attCnpj').value = fornecedorDados.cnpj
        document.getElementById('attCep').value = fornecedorDados.cep
        document.getElementById('attEstado').value = fornecedorDados.estado
        document.getElementById('attCidade').value = fornecedorDados.cidade
        document.getElementById('attBairro').value = fornecedorDados.bairro
        document.getElementById('attEndereco').value = fornecedorDados.endereco
        document.getElementById('attComplemento').value = fornecedorDados.complemento
    })
}

function listarForecedor(id){
    const client = fetch(`https://pi-fatec2s-maracujadesign.onrender.com/fornecedores/${id}`)
    .then(resposta => {
        if(resposta.status != 200){
            atualizarFornecedores()
            throw erro("Fornecedor não existe")
        }
        return resposta.json()
    })
    .catch(erro => alert('Fornecedor não existe!'))
    .then(fornecedorDados => {

        document.getElementById('listId').value = fornecedorDados.id
        document.getElementById('listNome').value = fornecedorDados.nome
        document.getElementById('listTelefone').value = fornecedorDados.telefone
        document.getElementById('listEmail').value = fornecedorDados.email
        document.getElementById('listCnpj').value = fornecedorDados.cnpj
        document.getElementById('listCep').value = fornecedorDados.cep
        document.getElementById('listEstado').value = fornecedorDados.estado
        document.getElementById('listCidade').value = fornecedorDados.cidade
        document.getElementById('listBairro').value = fornecedorDados.bairro
        document.getElementById('listEndereco').value = fornecedorDados.endereco
        document.getElementById('listComplemento').value = fornecedorDados.complemento
    })
}

function deletarForecedor(id){
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/fornecedores/${id}`,{
        method: 'DELETE'
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao excluir!')
        }
        else alert('Excluído com sucesso!')
        atualizarFornecedores()
    })
}

function modificarFornecedor(form){
    const fornecedorAtt = {
        nome: form.target.attNome.value,
        cnpj: form.target.attCnpj.value,
        telefone: form.target.attTelefone.value,
        email: form.target.attEmail.value,
        cep: form.target.attCep.value,
        estado: form.target.attEstado.value,
        cidade: form.target.attCidade.value,
        bairro: form.target.attBairro.value,
        endereco: form.target.attEndereco.value,
        complemento: form.target.attComplemento.value
    }
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/fornecedores/${form.target.attId.value}`,{
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(fornecedorAtt)
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao modificar!')
        }
        else alert('Modificado com sucesso!')
        window.location.href = "fornecedor.html"
    })
}



function criarFornecedor(form){
    const fornecedorNovo = {
        nome: form.target.nome.value,
        cnpj: form.target.cnpj.value,
        telefone: form.target.telefone.value,
        email: form.target.email.value,
        cep: form.target.cep.value,
        estado: form.target.estado.value,
        cidade: form.target.cidade.value,
        bairro: form.target.bairro.value,
        endereco: form.target.endereco.value,
        complemento: form.target.complemento.value
    }
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/fornecedores`,{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(fornecedorNovo)
    })
    .then(resposta => {
        if(resposta.status != 201){
            alert('Erro ao cadastrar!')
        }
        else {
            alert('Cadastrado com sucesso!')
            window.location.href = "fornecedor.html"
        }
    })
}

const formReg = document.getElementById('formCadastro')
formReg.addEventListener('submit', (event) => {
    event.preventDefault()
    //console.log(event.target.nome.value)
    criarFornecedor(event)
})


atualizarFornecedores()
const Att = document.getElementById('formAtt')
Att.addEventListener('submit', (event) => {
    event.preventDefault()
    //console.log(event.target.attNome.value)
    modificarFornecedor(event)
})