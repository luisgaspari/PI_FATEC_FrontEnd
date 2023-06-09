const host = 'https://pi-fatec2s-maracujadesign.onrender.com'
//const host = 'http://localhost:3000'

// Lista Todos os Pedidos
function listarPedidos() {
    document.getElementById('listaPedidos').innerHTML = ''

    const pedidos = fetch(`${host}/vendas`)
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

                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Excluir'
                botaoExcluir.className = 'btn btn-danger btn-sm'
                botaoExcluir.addEventListener('click', () => excluirPedido(pedido.id))
                span.appendChild(botaoExcluir)

                const space = document.createElement('span')
                space.textContent = ' '
                span.appendChild(space)

                const botaoAtualizar = document.createElement('button')
                botaoAtualizar.textContent = 'Atualizar'
                botaoAtualizar.className = 'btn btn-warning btn-sm'
                botaoAtualizar.setAttribute('data-toggle', 'modal')
                botaoAtualizar.setAttribute('data-target', '#updateModal')
                botaoAtualizar.addEventListener('click', () => mostrarPedido(pedido))
                span.appendChild(botaoAtualizar)

                li.appendChild(span)

                document.getElementById('listaPedidos').appendChild(li)
            })
        })
}

listarPedidos()

// Exclui o Pedido
function excluirPedido(id) {
    fetch(`${host}/vendas/${id}`, {
        method: 'DELETE',
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert('Erro ao excluir o Pedido!')
        }
        alert('Pedido excluído com sucesso!')
        listarPedidos()
    })
}

// Mostrar Dados do Pedido
function mostrarPedido(pedido) {
    document.getElementById('updateID').value = pedido.id
    document.getElementById('updateCliente').value = pedido.clienteId
    document.getElementById('updateTelefone').value = pedido.cliente.telefone
    document.getElementById('updateEmail').value = pedido.cliente.email
    document.getElementById('updateEndereco').value = pedido.cliente.endereco
    document.getElementById('updateComplemento').value = pedido.cliente.complemento
    document.getElementById('updateCidade').value = pedido.cliente.cidade
    document.getElementById('updateEstado').value = pedido.cliente.estado
    document.getElementById('updateCEP').value = pedido.cliente.cep
    document.getElementById('updateFormaPagamento').value = pedido.formaPagamento
    document.getElementById('updateDataPedido').value = formatDate(pedido.dataPedido)
    document.getElementById('updateDataEntrega').value = formatDate(pedido.dataEntrega)
    document.getElementById('updateValorTotal').value = pedido.totalPedido.toFixed(2)
    mostrarProdutos(pedido.id)
}

// Lista todos os  Produtos do Pedido
function mostrarProdutos(id) {
    document.getElementById('listaProdutosCadastrar').innerHTML = ''
    document.getElementById('listaProdutosAtualizar').innerHTML = ''

    const pedidos = fetch(`${host}/vendas/${id}`)
        .then((resposta) => resposta.json())
        .then((pedidos) => {
            pedidos.produtos.forEach((produto) => {
                console.log(produto)
                var formatValorVenda = produto.valorVenda.toFixed(2)
                var formatValorProduto = produto.detVenda.valorProduto.toFixed(2)
                const li = document.createElement('li')
                li.className = 'list-group-item d-flex justify-content-between'
                li.innerText = `ID: ${produto.id} - Descrição: ${produto.descricao} ${produto.fichaTecnica}
                Personalização: ${produto.detVenda.personalizacao}
                Quantidade: ${produto.detVenda.quantidade} - ${produto.unidadeMedida} - Preço Unit.: ${formatValorVenda} - Total: ${formatValorProduto}`

                const span = document.createElement('span')

                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Excluir'
                botaoExcluir.className = 'btn btn-danger btn-sm'
                botaoExcluir.addEventListener('click', () => excluirProduto(id, produto.id))
                span.appendChild(botaoExcluir)

                li.appendChild(span)

                document.getElementById('listaProdutosCadastrar').appendChild(li)
                document.getElementById('listaProdutosAtualizar').appendChild(li)
            })
        })
}

// Abre o Formulário de Produto no click em Adicionar Produtos
function abrirFormProduto(origem) {
    switch (origem) {
        case 'formCadastrar':
            document.getElementById('prodPedID').value = $('#pedidoID').val()
            break
        case 'formAtualizar':
            document.getElementById('prodPedID').value = $('#updateID').val()
            break
        default:
            document.getElementById('prodPedID').value = ''
    }
    $('#produtoModal').modal('show')
}

// Aguarda o click no botão Adicionar
document.getElementById('formProduto').addEventListener('submit', function (event) {
    event.preventDefault()
    adicionarProduto(event)
})

// Adiciona Produto ao Pedido no Banco de Dados
function adicionarProduto(form) {
    const pedidoId = form.target.prodPedID.value
    const produto = {
        produtoId: form.target.selectProduto.value,
        personalizacao: form.target.personalizacao.value,
        quantidade: form.target.quantidade.value,
    }
    fetch(`${host}/vendas/${pedidoId}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
    }).then((resposta) => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao adicionar o produto no Pedido de Venda!')
        } else {
            alert('Produto adicionado com sucesso!')
        }
    })
    mostrarProdutos(pedidoId)
}

// Exclui Produto do Pedido no Banco de Dados
function excluirProduto(pedidoId, produtoId) {
    const produto = {
        produtoId: produtoId,
    }
    fetch(`${host}/vendas/${pedidoId}/produtos/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert('Erro ao excluir o produto!')
        }
        alert('Produto excluído com sucesso!')
    })
    mostrarProdutos(pedidoId)
}

