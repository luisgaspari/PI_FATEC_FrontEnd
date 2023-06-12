listaFornecedores()

function mostrarCompras() {
    document.getElementById("listaCompras").innerHTML = ""

    const pCompras = fetch(
        "https://pi-fatec2s-maracujadesign.onrender.com/compras"
    )
        .then((resposta) => resposta.json())
        .then((pCompras) => {
            pCompras.forEach((compra) => {
                data = new Date(compra.dataPedido)
                formatData = data.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                })
                data2 = new Date(compra.dataEntrega)
                formatData2 = data2.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                })
                formatTotal = compra.totalPedido.toFixed(2)
                const li = document.createElement("li")
                li.className =
                    "list-group-item d-flex justify-content-between list-group-item-secondary"
                li.innerText = `ID: ${compra.id} - Data do Pedido: ${formatData} - Data de Entrega: ${formatData2} - Forma Pagto.: ${compra.formaPagamento} - Valor Total: ${formatTotal}
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
                botaoAtualizar.setAttribute("data-toggle", "modal")
                botaoAtualizar.setAttribute("data-target", "#updateModal")
                botaoAtualizar.addEventListener("click", () =>
                    mostrarCompras(compra)
                )
                span.appendChild(botaoAtualizar)

                li.appendChild(span)

                document.getElementById("listaCompras").appendChild(li)
            })
        })
}

mostrarCompras()

// Mostrar Dados do Pedido de Compra
function deleteCompra(id) {
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/compras/${id}`, {
        method: "DELETE",
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert("Erro ao excluir o Pedido de Compra!")
        }
        alert("Pedido de Compra excluído com sucesso!")
        atualizarCompra()
    })
}
// Mostrar Dados do Pedido de Compra
function mostrarCompras(compra) {
    document.getElementById("updateID").value = compra.id
    document.getElementById("updateFornecedor").value = compra.fornecedorId
    document.getElementById("updateTelefone").value = compra.fornecedor.telefone
    document.getElementById("updateEmail").value = compra.fornecedor.email
    document.getElementById("updateEndereco").value = compra.fornecedor.endereco
    document.getElementById("updateComplemento").value =
        compra.fornecedor.complemento
    document.getElementById("updateCidade").value = compra.fornecedor.cidade
    document.getElementById("updateEstado").value = compra.fornecedor.estado
    document.getElementById("updateCEP").value = compra.fornecedor.cep
    document.getElementById("updateFormaPagamento").value =
        compra.formaPagamento
    document.getElementById("updateDataPedido").value = formatDate(
        compra.dataPedido
    )
    document.getElementById("updateDataEntrega").value = formatDate2(
        compra.dataEntrega
    )
    document.getElementById("updateValorTotal").value =
        compra.totalPedido.toFixed(2)
    mostrarProdutos(compra.id)
}

// Lista todos os  Produtos do Pedido de compras
function mostrarProdutos(id) {
    document.getElementById("listaProdutosCadastrar").innerHTML = ""
    document.getElementById("listaProdutosAtualizar").innerHTML = ""

    const compras = fetch(`${host}/vendas/${id}`)
        .then((resposta) => resposta.json())
        .then((compras) => {
            compras.produtos.forEach((compra) => {
                console.log(produto)
                var formatValorCompra = produto.valorCompra.toFixed(2)
                var formatValorProduto =
                    produto.detCompra.valorProduto.toFixed(2)
                const li = document.createElement("li")
                li.className = "list-group-item d-flex justify-content-between"
                li.innerText = `ID: ${produto.id} - Descrição: ${produto.descricao} ${produto.fichaTecnica}
                Personalização: ${produto.detCompra.personalizacao}
                Quantidade: ${produto.detCompra.quantidade} - ${produto.unidadeMedida} - Preço Unit.: ${formatValorCompra} - Total: ${formatValorProduto}`

                const span = document.createElement("span")

                const botaoExcluir = document.createElement("button")
                botaoExcluir.textContent = "Excluir"
                botaoExcluir.className = "btn btn-danger btn-sm"
                botaoExcluir.addEventListener("click", () =>
                    excluirProduto(id, produto.id)
                )
                span.appendChild(botaoExcluir)

                li.appendChild(span)

                document
                    .getElementById("listaProdutosCadastrar")
                    .appendChild(li)
                document
                    .getElementById("listaProdutosAtualizar")
                    .appendChild(li)
            })
        })
}

// Abre o Formulário de Produto no click em Adicionar Produtos
function abrirFormProduto(origem) {
    switch (origem) {
        case "formCadastrar":
            document.getElementById("prodPedID").value = $("#pedidoID").val()
            break
        case "formAtualizar":
            document.getElementById("prodPedID").value = $("#updateID").val()
            break
        default:
            document.getElementById("prodPedID").value = ""
    }
    $("#produtoModal").modal("show")
}

// Aguarda o click no botão Adicionar
document
    .getElementById("formProduto")
    .addEventListener("submit", function (event) {
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
    fetch(
        `https://pi-fatec2s-maracujadesign.onrender.com/vendas/${pedidoId}/produtos/`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto),
        }
    ).then((resposta) => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert("Erro ao adicionar o produto no Pedido de Compra!")
        } else {
            alert("Produto adicionado com sucesso!")
        }
    })
    mostrarProdutos(pedidoId)
}

