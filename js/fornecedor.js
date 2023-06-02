function atualizaFornecedores() {
    document.getElementById('listaFornecedor').innerHTML = ''
    const fornecedores = fetch('http://localhost:3000/fornecedores')
        .then((resposta) => resposta.json())
        .then((fornecedores) => {
            fornecedores.forEach((fornecedor) => {
                const li = document.createElement('li')
                li.className = 'list-group-item d-flex justify-content-between list-group-item-secondary'
                li.innerText = `ID: ${fornecedor.id} - Nome: ${fornecedor.nome} - CNPJ: ${fornecedor.cnpj} - Telefone: ${fornecedor.telefone} - Email: ${fornecedor.email}
                Endereço: ${fornecedor.endereco} - ${fornecedor.bairro} - ${fornecedor.cidade} - ${fornecedor.estado} - ${fornecedor.cep}`

                const span = document.createElement('span')

                // Adiciona um botão de excluir para cada contato
                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Excluir'
                botaoExcluir.className = 'btn btn-danger btn-sm'
                botaoExcluir.addEventListener('click', () => deleteFornecedor(fornecedor.id))
                span.appendChild(botaoExcluir)

                // Adiciona um botão de atualizar para cada contato
                const botaoAtualizar = document.createElement('button')
                botaoAtualizar.textContent = 'Atualizar'
                botaoAtualizar.className = 'btn btn-warning btn-sm'
                botaoAtualizar.addEventListener('click', () => showFornecedor(fornecedor))
                span.appendChild(botaoAtualizar)

                li.appendChild(span)

                document.getElementById('listaFornecedor').appendChild(li)
            })
        })
}

function showFornecedor(fornecedor) {
    document.getElementById('nomeUpdate').value = fornecedor.nome
    document.getElementById('cnpjUpdate').value = fornecedor.cnpj
    document.getElementById('telefoneUpdate').value = fornecedor.telefone
    document.getElementById('cepUpdate').value = fornecedor.cep
    document.getElementById('estadoUpdate').value = fornecedor.estado
    document.getElementById('cidadeUpdate').value = fornecedor.cidade
    document.getElementById('bairroUpdate').value = fornecedor.bairro
    document.getElementById('enderecoUpdate').value = fornecedor.endereco
    document.getElementById('complementoUpdate').value = fornecedor.complemento
    document.getElementById('emailUpdate').value = fornecedor.email
    document.getElementById('idUpdate').value = fornecedor.id
    document.getElementById('btnUpdate').disabled = false
}

function deleteFornecedor(id) {
    fetch(`http://localhost:3000/fornecedores/${id}`, {
        method: 'DELETE',
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert('Erro ao excluir fornecedor!')
        } else {
            alert('Fornecedor excluído com sucesso!')
        }
        atualizaFornecedores()
    })
}

atualizaFornecedores()

document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault()
    cadastrarFornecedor(event)
})

function cadastrarFornecedor(form) {
    const fornecedor = {
        nome: form.target.nome.value,
        cnpj: form.target.cnpj.value,
        telefone: form.target.telefone.value,
        cep: form.target.cep.value,
        estado: form.target.estado.value,
        cidade: form.target.cidade.value,
        bairro: form.target.bairro.value,
        endereco: form.target.endereco.value,
        complemento: form.target.complemento.value,
        email: form.target.email.value,
    }

    fetch('http://localhost:3000/fornecedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor),
    }).then((resposta) => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao cadastrar fornecedor!')
        } else {
            alert('Fornecedor cadastrado com sucesso!')
        }
        form.target.reset()
        atualizaFornecedores()
    })
}

document.getElementById('formUpdate').addEventListener('submit', function (event) {
    event.preventDefault()
    atualizarFornecedor(event)
})

function atualizarFornecedor(form) {
    const fornecedor = {
        nome: form.target.nomeUpdate.value,
        cnpj: form.target.cnpjUpdate.value,
        telefone: form.target.telefoneUpdate.value,
        cep: form.target.cepUpdate.value,
        estado: form.target.estadoUpdate.value,
        cidade: form.target.cidadeUpdate.value,
        bairro: form.target.bairroUpdate.value,
        endereco: form.target.enderecoUpdate.value,
        complemento: form.target.complementoUpdate.value,
        email: form.target.emailUpdate.value,
    }

    fetch(`http://localhost:3000/fornecedores/${form.target.idUpdate.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor),
    }).then((resposta) => {
        if (resposta.status != 200) {
            alert('Erro ao atualizar o fornecedor!')
        } else {
            alert('Fornecedor atualizado com sucesso!')
        }
        form.target.reset()
        atualizaFornecedores()
        document.getElementById('btnUpdate').disabled = true
    })
}
