

const formCadastro = document.getElementById('formCadastro')
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault()
    cadastrarContato(event)
})

function modificarCliente(id){
    const clienteAtt = {
        nome: form.target.nome.value,
        cpf: form.target.cpf.value,
        telefone: form.target.telefone.value,
        email: form.target.email.value,
        cep: form.target.cep.value,
        estado: form.target.estado.value,
        cidade: form.target.cidade.value,
        bairro: form.target.bairro.value,
        endereco: form.target.endereco.value,
        complemento: form.target.complemento.value
    }
    fetch(`http://localhost:3000/clientes/${id}`,{
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(clienteAtt)
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao modificar!')
        }
        else alert('Modificado com sucesso!')
        window.location.href = "cliente.html"
    })
}

function criarCliente(form){
    const clienteNovo = {
        nome: form.target.nome.value,
        cpf: form.target.cpf.value,
        telefone: form.target.telefone.value,
        email: form.target.email.value,
        cep: form.target.cep.value,
        estado: form.target.estado.value,
        cidade: form.target.cidade.value,
        bairro: form.target.bairro.value,
        endereco: form.target.endereco.value,
        complemento: form.target.complemento.value
    }
    fetch(`http://localhost:3000/clientes/`,{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(clienteNovo)
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao cadastrar!')
        }
        else alert('Cadastrado com sucesso!')
        atualizarContatos()
    })
}

const opcao = document.getElementById('opcoes')
opcao.innerHTML = ''

const par = document.createElement('p')

const btnAtualizar = document.createElement('button')
btnAtualizar.className = 'btn btn-primary mt-2 btn2'
btnAtualizar.innerText = 'Atualizar'
btnAtualizar.addEventListener('submit', () => modificarCliente(cliente.id))

const btnCriar = document.createElement('button')
btnCriar.className = 'btn btn-primary mt-2 btn2'
btnCriar.innerText = 'Cadastrar'
btnCriar.addEventListener('submit', () => {
    const form = document.getElementById('formCadastro')
    criarCliente(form)})

opcao.appendChild(btnCriar)
opcao.appendChild(par)
opcao.appendChild(btnAtualizar)