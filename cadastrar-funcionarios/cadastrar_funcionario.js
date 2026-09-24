const URL = 'https://backend-portal-orelha.onrender.com';
const form = document.getElementById('formCadastro');
const mensagem = document.getElementById('mensagem');


function calcularIdade(dataNascimento) {
    //New date pega a data de hoje
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    //getFullYear pega o ano que estamos
    let idade = hoje.getFullYear() - nascimento.getFullYear();

    //getMonth e getDate pega o mês e o dia
    if (hoje.getMonth() < nascimento.getMonth() || (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())){
        //se a pessoa está em um mês "menor" ao que ela nasceu, tire 1
        idade = idade - 1;;
    }

    return idade;
}


form.addEventListener('submit', function(event) {
    event.preventDefault() 

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const dataNascimento = document.getElementById('data_nascimento').value;
    const senha = document.getElementById('senha').value;

   
    
    // Verificar nome
    if (nome.length < 3) {
        mensagem.textContent = 'O nome deve ter pelo menos 3 caracteres.';
        return;
    }


    // Verificar email
    if (!email.includes('@') || !email.includes('.')) {
        mensagem.textContent = 'Digite um email válido.';
        return;
    }


    // Verificar CPF
    const cpfNumeros = cpf.replace(/\D/g, '');

    if (cpfNumeros.length !== 11) {
        mensagem.textContent = 'O CPF deve ter 11 números.';
        return;
    }


    // Verificar telefone
    const telefoneNumeros = telefone.replace(/\D/g, '');

    if (telefoneNumeros.length !== 10 && telefoneNumeros.length !== 11) {
        mensagem.textContent = 'O telefone deve ter 10 ou 11 números.';
        return;
    }


    // Verificar a data de nascimento
    if (!dataNascimento) {
        mensagem.textContent = 'Informe a data de nascimento.';
        return;
    }


    // Calcula e verifica a idade
    const idade = calcularIdade(dataNascimento);
    if (idade < 18) {
        mensagem.textContent = 'O funcionário deve ter pelo menos 18 anos.';
        return;
    }
    if (idade > 120) {
        mensagem.textContent = 'Digite uma data de nascimento válida.';
        return;
    }




    // Verificar senha
    if (senha.length < 8 || senha.length > 30) {
        mensagem.textContent = 'A senha deve ter entre 8 e 30 caracteres.';
        return;
    }
    if (!/[A-Z]/.test(senha)) {
        mensagem.textContent = 'A senha deve ter pelo menos uma letra maiúscula.';
        return;
    }
    if (!/[a-z]/.test(senha)) {
        mensagem.textContent = 'A senha deve ter pelo menos uma letra minúscula.';
        return;
    }
    if (!/[0-9]/.test(senha)) {
        mensagem.textContent = 'A senha deve ter pelo menos um número.';
        return;
    }
    if (!/[^A-Za-z0-9]/.test(senha)) {
        mensagem.textContent = 'A senha deve ter pelo menos um caractere especial.';
        return;
    }


    

    //Validou
    console.log('Dados válidos!');
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('CPF:', cpfNumeros);
    console.log('Telefone:', telefone);
    console.log('Idade:', idade);
    console.log('Senha:', senha);

    

    const dados = {
    cpf: cpfNumeros,
    nome: nome,
    idade: idade,
    email: email,
    senha: senha,
    telefone: telefoneNumeros
}



// Integração

console.log(dados);
console.log('Cheguei no fetch'); //teste

fetch(`${URL}/rotasprivadas/gerente/inserirFuncionario`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include', 
    body: JSON.stringify(dados)
})

//Alerta de erros
.then(resposta => {

    console.log('Fetch terminou');
    console.log(resposta.status);

    if (resposta.status === 400) {
    alert('Dados inválidos.');
    }

    if (resposta.status === 401) {
        alert('Você precisa estar logado.');
    }

    if (resposta.status === 403) {
        alert('Você não tem permissão para cadastrar.');
    }

    if (resposta.status === 409) {
        alert('CPF, email ou telefone já cadastrado.');
    }

    if (resposta.status === 500) {
        alert('Erro no servidor. Tente novamente.');
    }

})
.catch(erro => {
    console.log('Erro na comunicação com a API:', erro);
});

});