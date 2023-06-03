listaCompras()

function atualizarCompra() {
    document.getElementById("listaCompras").innerHTML = ""

    const pedidos = fetch(
        "https://pi-fatec2s-maracujadesign.onrender.com/compras"
    )
        .then((resposta) => resposta.json())
        .then((pCompras) => {
            pCompras.forEach((compra) => {
                data = new Date(compra.dataPedido)
                formatData = data.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                })
                formatTotal = compra.totalPedido.toFixed(2)
                const li = document.createElement("li")
                li.className =
                    "list-group-item d-flex justify-content-between list-group-item-secondary"
                li.innerText = `ID: ${compra.id} - Data: ${formatData} - Forma Pagto.: ${compra.formaPagamento} - Valor Total: ${formatTotal}
                Cliente: ${compra.fornecedor.nome} - Telefone: ${compra.fornecedor.telefone} - Email: ${compra.fornecedor.email}`

                const span = document.createElement("span")

                // Adiciona um botão de excluir para cada Compra
                const botaoExcluir = document.createElement("button")
                botaoExcluir.textContent = "Excluir"
                botaoExcluir.className = "btn btn-danger btn-sm"
                botaoExcluir.addEventListener("click", () =>
                    deleteCompra(compra.id)
                )
                span.appendChild(botaoExcluir)

                // Adiciona um botão de atualizar para cada compra
                const botaoAtualizar = document.createElement("button")
                botaoAtualizar.textContent = "Atualizar"
                botaoAtualizar.className = "btn btn-warning btn-sm"
                botaoAtualizar.addEventListener("click", () =>
                    mostrarCompra(compra)
                )
                span.appendChild(botaoAtualizar)

                li.appendChild(span)

                document.getElementById("listaCompras").appendChild(li)
            })
        })
}

atualizarCompra()

document
    .getElementById("formNovoPedido")
    .addEventListener("submit", function (event) {
        event.preventDefault()
        cadastrarCompra(event)
    })

function cadastrarCompra(form) {
    const compra = {
        fornecedorId: form.target.selectFornecedor.value,
        dataPedido: form.target.dataPedido.value,
        dataEntrega: form.target.dataEntrega.value,
        formaPagamento: form.target.formaPagamento.value,
        totalPedido: 0,
    }

    fetch("https://pi-fatec2s-maracujadesign.onrender.com/compras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compra),
    }).then((resposta) => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert("Erro ao cadastrar o Pedido de Venda!")
        } else {
            alert("Pedido de Venda cadastrado com sucesso!")
            document.getElementById("btnAddNovo").disabled = false
        }
        atualizarCompra()
    })
}

function deleteCompra(id) {
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/vendas/${id}`, {
        method: "DELETE",
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert("Erro ao excluir o Pedido!")
        }
        alert("Pedido excluído com sucesso!")
        atualizarCompra()
    })
}

function listaFornecedores() {
    const fornecedores = fetch(
        "https://pi-fatec2s-maracujadesign.onrender.com/fornecedores"
    )
        .then((resposta) => resposta.json())
        .then((fornecedores) => {
            var select = document.getElementById("selectFornecedor")
            fornecedores.forEach((option) => {
                var optionElement = document.createElement("option")
                optionElement.text = `${option.id} - ${option.nome}`
                optionElement.value = option.id
                select.add(optionElement)
            })
        })
}

function mostraDadosFornecedores(id) {
    const fornecedor = fetch(
        `https://pi-fatec2s-maracujadesign.onrender.com/fornecedores/${id}`
    )
        .then((resposta) => resposta.json())
        .then((fornecedor) => {
            document.getElementById("showTelefone").value = fornecedor.telefone
            document.getElementById("showEmail").value = fornecedor.email
            document.getElementById("showEndereco").value = fornecedor.endereco
            document.getElementById("showComplemento").value =
                fornecedor.complemento
            document.getElementById("showCidade").value = fornecedor.cidade
            document.getElementById("showEstado").value = fornecedor.estado
            document.getElementById("showCEP").value = fornecedor.cep
        })
}

function listaProdutos() {
    const produtos = fetch(
        "https://pi-fatec2s-maracujadesign.onrender.com/produtos"
    )
        .then((resposta) => resposta.json())
        .then((produtos) => {
            var select = document.getElementById("selectProduto")
            produtos.forEach((option) => {
                var optionElement = document.createElement("option")
                optionElement.text = `${option.id} - ${option.descricao}`
                optionElement.value = option.id
                select.add(optionElement)
            })
        })
}

function mostraDadosProduto(id) {
    const produto = fetch(
        `https://pi-fatec2s-maracujadesign.onrender.com/produtos/${id}`
    )
        .then((resposta) => resposta.json())
        .then((produto) => {
            document.getElementById("showTelefone").value = produto.descricao
            // document.getElementById('showEmail').value = produto.xxx
            // document.getElementById('showEndereco').value = produto.xxx
            // document.getElementById('showComplemento').value = produto.xxx
            // document.getElementById('showCidade').value = produto.xxx
            // document.getElementById('showEstado').value = produto.xxx
            // document.getElementById('showCEP').value = produto.xxx
        })
}
