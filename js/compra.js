function criarCompras(form) {
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
        if (resposta.status != 200) {
            alert("Erro ao cadastrar!")
        } else {
            alert("Cadastrado com sucesso!")
            window.location.href = "compras.html"
        }
    })
}
const formReg = document.getElementById("formCadastro")
formReg.addEventListener("submit", (event) => {
    event.preventDefault()
    //console.log(event.target.dataPedido.value)
    criarCompras(event)
})

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
