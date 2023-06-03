listaClientes()

function atualizarPedidos() {
    document.getElementById('listaPedidos').innerHTML = ''

    const pedidos = fetch('https://pi-fatec2s-maracujadesign.onrender.com/vendas')
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

document.getElementById('formNovoPedido').addEventListener('submit', function (event) {
    event.preventDefault()
    cadastrarPedido(event)
})

function cadastrarPedido(form) {
    const pedido = {
        clienteId: form.target.selectCliente.value,
        dataPedido: form.target.dataPedido.value,
        dataEntrega: form.target.dataEntrega.value,
        formaPagamento: form.target.formaPagamento.value,
        totalPedido: 0,
    }

    fetch('https://pi-fatec2s-maracujadesign.onrender.com/vendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido),
    }).then((resposta) => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao cadastrar o Pedido de Venda!')
        } else {
            alert('Pedido de Venda cadastrado com sucesso!')
            document.getElementById('btnAddNovo').disabled = false
        }
        //form.target.reset()
        atualizarPedidos()
    })
}

function deletePedido(id) {
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/vendas/${id}`, {
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
    const clientes = fetch('https://pi-fatec2s-maracujadesign.onrender.com/clientes')
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
    const cliente = fetch(`https://pi-fatec2s-maracujadesign.onrender.com/clientes/${id}`)
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

function listaProdutos() {
    const clientes = fetch('https://pi-fatec2s-maracujadesign.onrender.com/produtos')
        .then((resposta) => resposta.json())
        .then((produtos) => {
            var select = document.getElementById('selectProduto')
            produtos.forEach((option) => {
                var optionElement = document.createElement('option')
                optionElement.text = `${option.id} - ${option.descricao}`
                optionElement.value = option.id
                select.add(optionElement)
            })
        })
}

function mostraDadosProduto(id) {
    const cliente = fetch(`https://pi-fatec2s-maracujadesign.onrender.com/produtos/${id}`)
        .then((resposta) => resposta.json())
        .then((produto) => {
            document.getElementById('showTelefone').value = produto.descricao
            // document.getElementById('showEmail').value = produto.xxx
            // document.getElementById('showEndereco').value = produto.xxx
            // document.getElementById('showComplemento').value = produto.xxx
            // document.getElementById('showCidade').value = produto.xxx
            // document.getElementById('showEstado').value = produto.xxx
            // document.getElementById('showCEP').value = produto.xxx
        })
}
