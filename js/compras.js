listaFornecedores()

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
            alert("Erro ao cadastrar o Pedido de Compra!")
        } else {
            alert("Pedido de Compra cadastrado com sucesso!")
            document.getElementById("btnAddNovo").disabled = false
        }
        atualizarCompra()
    })
}

function deleteCompra(id) {
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/compras/${id}`, {
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
function alterarCompras(id) {
    const comprasDados = fetch(
        `https://pi-fatec2s-maracujadesign.onrender.com/compras/${id}`
    )
        .then((resposta) => {
            if (resposta.status != 200) {
                atualizarCompra()
                throw erro("Compra não existe")
            }
            return resposta.json()
        })
        .catch((erro) => alert("Compra não existe!"))
        .then((comprasDados) => {
            const ul = document.getElementById("listaCompras")
            const par = document.createElement("p")
            ul.innerHTML = ""

            const attCompra = document.createElement("form")
            attCompra.className = "reg"
            attCompra.method = "post"
            attCompra.id = "formAtt"

            const attId = document.createElement("input")
            attId.type = "hidden"
            attId.id = "id"
            attId.value = comprasDados.id

            let attfornecedorId = document.createElement("input")
            attfornecedorId.setAttribute("type", "number")
            attfornecedorId.setAttribute("name", "fornecedorId")
            attfornecedorId.setAttribute("placeholder", "fornecedorId")
            attfornecedorId.setAttribute("id", "fornecedorId")
            attfornecedorId.setAttribute("class", "form-control")
            attfornecedorId.setAttribute("value", comprasDados.fornecedorId)

            let attdataPedido = document.createElement("input")
            attdataPedido.setAttribute("type", "date")
            attdataPedido.setAttribute("name", "dataPedido")
            attdataPedido.setAttribute("placeholder", "dataPedido")
            attdataPedido.setAttribute("id", "dataPedido")
            attdataPedido.setAttribute("class", "form-control")
            attdataPedido.setAttribute("value", comprasDados.dataPedido)

            let attdataEntrega = document.createElement("input")
            attdataEntrega.setAttribute("type", "date")
            attdataEntrega.setAttribute("name", "dataEntrega")
            attdataEntrega.setAttribute("placeholder", "dataEntrega")
            attdataEntrega.setAttribute("id", "dataEntrega")
            attdataEntrega.setAttribute("class", "form-control")
            attdataEntrega.setAttribute("value", comprasDados.dataEntrega)

            let attformaPagamento = document.createElement("input")
            attformaPagamento.setAttribute("type", "text")
            attformaPagamento.setAttribute("name", "formaPagamento")
            attformaPagamento.setAttribute("placeholder", "formaPagamento")
            attformaPagamento.setAttribute("id", "formaPagamento")
            attformaPagamento.setAttribute("class", "form-control")
            attformaPagamento.setAttribute("value", comprasDados.formaPagamento)

            let atttotalPedido = document.createElement("input")
            atttotalPedido.setAttribute("type", "text")
            atttotalPedido.setAttribute("name", "totalPedido")
            atttotalPedido.setAttribute("placeholder", "totalPedido")
            atttotalPedido.setAttribute("id", "totalPedido")
            atttotalPedido.setAttribute("class", "form-control")
            atttotalPedido.setAttribute("value", comprasDados.totalPedido)
            const submit = document.createElement("button")
            submit.className = "btn2"
            submit.innerText = "Alterar"

            attCompra.appendChild(attId)
            attCompra.appendChild(attfornecedorId)
            attCompra.appendChild(attdataPedido)
            attCompra.appendChild(attdataEntrega)
            attCompra.appendChild(attformaPagamento)
            attCompra.appendChild(par)
            attCompra.appendChild(atttotalPedido)
            attCompra.appendChild(submit)
            attCompra.appendChild(par)
            ul.appendChild(attCompra)

            const Att = document.getElementById("formAtt")
            Att.addEventListener("submit", (event) => {
                event.preventDefault()
                //console.log(event.target.id.value)
                modificarCompra(event)
            })
        })
}

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
            alert("Erro ao modificar!")
        } else alert("Modificado com sucesso!")
        window.location.href = "compras.html"
    })
}