// Aguarda o click no botão Atualizar
document.getElementById('formAtualizar').addEventListener('submit', function (event) {
    event.preventDefault()
    atualizarPedido(event)
})

// Atualiza Pedido no Banco de Dados
function atualizarPedido(form) {
    const pedido = {
        clienteId: form.target.updateCliente.value,
        dataPedido: form.target.updateDataPedido.value,
        dataEntrega: form.target.updateDataEntrega.value,
        formaPagamento: form.target.updateFormaPagamento.value,
    }

    fetch(`${host}/vendas/${form.target.updateID.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido),
    }).then((resposta) => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao atualizar o Pedido de Venda!')
        } else {
            alert('Pedido de Venda atualizado com sucesso!')
        }
        //form.target.reset()
        listarPedidos()
    })
}

// Abre o Formulário de Novo Pedido
function onOpenFormCadastrar() {
    document.getElementById('btnAddProdutoCadastrar').disabled = true
    document.getElementById('novoModalLabel').innerHTML = 'Novo Pedido'
    $('#novoModal').modal('show')
}

// Aguarda o click no botão Salvar
document.getElementById('formCadastrar').addEventListener('submit', function (event) {
    event.preventDefault()
    cadastrarPedido(event)
})

// Cadastra Novo Pedido no Banco de Dados
function cadastrarPedido(form) {
    const pedido = {
        clienteId: form.target.selectCliente.value,
        dataPedido: form.target.dataPedido.value,
        dataEntrega: form.target.dataEntrega.value,
        formaPagamento: form.target.formaPagamento.value,
        totalPedido: 0,
    }

    fetch(`${host}/vendas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido),
    })
        .then((resp) => resp.json())
        .then((pedidoId) => {
            if (pedidoId.hasOwnProperty('error') && !!pedidoId.error) {
                alert(pedidoId.error)
            } else {
                document.getElementById('novoModalLabel').innerHTML = `Pedido #${pedidoId.id}`
                document.getElementById('pedidoID').value = pedidoId.id
                document.getElementById('btnAddProdutoCadastrar').disabled = false
                alert('Pedido de Venda cadastrado com sucesso!')
            }
        })
    listarPedidos()
}

// Função para formatar Data
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
}

listaClientes()

// Lista Clientes no campo Select do Formulário Cadastrar
function listaClientes() {
    const clientes = fetch(`${host}/clientes`)
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

listaUpdateClientes()

// Lista Clientes no campo Select do Formulário Atualizar
function listaUpdateClientes() {
    const clientes = fetch(`${host}/clientes`)
        .then((resposta) => resposta.json())
        .then((clientes) => {
            var select = document.getElementById('updateCliente')
            clientes.forEach((option) => {
                var optionElement = document.createElement('option')
                optionElement.text = `${option.id} - ${option.nome}`
                optionElement.value = option.id
                select.add(optionElement)
            })
        })
}

// Mostra dados do Clientes no Formulário Cadastrar
function mostraDadosCliente(id) {
    const cliente = fetch(`${host}/clientes/${id}`)
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

// Mostra dados do Clientes no Formulário Atualizar
function updateDadosCliente(id) {
    const cliente = fetch(`${host}/clientes/${id}`)
        .then((resposta) => resposta.json())
        .then((cliente) => {
            document.getElementById('updateTelefone').value = cliente.telefone
            document.getElementById('updateEmail').value = cliente.email
            document.getElementById('updateEndereco').value = cliente.endereco
            document.getElementById('updateComplemento').value = cliente.complemento
            document.getElementById('updateCidade').value = cliente.cidade
            document.getElementById('updateEstado').value = cliente.estado
            document.getElementById('updateCEP').value = cliente.cep
        })
}

listaProdutos()

// Lista Produtos no campo Select do Formulário Produtos
function listaProdutos() {
    const clientes = fetch(`${host}/produtos`)
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

// Mostra dados do Produto no Formulário Produtos
function mostraDadosProduto(id) {
    const cliente = fetch(`${host}/produtos/${id}`)
        .then((resposta) => resposta.json())
        .then((produto) => {
            document.getElementById('fichaTecnica').value = produto.fichaTecnica
            document.getElementById('unidadeMedida').value = produto.unidadeMedida
            document.getElementById('tipoProduto').value = produto.tipoProduto
            document.getElementById('valorVenda').value = produto.valorVenda.toFixed(2)

            var quantidade = document.getElementById('quantidade').value
            if (quantidade > 0) {
                document.getElementById('totalProduto').value = (quantidade * document.getElementById('valorVenda').value).toFixed(2)
            }
        })
}

// Calcula o Valor total do Pedido de Venda
function calculaTotalProduto() {
    var valorVenda = document.getElementById('valorVenda').value
    if (valorVenda > 0) {
        document.getElementById('totalProduto').value = (valorVenda * document.getElementById('quantidade').value).toFixed(2)
    }
}
