function atualizarPedidos() {
    const ul = (document.getElementById('listaPedidos').innerHTML = '')

    const clientes = fetch('http://localhost:3000/clientes')
        .then((resposta) => resposta.json())
        .then((clientesDados) => {
            clientesDados.forEach((cliente) => {
                const par = document.createElement('p')
                const li = document.createElement('li')
                li.className = 'list'
                li.innerText = `ID: ${cliente.id} - Nome: ${cliente.nome}
            E-mail: ${cliente.email}
            Telefone: ${cliente.telefone}`
                /*//botao Deletar
            const btnDelete = document.createElement('button')
            btnDelete.innerText = "Remover"
            btnDelete.addEventListener('click', () => deletarCliente(cliente.id))
            li.appendChild(btnDelete)
            //*/
                const ul = document.getElementById('listaClientes')
                ul.appendChild(li)
                ul.appendChild(par)
            })
        })
}

atualizarClientes()
