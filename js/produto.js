function atualizarClientes() {

    const ul = document.getElementById('listaClientes')
    ul.innerHTML = ''

    const clientes = fetch('https://pi-fatec2s-maracujadesign.onrender.com/clientes/')
    .then(resposta => resposta.json())
    .then(clientesDados => {
        clientesDados.forEach(cliente => {

            const div = document.createElement('div')
            const li = document.createElement('input')
            li.setAttribute("class", "list-group-item d-flex justify-content-between list-group-item-secondary btn1")
            li.setAttribute("type", "submit");
            li.setAttribute('data-toggle', 'modal')
            li.setAttribute('data-target', '#listModal')
            li.addEventListener('click', () => listarCliente(cliente.id))
            li.value = `ID: ${cliente.id}
Nome: ${cliente.nome}
E-mail: ${cliente.email}
Telefone: ${cliente.telefone}`

            div.appendChild(li)

            // Adiciona um botão de excluir para cada Cliente
            const botaoExcluir = document.createElement("button")
            botaoExcluir.textContent = "Excluir"
            botaoExcluir.className = "btn btn-danger btn-sm btn2"
            botaoExcluir.addEventListener('click', () => deletarCliente(cliente.id))
            div.appendChild(botaoExcluir)

            // Adiciona um botão de atualizar para cada Cliente
            const botaoAtualizar = document.createElement("button")
            botaoAtualizar.textContent = "Atualizar"
            botaoAtualizar.className = "btn btn-warning btn-sm btn2"
            botaoAtualizar.setAttribute('data-toggle', 'modal')
            botaoAtualizar.setAttribute('data-target', '#updateModal')
            botaoAtualizar.addEventListener("click", () => procurarCliente(cliente.id))
            div.appendChild(botaoAtualizar)

            document.getElementById("listaClientes").appendChild(div)
        }) 
    })
}

function procurarCliente(id){
    const client = fetch(`https://pi-fatec2s-maracujadesign.onrender.com/clientes/${id}`)
    .then(resposta => {
        if(resposta.status != 200){
            atualizarClientes()
            throw erro("Cliente não existe")
        }
        return resposta.json()
    })
    .catch(erro => alert('Cliente não existe!'))
    .then(clienteDados => {

        document.getElementById('attId').value = clienteDados.id
        document.getElementById('attNome').value = clienteDados.nome
        document.getElementById('attTelefone').value = clienteDados.telefone
        document.getElementById('attEmail').value = clienteDados.email
        document.getElementById('attCpf').value = clienteDados.cpf
        document.getElementById('attCep').value = clienteDados.cep
        document.getElementById('attEstado').value = clienteDados.estado
        document.getElementById('attCidade').value = clienteDados.cidade
        document.getElementById('attBairro').value = clienteDados.bairro
        document.getElementById('attEndereco').value = clienteDados.endereco
        document.getElementById('attComplemento').value = clienteDados.complemento
    })
}

function listarCliente(id){
    const client = fetch(`https://pi-fatec2s-maracujadesign.onrender.com/clientes/${id}`)
    .then(resposta => {
        if(resposta.status != 200){
            atualizarClientes()
            throw erro("Cliente não existe")
        }
        return resposta.json()
    })
    .catch(erro => alert('Cliente não existe!'))
    .then(clienteDados => {

        document.getElementById('listId').value = clienteDados.id
        document.getElementById('listNome').value = clienteDados.nome
        document.getElementById('listTelefone').value = clienteDados.telefone
        document.getElementById('listEmail').value = clienteDados.email
        document.getElementById('listCpf').value = clienteDados.cpf
        document.getElementById('listCep').value = clienteDados.cep
        document.getElementById('listEstado').value = clienteDados.estado
        document.getElementById('listCidade').value = clienteDados.cidade
        document.getElementById('listBairro').value = clienteDados.bairro
        document.getElementById('listEndereco').value = clienteDados.endereco
        document.getElementById('listComplemento').value = clienteDados.complemento
    })
}

function deletarCliente(id){
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/clientes/${id}`,{
        method: 'DELETE'
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao excluir!')
        }
        else alert('Excluído com sucesso!')
        atualizarClientes()
    })
}

function modificarCliente(form){
    const clienteAtt = {
        nome: form.target.attNome.value,
        cpf: form.target.attCpf.value,
        telefone: form.target.attTelefone.value,
        email: form.target.attEmail.value,
        cep: form.target.attCep.value,
        estado: form.target.attEstado.value,
        cidade: form.target.attCidade.value,
        bairro: form.target.attBairro.value,
        endereco: form.target.attEndereco.value,
        complemento: form.target.attComplemento.value
    }
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/clientes/${form.target.attId.value}`,{
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(clienteAtt)
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao modificar!')
        }
        else alert('Modificado com sucesso!')
        window.location.href = "cliente.html"
    })
}



function criarCliente(form){
    const clienteNovo = {
        nome: form.target.nome.value,
        cpf: form.target.cpf.value,
        telefone: form.target.telefone.value,
        email: form.target.email.value,
        cep: form.target.cep.value,
        estado: form.target.estado.value,
        cidade: form.target.cidade.value,
        bairro: form.target.bairro.value,
        endereco: form.target.endereco.value,
        complemento: form.target.complemento.value
    }
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/clientes`,{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(clienteNovo)
    })
    .then(resposta => {
        if(resposta.status != 201){
            alert('Erro ao cadastrar!')
        }
        else {
            alert('Cadastrado com sucesso!')
            window.location.href = "cliente.html"
        }
    })
}

const formReg = document.getElementById('formCadastro')
formReg.addEventListener('submit', (event) => {
    event.preventDefault()
    //console.log(event.target.nome.value)
    criarCliente(event)
})


atualizarClientes()
const Att = document.getElementById('formAtt')
Att.addEventListener('submit', (event) => {
    event.preventDefault()
    //console.log(event.target.attNome.value)
    modificarCliente(event)
})