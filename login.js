const URL = 'https://backend-portal-orelha.onrender.com';



// VALIDAÇÃO DO CPF


function validarCPF(cpf) {
    cpf = cpf.trim();

    if (!cpf) {
        return "O CPF não foi informado";
    }

    if (!/^[\d.-]+$/.test(cpf)) {
        return "O CPF só pode conter números, ponto e hífen";
    }

    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
        return "O CPF precisa ter exatamente 11 dígitos";
    }

    return null;
}



// VALIDAÇÃO DA SENHA


function validarSenha(senha) {
    senha = senha.trim();

    if (!senha) {
        return "A senha é obrigatória";
    }

    if (senha.length < 8 || senha.length > 30) {
        return "A senha deve ter entre 8 e 30 caracteres";
    }

    if (!/[A-Z]/.test(senha)) {
        return "A senha deve ter pelo menos uma letra maiúscula";
    }

    if (!/[a-z]/.test(senha)) {
        return "A senha deve ter pelo menos uma letra minúscula";
    }

    if (!/[0-9]/.test(senha)) {
        return "A senha deve ter pelo menos um número";
    }

    if (!/[^A-Za-z0-9]/.test(senha)) {
        return "A senha deve ter pelo menos um caractere especial";
    }

    return null;
}

// ELEMENTOS DO HTML


const formulario = document.getElementById('form-login');
const cpfInput = document.getElementById('cpf');
const senhaInput = document.getElementById('senha');
const mensagem = document.getElementById('mensagem');



// LOGIN


formulario.addEventListener('submit', async function(event) {

    event.preventDefault();

    mensagem.textContent = "";


    // Pega os valores digitados
    const cpf = cpfInput.value.trim();
    const senha = senhaInput.value;


    
    // VALIDA CPF
    

    let erro = validarCPF(cpf);

    if (erro) {
        mensagem.textContent = erro;
        return;
    }


    
    // VALIDA SENHA
    

    erro = validarSenha(senha);

    if (erro) {
        mensagem.textContent = erro;
        return;
    }


    // Remove ponto e hífen do CPF
    const cpfNumeros = cpf.replace(/\D/g, '');


    // Dados que serão enviados para a API
    const dados = {
        cpf: cpfNumeros,
        senha: senha
    };


    console.log("Dados enviados:", dados);


    try {

        const resposta = await fetch(`${URL}/login`, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            credentials: 'include',

            body: JSON.stringify(dados)

        });


        console.log("Status:", resposta.status);


        // Converte a resposta da API para JSON
        const resultado = await resposta.json();


        
        // 200 - LOGIN EFETUADO
        

        if (resposta.status === 200) {

            mensagem.textContent = resultado.mensagem;

            console.log("Login efetuado com sucesso.");

            return;
        }


        
        // 400 - DADOS INVÁLIDOS
        

        if (resposta.status === 400) {

            mensagem.textContent = resultado.erro;

            return;
        }


        
        // 401 - CREDENCIAIS INCORRETAS
        

        if (resposta.status === 401) {

            mensagem.textContent = resultado.erro;

            return;
        }


        
        // 500 - ERRO NO SERVIDOR
        

        if (resposta.status === 500) {

            mensagem.textContent = resultado.erro;

            return;
        }


    } catch (erro) {

        console.log("Erro na comunicação com a API:", erro);

        mensagem.textContent = "Erro ao conectar com o servidor.";
    }

});