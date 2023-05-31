function atualizarClientes() {

    const ul = document.getElementById('listaClientes')
    ul.innerHTML = '' // zera para não dobrar

    const clientes = fetch('http://localhost:3000/clientes')
    .then(resposta => resposta.json())
    .then(clientesDados => {
        clientesDados.forEach(cliente => {
            const li = document.createElement('li')
            li.className = "list"
            li.innerText = `${cliente.nome} - ${cliente.email}`
            /*//botao Deletar
            const btnDelete = document.createElement('button')
            btnDelete.innerText = "Remover"
            btnDelete.addEventListener('click', () => deletarCliente(cliente.id))
            li.appendChild(btnDelete)
            //*/
            const ul = document.getElementById('listaClientes')
            ul.appendChild(li)
        }) 
    })
}

atualizarClientes()