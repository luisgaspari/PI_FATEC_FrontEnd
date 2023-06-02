function atualizarClientes() {

    const ul = document.getElementById('listaClientes')
    ul.innerHTML = ''

    const clientes = fetch('https://pi-fatec2s-maracujadesign.onrender.com/clientes/')
    .then(resposta => resposta.json())
    .then(clientesDados => {
        clientesDados.forEach(cliente => {

            const par = document.createElement('p')
            const form = document.createElement('input')

            form.setAttribute("type", "submit");
            form.setAttribute("class", "list")
            form.addEventListener('click', () => procurarCliente(cliente.id))
            form.setAttribute("value", `ID: ${cliente.id}
Nome: ${cliente.nome}
E-mail: ${cliente.email}
Telefone: ${cliente.telefone}`)

            const ul = document.getElementById('listaClientes')
            ul.appendChild(form)
            ul.appendChild(par)
        }) 
    })
}

atualizarClientes()

function procurarCliente(id){
    const client = fetch(`https://pi-fatec2s-maracujadesign.onrender.com/clientes/${id}`)
    .then(resposta => {
        if(resposta.status != 200){
            atualizarClientes()
            throw erro("Cliente não existe")
        }
        return resposta.json()
    })
    .catch(erro => alert('Cliente não existe!'))
    .then(clienteDados => {

        const ul = document.getElementById('listaClientes')
        const par = document.createElement('p')
        ul.innerHTML = ''

        const procCliente = document.createElement('p')
        procCliente.className = 'reg'
        procCliente.innerText = `Nome: ${clienteDados.nome}
        CPF: ${clienteDados.cpf}
        Telefone: ${clienteDados.telefone}
        E-mail: ${clienteDados.email}

        CEP: ${clienteDados.cep}
        Estado: ${clienteDados.estado}
        Cidade: ${clienteDados.cidade}
        Bairro: ${clienteDados.bairro}
        Endereço: ${clienteDados.endereco}
        complemento: ${clienteDados.complemento}`
        
        ul.appendChild(procCliente)
        ul.appendChild(par)

        //botao Update
        const btnUpdate = document.createElement('button')
        btnUpdate.className = "btn2"
        btnUpdate.innerText = "Alterar"
        btnUpdate.addEventListener('click', () => alterarCliente(clienteDados.id))
        ul.appendChild(btnUpdate)

        ul.appendChild(par)

        //botao Delete
        const btnDelete = document.createElement('button')
        btnDelete.className = "btn2"
        btnDelete.innerText = "Remover"
        btnDelete.addEventListener('click', () => deletarCliente(clienteDados.id))
        ul.appendChild(btnDelete)
    })
}

