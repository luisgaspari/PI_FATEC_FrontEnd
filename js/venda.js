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
