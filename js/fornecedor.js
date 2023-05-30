function atualizarFornecedor() {
    // Limpa a lista de fornecedor
    document.getElementById('listaFornecedor').innerHTML = ''
    // Faz uma requisição Fetch para o endereço localhost:3000/fornecedor
    // e retorna um array de objetos JSON
    const fornecedores = fetch('http://localhost:3000/fornecedor')
        .then(resposta => resposta.json())
        .then(fornecedores => {
            // Para cada objeto JSON do array
            // cria um elemento <li> e adiciona ao <ul id="listaContatos">        
            fornecedores.forEach(fornecedor => {
                const li = document.createElement('li')
                li.textContent = `${fornecedor.nome} - ${fornecedor.email}`
                // Adiciona um botão de excluir para cada contato
                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Excluir'
                botaoExcluir.className = 'btn btn-danger m-1'
                botaoExcluir.addEventListener('click', () => deleteFornecedor(fornecedor.id))
                li.appendChild(botaoExcluir)

                // Adiciona um botão de atualizar para cada contato
                const botaoAtualizar = document.createElement('button')
                botaoAtualizar.textContent = 'Atualizar'
                botaoAtualizar.className = 'btn btn-warning m-1'
                botaoAtualizar.addEventListener('click', () => showContato(fornecedor))
                li.appendChild(botaoAtualizar)

                document.getElementById('listaFornecedores').appendChild(li)
            })
        })
}

function showFornecedor(fornecedor) {
    document.getElementById('nomeUpdate').value = fornecedor.nome
    document.getElementById('emailUpdate').value = fornecedor.email
    document.getElementById('telefoneUpdate').value = fornecedor.telefone
    document.getElementById('idUpdate').value = fornecedor.id
    document.getElementById('btnUpdate').disabled = false
}

function deleteFornecedor(id) {
    fetch(`http://localhost:3000/fornecedor/${id}`, {
        method: 'DELETE'
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao excluir fornecedor!')
        }
        alert('Fornecedor excluído com sucesso!')
        atualizarFornecedor()
    })
}

atualizarFornecedor()

document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault()
    cadastrarFornecedor(event)
});

function cadastrarFornecedor(form) {
    const fornecedor = {
        nome: form.target.nome.value,
        email: form.target.email.value,
        telefone: form.target.telefone.value
    }

    fetch('http://localhost:3000/fornecedor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor)
    }).then(resposta => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao cadastrar fornecedor!')
        }
        alert('Contato cadastrado com sucesso!')
        form.target.reset()
        atualizarContatos()
    })
}

document.getElementById("formUpdate").addEventListener("submit", function (event) {
    event.preventDefault()
    atualizarContato(event)
});

function atualizarContato(form) {
    const contato = {
        nome: form.target.nomeUpdate.value,
        email: form.target.emailUpdate.value,
        telefone: form.target.telefoneUpdate.value
    }

    fetch(`http://localhost:3000/contatos/${form.target.idUpdate.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contato)
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao atualizar contato!')
        }
        alert('Contato atualizado com sucesso!')
        form.target.reset()
        atualizarContatos()
        document.getElementById('btnUpdate').disabled = true
    })
}