function deletarCliente(id){
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/clientes/${id}`,{
        method: 'DELETE'
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao excluir!')
        }
        else alert('Excluído com sucesso!')
        atualizarClientes()
    })
}

function alterarCliente(id){
    const client = fetch(`https://pi-fatec2s-maracujadesign.onrender.com/clientes/${id}`)
    .then(resposta => {
        if(resposta.status != 200){
            atualizarClientes()
            throw erro("Cliente não existe")
        }
        return resposta.json()
    })
    .catch(erro => alert('Cliente não existe!'))
    .then(clienteDados => {

        const ul = document.getElementById('listaClientes')
        const par = document.createElement('p')
        ul.innerHTML = ''

        const attCliente = document.createElement('form')
        attCliente.className = 'reg'
        attCliente.method = 'post'
        attCliente.id = 'formAtt'
        
        const attId = document.createElement('input')
        attId.type = 'hidden'
        attId.id = 'id'
        attId.value = clienteDados.id

        let attNome = document.createElement('input')
        attNome.setAttribute("type", "text")
        attNome.setAttribute('name', 'nome')
        attNome.setAttribute('placeholder', 'Nome')
        attNome.setAttribute('id', 'nome')
        attNome.setAttribute('class', 'form-control')
        attNome.setAttribute('value', clienteDados.nome)

        let attCpf = document.createElement('input')
        attCpf.setAttribute("type", "text")
        attCpf.setAttribute('name', 'cpf')
        attCpf.setAttribute('placeholder', 'CPF')
        attCpf.setAttribute('id', 'cpf')
        attCpf.setAttribute('class', 'form-control')
        attCpf.setAttribute('value', clienteDados.cpf)

        let attTelefone = document.createElement('input')
        attTelefone.setAttribute("type", "text")
        attTelefone.setAttribute('name', 'telefone')
        attTelefone.setAttribute('placeholder', 'Telefone')
        attTelefone.setAttribute('id', 'telefone')
        attTelefone.setAttribute('class', 'form-control')
        attTelefone.setAttribute('value', clienteDados.telefone)

        let attEmail = document.createElement('input')
        attEmail.setAttribute("type", "text")
        attEmail.setAttribute('name', 'email')
        attEmail.setAttribute('placeholder', 'E-mail')
        attEmail.setAttribute('id', 'email')
        attEmail.setAttribute('class', 'form-control')
        attEmail.setAttribute('value', clienteDados.email)

        let attCep = document.createElement('input')
        attCep.setAttribute("type", "text")
        attCep.setAttribute('name', 'cep')
        attCep.setAttribute('placeholder', 'Cep')
        attCep.setAttribute('id', 'cep')
        attCep.setAttribute('class', 'form-control')
        attCep.setAttribute('value', clienteDados.cep)

        let attEstado = document.createElement('input')
        attEstado.setAttribute("type", "text")
        attEstado.setAttribute('name', 'estado')
        attEstado.setAttribute('placeholder', 'Estado')
        attEstado.setAttribute('id', 'estado')
        attEstado.setAttribute('class', 'form-control')
        attEstado.setAttribute('value', clienteDados.estado)

        let attCidade = document.createElement('input')
        attCidade.setAttribute("type", "text")
        attCidade.setAttribute('name', 'cidade')
        attCidade.setAttribute('placeholder', 'Cidade')
        attCidade.setAttribute('id', 'cidade')
        attCidade.setAttribute('class', 'form-control')
        attCidade.setAttribute('value', clienteDados.cidade)

        let attBairro = document.createElement('input')
        attBairro.setAttribute("type", "text")
        attBairro.setAttribute('name', 'bairro')
        attBairro.setAttribute('placeholder', 'Bairro')
        attBairro.setAttribute('id', 'bairro')
        attBairro.setAttribute('class', 'form-control')
        attBairro.setAttribute('value', clienteDados.bairro)

        let attEndereco = document.createElement('input')
        attEndereco.setAttribute("type", "text")
        attEndereco.setAttribute('name', 'endereco')
        attEndereco.setAttribute('placeholder', 'Endereço')
        attEndereco.setAttribute('id', 'endereco')
        attEndereco.setAttribute('class', 'form-control')
        attEndereco.setAttribute('value', clienteDados.endereco)

        let attComplemento = document.createElement('input')
        attComplemento.setAttribute("type", "text")
        attComplemento.setAttribute('name', 'complemento')
        attComplemento.setAttribute('placeholder', 'Complemento')
        attComplemento.setAttribute('id', 'complemento')
        attComplemento.setAttribute('class', 'form-control')
        attComplemento.setAttribute('value', clienteDados.complemento)

        const submit = document.createElement('button')
        submit.className = 'btn2'
        submit.innerText = 'Alterar'
        /*submit.addEventListener('click', (event) => {
            event.preventDefault()
            console.log(event.target.nome)
            //modificarCliente(event)
        })*/

        attCliente.appendChild(attId)

        attCliente.appendChild(attNome)
        attCliente.appendChild(attCpf)
        attCliente.appendChild(attTelefone)
        attCliente.appendChild(attEmail)

        attCliente.appendChild(par)

        attCliente.appendChild(attCep)
        attCliente.appendChild(attEstado)
        attCliente.appendChild(attCidade)
        attCliente.appendChild(attBairro)
        attCliente.appendChild(attEndereco)
        attCliente.appendChild(attComplemento)
        attCliente.appendChild(submit)

        attCliente.appendChild(par)

        ul.appendChild(attCliente)

        const Att = document.getElementById('formAtt')
        Att.addEventListener('submit', (event) => {
            event.preventDefault()
            //console.log(event.target.id.value)
            modificarCliente(event)
        })
    })
}

function modificarCliente(form){
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
    fetch(`https://pi-fatec2s-maracujadesign.onrender.com/clientes/${form.target.id.value}`,{
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(clienteAtt)
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao modificar!')
        }
        else alert('Modificado com sucesso!')
        window.location.href = "clienteList.html"
    })
}