// Exclui Produto do Pedido de compras no Banco de Dados
function excluirProduto(pedidoId, produtoId) {
    const produto = {
        produtoId: produtoId,
    }
    fetch(`${host}/vendas/${pedidoId}/produtos/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert("Erro ao excluir o produto!")
        }
        alert("Produto excluído com sucesso!")
    })
    mostrarProdutos(pedidoId)
}

// Aguarda o click no botão Atualizar
document
    .getElementById("formAtualizar")
    .addEventListener("submit", function (event) {
        event.preventDefault()
        atualizarPedido(event)
    })
// Atualiza Pedido no Banco de Dados
function modificarCompra(form) {
    const compraAtt = {
        fornecedorId: form.target.fornecedorId.value,
        dataPedido: form.target.dataPedido.value,
        dataEntrega: form.target.dataEntrega.value,
        formaPagamento: form.target.formaPagamento.value,
        totalPedido: form.target.totalPedido.value,
    }
    fetch(
        `https://pi-fatec2s-maracujadesign.onrender.com/compras/${form.target.id.value}`,
        {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(compraAtt),
        }
    ).then((resposta) => {
        if (resposta.status != 200) {
            alert("Erro ao Atualizar pedido de Compras!")
        } else alert("Atualizado pedido de Compras com sucesso!")
        window.location.href = "compras.html"
    })
}
// Abre o Formulário de Novo Pedido
function onOpenFormCadastrar() {
    document.getElementById("btnAddProdutoCadastrar").disabled = true
    document.getElementById("novoModalLabel").innerHTML = "Novo Pedido"
    $("#novoModal").modal("show")
}
// Aguarda o click no botão Salvar
document
    .getElementById("formNovoPedido")
    .addEventListener("submit", function (event) {
        event.preventDefault()
        cadastrarCompra(event)
    })
// Cadastra Novo Pedido de compras no Banco de Dados
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
    })
        .then((resp) => resp.json())
        .then((compraId) => {
            if (compraId.hasOwnProperty("error") && !!compraId.error) {
                alert(compraId.error)
            } else {
                document.getElementById(
                    "novoModalLabel"
                ).innerHTML = `Pedido #${compraId.id}`
                document.getElementById("pedidoID").value = compraId.id
                document.getElementById(
                    "btnAddProdutoCadastrar"
                ).disabled = false
                alert("Pedido de Compra cadastrado com sucesso!")
            }
        })
    mostrarCompras()
}

// Função para formatar Data
function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) month = "0" + month
    if (day.length < 2) day = "0" + day

    return [year, month, day].join("-")
}
listaFornecedores()
// Lista Fornecedores no campo Select do Formulário Cadastrar
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

listaUpdateFornecedores()

// Lista Fornecedores no campo Select do Formulário Atualizar
function listaUpdateFornecedores() {
    const fornecedores = fetch(
        `https://pi-fatec2s-maracujadesign.onrender.com/fornecedores`
    )
        .then((resposta) => resposta.json())
        .then((fornecedores) => {
            var select = document.getElementById("updateFornecedor")
            fornecedores.forEach((option) => {
                var optionElement = document.createElement("option")
                optionElement.text = `${option.id} - ${option.nome}`
                optionElement.value = option.id
                select.add(optionElement)
            })
        })
}
// Mostra dados do Fornecedor no Formulário Atualizar
function updateDadosFornecedor(id) {
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
// Mostra dados do Fornecedor no Formulário Cadastrar
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
// Mostra dados do Fornecedores no Formulário Atualizar
function updateDadosFornecedor(id) {
    const fornecedor = fetch(
        `https://pi-fatec2s-maracujadesign.onrender.com/fornecedores/${id}`
    )
        .then((resposta) => resposta.json())
        .then((fornecedor) => {
            document.getElementById("updateTelefone").value =
                fornecedor.telefone
            document.getElementById("updateEmail").value = fornecedor.email
            document.getElementById("updateEndereco").value =
                fornecedor.endereco
            document.getElementById("updateComplemento").value =
                fornecedor.complemento
            document.getElementById("updateCidade").value = fornecedor.cidade
            document.getElementById("updateEstado").value = fornecedor.estado
            document.getElementById("updateCEP").value = fornecedor.cep
        })
}

// Mostra dados do Fornecedor no Formulário Atualizar
function updateDadosCliente(id) {
    const fornecedor = fetch(
        `https://pi-fatec2s-maracujadesign.onrender.com/fornecedores/${id}`
    )
        .then((resposta) => resposta.json())
        .then((fornecedor) => {
            document.getElementById("updateTelefone").value =
                fornecedor.telefone
            document.getElementById("updateEmail").value = fornecedor.email
            document.getElementById("updateEndereco").value =
                fornecedor.endereco
            document.getElementById("updateComplemento").value =
                fornecedor.complemento
            document.getElementById("updateCidade").value = fornecedor.cidade
            document.getElementById("updateEstado").value = fornecedor.estado
            document.getElementById("updateCEP").value = fornecedor.cep
        })
}

listaProdutos()

function listaProdutos() {
    const fornecedor = fetch(
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

// Mostra dados do Produto no Formulário Produtos
function mostraDadosProduto(id) {
    const fornecedor = fetch(`${host}/produtos/${id}`)
        .then((resposta) => resposta.json())
        .then((produto) => {
            document.getElementById("fichaTecnica").value = produto.fichaTecnica
            document.getElementById("unidadeMedida").value =
                produto.unidadeMedida
            document.getElementById("tipoProduto").value = produto.tipoProduto
            document.getElementById("valorCompra").value =
                produto.valorCompra.toFixed(2)

            var quantidade = document.getElementById("quantidade").value
            if (quantidade > 0) {
                document.getElementById("totalProduto").value = (
                    quantidade * document.getElementById("valorCompra").value
                ).toFixed(2)
            }
        })
}

// Calcula o Valor total do Pedido de Venda
function calculaTotalProduto() {
    var valorCompra = document.getElementById("valorCompra").value
    if (valorCompra > 0) {
        document.getElementById("totalProduto").value = (
            valorCompra * document.getElementById("quantidade").value
        ).toFixed(2)
    }
}
