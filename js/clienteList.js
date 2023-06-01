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
    .then(clienteDados => {

        const ul = document.getElementById('listaClientes')
        ul.innerHTML = ''

        //botao Update

        const procCliente = document.createElement('p')
        procCliente.className = 'reg'
        procCliente.innerText = `ID: ${clienteDados.id}

        Nome: ${clienteDados.nome}
        CPF: ${clienteDados.cpf}
        Telefone: ${clienteDados.telefone}
        E-mail: ${clienteDados.email}

        CEP: ${clienteDados.cep}
        Estado: ${clienteDados.estado}
        Cidade: ${clienteDados.cidade}
        Bairro: ${clienteDados.bairro}
        Endereço: ${clienteDados.endereco}`
        
        ul.appendChild(procCliente)

        //botao Delete
        const btnDelete = document.createElement('button')
        btnDelete.innerText = "Remover"
        btnDelete.addEventListener('click', () => deletarCliente(clienteDados.id))
        ul.appendChild(btnDelete)
    })
    .catch(erro => alert('Cliente não existe!'))
}