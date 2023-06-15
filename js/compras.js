const host = "https://pi-fatec2s-maracujadesign.onrender.com"
// Lista Todos os Pedidos de Compras
function listarCompras() {
    document.getElementById("listaCompras").innerHTML = ""

    const compras = fetch(`${host}/compras`)
        .then((resposta) => resposta.json())
        .then((compras) => {
            compras.forEach((compra) => {
                data = new Date(compra.dataPedido)
                data2 = new Date(compra.dataEntrega)
                formatData = data.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                })
                formatData2 = data2.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                })
                formatTotal = compra.totalPedido.toFixed(2)
                const li = document.createElement("li")
                li.className =
                    "list-group-item d-flex justify-content-between list-group-item-secondary"
                li.innerText = `ID: ${compra.id} - Data do compra: ${formatData} - Data da Entrega: ${formatData2} - Forma Pagto.: ${compra.formaPagamento} - Valor Total: ${formatTotal}
                fornecedor: ${compra.fornecedor.nome} - Telefone: ${compra.fornecedor.telefone} - Email: ${compra.fornecedor.email}`

                const span = document.createElement("span")

                const botaoExcluir = document.createElement("button")
                botaoExcluir.textContent = "Excluir"
                botaoExcluir.className = "btn btn-danger btn-sm"
                botaoExcluir.addEventListener("click", () =>
                    excluirCompra(compra.id)
                )
                span.appendChild(botaoExcluir)

                const space = document.createElement("span")
                space.textContent = " "
                span.appendChild(space)

                const botaoAtualizar = document.createElement("button")
                botaoAtualizar.textContent = "Atualizar"
                botaoAtualizar.className = "btn btn-warning btn-sm"
                botaoAtualizar.setAttribute("data-toggle", "modal")
                botaoAtualizar.setAttribute("data-target", "#updateModal")
                botaoAtualizar.addEventListener("click", () =>
                    mostrarCompra(compra)
                )
                span.appendChild(botaoAtualizar)

                li.appendChild(span)

                document.getElementById("listaCompras").appendChild(li)
            })
        })
}

listarCompras()

// Exclui o Pedido de Compra
function excluirCompra(id) {
    fetch(`${host}/compras/${id}`, {
        method: "DELETE",
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert("Erro ao excluir o Pedido de Compras!")
        }
        alert("Pedido de Compras excluído com sucesso!")
        listarCompras()
    })
}

// Mostrar Dados do Pedido de Compras
function mostrarCompra(compra) {
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
    document.getElementById("updateDataEntrega").value = formatDate(
        compra.dataEntrega
    )
    document.getElementById("updateValorTotal").value =
        compra.totalPedido.toFixed(2)
    mostrarProdutos(compra.id)
}

// Lista todos os  Produtos do Pedido
function mostrarProdutos(id) {
    document.getElementById("listaProdutosCadastrar").innerHTML = ""
    document.getElementById("listaProdutosAtualizar").innerHTML = ""

    const compras = fetch(`${host}/compras/${id}`)
        .then((resposta) => resposta.json())
        .then((compras) => {
            compras.produtos.forEach((produto) => {
                console.log(produto)
                var formatvalorCompra = produto.valorCompra.toFixed(2)
                var formatValorProduto =
                    produto.detCompra.valorProduto.toFixed(2)
                const li = document.createElement("li")
                li.className = "list-group-item d-flex justify-content-between"
                li.innerText = `ID: ${produto.id} - Descrição: ${produto.descricao} ${produto.fichaTecnica}
                Personalização: ${produto.detCompra.personalizacao}
                Quantidade: ${produto.detCompra.quantidade} - ${produto.unidadeMedida} - Preço Unit.: ${formatvalorCompra} - Total: ${formatValorProduto}`

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
            document.getElementById("prodPedID").value = $("#compraID").val()
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
    const compraId = form.target.prodPedID.value
    const produto = {
        produtoId: form.target.selectProduto.value,
        personalizacao: form.target.personalizacao.value,
        quantidade: form.target.quantidade.value,
    }
    fetch(`${host}/compras/${compraId}/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
    }).then((resposta) => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert("Erro ao adicionar o produto no Pedido de Compras!")
        } else {
            alert("Produto adicionado com sucesso!")
        }
    })
    mostrarProdutos(compraId)
}

// Exclui Produto do Pedido no Banco de Dados
function excluirProduto(compraId, produtoId) {
    const produto = {
        produtoId: produtoId,
    }
    fetch(`${host}/compras/${compraId}/produtos/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert("Erro ao excluir o produto!")
        }
        alert("Produto excluído com sucesso!")
    })
    mostrarProdutos(compraId)
}

// Aguarda o click no botão Atualizar
document
    .getElementById("formAtualizar")
    .addEventListener("submit", function (event) {
        event.preventDefault()
        atualizarCompra(event)
    })

// Atualiza Pedido no Banco de Dados
function atualizarCompra(form) {
    const compra = {
        fornecedorId: form.target.updatefornecedor.value,
        dataPedido: form.target.updateDataPedido.value,
        dataEntrega: form.target.updateDataEntrega.value,
        formaPagamento: form.target.updateFormaPagamento.value,
    }

    fetch(`${host}/compras/${form.target.updateID.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compra),
    }).then((resposta) => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert("Erro ao atualizar o Pedido de Compra!")
        } else {
            alert("Pedido de Compra atualizado com sucesso!")
        }
        //form.target.reset()
        listarCompras()
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
    .getElementById("formCadastrar")
    .addEventListener("submit", function (event) {
        event.preventDefault()
        cadastrarCompra(event)
    })

// Cadastra Novo Pedido no Banco de Dados
function cadastrarCompra(form) {
    const compra = {
        fornecedorId: form.target.selectFornecedor.value,
        dataPedido: form.target.dataPedido.value,
        dataEntrega: form.target.dataEntrega.value,
        formaPagamento: form.target.formaPagamento.value,
        totalPedido: 0,
    }

    fetch(`${host}/compras`, {
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
                document.getElementById("compraID").value = compraId.id
                document.getElementById(
                    "btnAddProdutoCadastrar"
                ).disabled = false
                alert("Pedido de Compra cadastrado com sucesso!")
            }
        })
    listarCompras()
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
    const fornecedores = fetch(`${host}/Fornecedores`)
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
    const fornecedores = fetch(`${host}/Fornecedores`)
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

// Mostra dados do Fornecedor no Formulário Cadastrar
function mostraDadosFornecedor(id) {
    const fornecedor = fetch(`${host}/Fornecedores/${id}`)
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

// Mostra dados dos fornecedores no Formulário Atualizar
function updateDadosFornecedor(id) {
    const fornecedor = fetch(`${host}/Fornecedores/${id}`)
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

// Lista Produtos no campo Select do Formulário Produtos
function listaProdutos() {
    const fornecedores = fetch(`${host}/produtos`)
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

// Calcula o Valor total do Pedido de Compra
function calculaTotalProduto() {
    var valorCompra = document.getElementById("valorCompra").value
    if (valorCompra > 0) {
        document.getElementById("totalProduto").value = (
            valorCompra * document.getElementById("quantidade").value
        ).toFixed(2)
    }
}
