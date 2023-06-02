function atualizarClientes() {

    const ul = document.getElementById('listaClientes')
    ul.innerHTML = ''

    const clientes = fetch('http://localhost:3000/clientes')
    .then(resposta => resposta.json())
    .then(clientesDados => {
        clientesDados.forEach(cliente => {

            const par = document.createElement('p')
            const form = document.createElement('input')

            form.setAttribute("type", "submit");
            form.setAttribute("class", "list")
            form.addEventListener('click', () => procurarCliente(cliente.id))
            form.setAttribute("value", `ID: ${cliente.id}
Nome: ${cliente.nome}
E-mail: ${cliente.email}
Telefone: ${cliente.telefone}`)

            const ul = document.getElementById('listaClientes')
            ul.appendChild(form)
            ul.appendChild(par)
        }) 
    })
}

atualizarClientes()

function procurarCliente(id){
    const client = fetch(`http://localhost:3000/clientes/${id}`)
    .then(resposta => {
        if(resposta.status != 200){
            atualizarClientes()
            throw erro("Cliente não existe")
        }
        console.log(resposta.status)
        return resposta.json()
    })
    .catch(erro => alert('Cliente não existe!'))
    .then(clienteDados => {

        const ul = document.getElementById('listaClientes')
        const par = document.createElement('p')
        ul.innerHTML = ''

        const procCliente = document.createElement('p')
        procCliente.className = 'reg'
        procCliente.innerText = `Nome: ${clienteDados.nome}
        CPF: ${clienteDados.cpf}
        Telefone: ${clienteDados.telefone}
        E-mail: ${clienteDados.email}

        CEP: ${clienteDados.cep}
        Estado: ${clienteDados.estado}
        Cidade: ${clienteDados.cidade}
        Bairro: ${clienteDados.bairro}
        Endereço: ${clienteDados.endereco}
        complemento: ${clienteDados.complemento}`
        
        ul.appendChild(procCliente)
        ul.appendChild(par)

        //botao Update
        const btnUpdate = document.createElement('button')
        btnUpdate.className = "btn2"
        btnUpdate.innerText = "Atualizar"
        btnUpdate.addEventListener('click', () => modificarCliente(clienteDados.id))
        ul.appendChild(btnUpdate)

        ul.appendChild(par)

        //botao Delete
        const btnDelete = document.createElement('button')
        btnDelete.className = "btn2"
        btnDelete.innerText = "Remover"
        btnDelete.addEventListener('click', () => deletarCliente(clienteDados.id))
        ul.appendChild(btnDelete)
    })
}

function deletarCliente(id){
    fetch(`http://localhost:3000/clientes/${id}`,{
        method: 'DELETE'
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao excluir!')
        }
        atualizarClientes()
    })
}

function modificarCliente(id){
    const clienteAtt = {
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
    fetch(`http://localhost:3000/clientes/${id}`,{
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(clienteAtt)
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao modificar!')
        }
        else alert('Modificado com sucesso!')
        atualizarContatos()
    })
}