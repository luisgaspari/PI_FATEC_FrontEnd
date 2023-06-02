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
        if(resposta.status != 201){
            alert('Erro ao cadastrar!')
        }
        else {
            alert('Cadastrado com sucesso!')
            window.location.href = "cliente.html"
        }
    })
}

/*const opcao = document.getElementById('opcoes')
opcao.innerHTML = ''

const par = document.createElement('p')

const btnAtualizar = document.createElement('button')
btnAtualizar.className = 'btn btn-primary mt-2 btn2'
btnAtualizar.innerText = 'Atualizar'
btnAtualizar.addEventListener('submit', () => modificarCliente(cliente.id))

const btnCriar = document.createElement('button')
btnCriar.className = 'btn btn-primary mt-2 btn2'
btnCriar.innerText = 'Cadastrar'
btnCriar.addEventListener('click', () => {
    const formReg = document.getElementById('formCadastro')
    console.log(formReg.target.nome.value)
    //alert(form.target.nome)
    //criarCliente(form)
})
opcao.appendChild(btnCriar)
opcao.appendChild(par)
opcao.appendChild(btnAtualizar)*/

const formReg = document.getElementById('formCadastro')
formReg.addEventListener('submit', (event) => {
    event.preventDefault()
    //console.log(event.target.nome.value)
    criarCliente(event)
})