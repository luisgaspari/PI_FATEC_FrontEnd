function atualizarCompras() {
    const ul = document.getElementById("listaCompras")
    ul.innerHTML = ""

    const compras = fetch(
        "https://pi-fatec2s-maracujadesign.onrender.com/compras/"
    )
        .then((resposta) => resposta.json())
        .then((comprasDados) => {
            comprasDados.forEach((compra) => {
                const par = document.createElement("p")
                const form = document.createElement("input")

                form.setAttribute("type", "submit")
                form.setAttribute("class", "list")
                form.addEventListener("click", () => procurarCompra(compra.id))
                form.setAttribute(
                    "value",
                    `ID Compra: ${compra.id}
Fornecedor: ${compra.fornecedorId}
Data do Pedido: ${compra.dataPedido}
Data do Entrega: ${compra.dataPedido}
Forma de Pagamento: ${compra.formaPagamento}
Total do Pedido: ${compra.totalPedido}
`
                )

                const ul = document.getElementById("listaCompras")
                ul.appendChild(form)
                ul.appendChild(par)
            })
        })
}

atualizarCompras()

function procurarCompras(id) {
    const client = fetch(
        `https://pi-fatec2s-maracujadesign.onrender.com/compras/${id}`
    )
        .then((resposta) => {
            if (resposta.status != 200) {
                atualizarClientes()
                throw erro("Compra não existe")
            }
            return resposta.json()
        })
        .catch((erro) => alert("Compra não existe!"))
        .then((comprasDados) => {
            const ul = document.getElementById("listaCompras")
            const par = document.createElement("p")
            ul.innerHTML = ""

            const procCompra = document.createElement("p")
            procCompra.className = "reg"
            procCompra.innerText = `
            ID: ${comprasDados.id}
            Fornecedor: ${comprasDados.fornecedorId}`

            ul.appendChild(procCompra)
            ul.appendChild(par)

            //botao Update
            const btnUpdate = document.createElement("button")
            btnUpdate.className = "btn2"
            btnUpdate.innerText = "Alterar"
            btnUpdate.addEventListener("click", () =>
                alterarCliente(comprasDados.id)
            )
            ul.appendChild(btnUpdate)

            ul.appendChild(par)

            //botao Delete
            const btnDelete = document.createElement("button")
            btnDelete.className = "btn2"
            btnDelete.innerText = "Remover"
            btnDelete.addEventListener("click", () =>
                deletarCliente(comprasDados.id)
            )
            ul.appendChild(btnDelete)
        })
}

function deletarCompras(id) {
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/compras/${id}`, {
        method: "DELETE",
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert("Erro ao excluir!")
        } else alert("Excluído com sucesso!")
        atualizarCompras()
    })
}

function alterarCompras(id) {
    const client = fetch(
        `https://pi-fatec2s-maracujadesign.onrender.com/compras/${id}`
    )
        .then((resposta) => {
            if (resposta.status != 200) {
                atualizarCompras()
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
            attformaPagamento.setAttribute("value", clienteDados.formaPagamento)

            let atttotalPedido = document.createElement("input")
            atttotalPedido.setAttribute("type", "text")
            atttotalPedido.setAttribute("name", "totalPedido")
            atttotalPedido.setAttribute("placeholder", "totalPedido")
            atttotalPedido.setAttribute("id", "totalPedido")
            atttotalPedido.setAttribute("class", "form-control")
            atttotalPedido.setAttribute("value", clienteDados.totalPedido)
            const submit = document.createElement("button")
            submit.className = "btn2"
            submit.innerText = "Alterar"
            /*submit.addEventListener('click', (event) => {
            event.preventDefault()
            console.log(event.target.nome)
            //modificarCliente(event)
        })*/

            attCliente.appendChild(attId)
            attCliente.appendChild(attfornecedorId)
            attCliente.appendChild(attdataPedido)
            attCliente.appendChild(attdataEntrega)
            attCliente.appendChild(attformaPagamento)
            attCliente.appendChild(par)
            attCliente.appendChild(atttotalPedido)
            attCliente.appendChild(submit)
            attCliente.appendChild(par)
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
/*function atualizarCompras() {
    const ul = document.getElementById("listaCompras")
    ul.innerHTML = ""

    const Compras = fetch(
        "https://pi-fatec2s-maracujadesign.onrender.com/compras"
    )
        .then((resposta) => resposta.json())
        .then((ComprasDados) => {
            ComprasDados.forEach((compra) => {
                const li = document.createElement("li")
                li.innerText = `"Id Fornecedor:" = ${compra.fornecedorId} - "Data Pedido:" ${compra.dataPedido} - "Data Entrega:" ${compra.dataEntrega} "Forma de Pagamento:" ${compra.formaPagamento} -"Total do Pedido:" ${compra.totalPedido}`
                //Botao deletar
                const btnDelete = document.createElement("button")
                btnDelete.innerText = "Remover"
                btnDelete.className = "btn btn-danger"
                btnDelete.addEventListener("click", () =>
                    deletarCompra(compra.id)
                )
                li.appendChild(btnDelete)
                const ul = document.getElementById("listaCompras")
                ul.appendChild(li)
            })
        })
}
atualizarCompras()

const formCadastro = document.getElementById("formCadastro")
formCadastro.addEventListener("submit", (event) => {
    event.preventDefault()
    cadastrarCompra(event)
})

function cadastrarCompra(form) {
    const compraNova = {
        fornecedorId: form.target.fornecedorId.value,
        dataPedido: form.target.dataPedido.value,
        dataEntrega: form.target.dataEntrega.value,
        formaPagamento: form.target.formaPagamento.value,
        totalPedido: form.target.totalPedido.value,
    }
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/compras`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(compraNova),
    }).then((resposta) => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert("Erro ao Cadastrar!!")
            return
        }
        alert("Cadastro com sucesso!!")
        atualizarCompras()
    })
}

function deletarCompra(id) {
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/compras/${id}`, {
        method: "DELETE",
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert("Erro ao Deletar!!")
            return
        }
        alert("Removido com sucesso!!")
        atualizarCompras()
    })
}

function listarCompras() {
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/compras`, {
        method: "GET",
    }).then((resposta) => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert("Erro ao Listar!!")
            return
        }
        alert("Listado com sucesso!!")
    })
}*/
