<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8" />
        <title>Maracujá Design</title>
        <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossorigin="anonymous"
        />
        <link rel="stylesheet" href="css/main.css" />
    </head>

    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
            <a class="navbar-brand" href="#">
                <img
                    src="img/maracuja_design.jpg"
                    width="30"
                    height="30"
                    class="d-inline-block align-top"
                    alt=""
                />
                Maracujá Design</a
            >
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Alterna navegação"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#"
                            >Home <span class="sr-only">(Página atual)</span></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="lista_cliente.html"
                            >Cliente</a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Preços</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#">Desativado</a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container">

            <h1>Página Inicial</h1>
            <h1 class="h1">Agenda de Contatos</h1>
        <form id="formFornecedor">
            <label for="nome">Nome:</label>
            <input type="text" name="nome" id="nome" class="form-control">
            <label for="telefone">Telefone:</label>
            <input type="text" name="telefone" id="telefone" class="form-control">
            <label for="email">E-mail:</label>
            <input type="text" name="email" id="email" class="form-control">
            <input type="submit" value="Cadastrar" class="btn btn-primary mt-2">
        </form>
        <hr class="my-4">
        <ul id="listaContatos" class="list-group">
        </ul>
        <hr class="my-4">
        <form id="formUpdate">
            <label for="nome">Nome:</label>
            <input type="text" name="nome" id="nomeUpdate" class="form-control">
            <label for="telefone">Telefone:</label>
            <input type="text" name="telefone" id="telefoneUpdate" class="form-control">
            <label for="email">E-mail:</label>
            <input type="text" name="email" id="emailUpdate" class="form-control">
            <input type="hidden" name="id" id="idUpdate">
            <input type="submit" id="btnUpdate" disabled value="Atualizar" class="btn btn-primary mt-2">
        </form>

        </div>

        {/* Trocar para o JS correto */}
        <script src="js/fornecedor.js"></script>

        {/* <!-- JavaScript (Opcional) --> */}
        {/* <!-- jQuery primeiro, depois Popper.js, depois Bootstrap JS -->*/}
        <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"
        ></script>
        <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
            crossorigin="anonymous"
        ></script>
        <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
            crossorigin="anonymous"
        ></script>
    </body>
</html>
