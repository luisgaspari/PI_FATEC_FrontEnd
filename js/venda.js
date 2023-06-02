listaClientes()

function atualizarPedidos() {
    document.getElementById('listaPedidos').innerHTML = ''

    const pedidos = fetch('http://localhost:3000/vendas')
        .then((resposta) => resposta.json())
        .then((pedidos) => {
            pedidos.forEach((pedido) => {
                data = new Date(pedido.dataPedido)
                formatData = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                formatTotal = pedido.totalPedido.toFixed(2)
                const li = document.createElement('li')
                li.className = 'list-group-item d-flex justify-content-between list-group-item-secondary'
                li.innerText = `ID: ${pedido.id} - Data: ${formatData} - Forma Pagto.: ${pedido.formaPagamento} - Valor Total: ${formatTotal}
                Cliente: ${pedido.cliente.nome} - Telefone: ${pedido.cliente.telefone} - Email: ${pedido.cliente.email}`

                const span = document.createElement('span')

                // Adiciona um botão de excluir para cada contato
                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Excluir'
                botaoExcluir.className = 'btn btn-danger btn-sm'
                botaoExcluir.addEventListener('click', () => deletePedido(pedido.id))
                span.appendChild(botaoExcluir)

                // Adiciona um botão de atualizar para cada contato
                const botaoAtualizar = document.createElement('button')
                botaoAtualizar.textContent = 'Atualizar'
                botaoAtualizar.className = 'btn btn-warning btn-sm'
                botaoAtualizar.addEventListener('click', () => mostrarPedido(pedido))
                span.appendChild(botaoAtualizar)

                li.appendChild(span)

                document.getElementById('listaPedidos').appendChild(li)
            })
        })
}

atualizarPedidos()

function deletePedido(id) {
    fetch(`http://localhost:3000/vendas/${id}`, {
        method: 'DELETE',
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert('Erro ao excluir o Pedido!')
        }
        alert('Pedido excluído com sucesso!')
        atualizarPedidos()
    })
}

function listaClientes() {
    const clientes = fetch('http://localhost:3000/clientes')
        .then((resposta) => resposta.json())
        .then((clientes) => {
            var select = document.getElementById('selectCliente')
            clientes.forEach((option) => {
                var optionElement = document.createElement('option')
                optionElement.text = `${option.id} - ${option.nome}`
                optionElement.value = option.id
                select.add(optionElement)
            })
        })
}

function mostraDadosCliente(id) {
    const cliente = fetch(`http://localhost:3000/clientes/${id}`)
        .then((resposta) => resposta.json())
        .then((cliente) => {
            document.getElementById('showTelefone').value = cliente.telefone
            document.getElementById('showEmail').value = cliente.email
            document.getElementById('showEndereco').value = cliente.endereco
            document.getElementById('showComplemento').value = cliente.complemento
            document.getElementById('showCidade').value = cliente.cidade
            document.getElementById('showEstado').value = cliente.estado
            document.getElementById('showCEP').value = cliente.cep
        })
}

// document.getElementById('formNovoPedido').innerHTML = ''
