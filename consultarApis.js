const cep = document.querySelector("#cep");

cep.addEventListener("blur", consultarCEP);

async function consultarCEP() {

    // Remove tudo que não for número
    const cepNumeros = cep.value.replace(/\D/g, "");

    // Verifica se possui 8 números
    if (cepNumeros.length !== 8) {
        alert("Digite um CEP válido.");
        return;
    }

    try {

        // Mostra que está buscando
        document.querySelector("#logradouro").value = "Buscando...";
        document.querySelector("#bairro").value = "Buscando...";
        document.querySelector("#cidade").value = "Buscando...";

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cepNumeros}/json/`
        );

        const dados = await resposta.json();

        // CEP não encontrado
        if (dados.erro) {

            alert("CEP não encontrado.");

            limparEndereco();

            return;
        }

        // Preenche os campos
        document.querySelector("#logradouro").value =
            dados.logradouro;

        document.querySelector("#bairro").value =
            dados.bairro;

        document.querySelector("#cidade").value =
            dados.localidade;

        document.querySelector("#estado").value =
            dados.uf;

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível consultar o CEP.");

        limparEndereco();
    }
}


function limparEndereco() {

    document.querySelector("#logradouro").value = "";
    document.querySelector("#bairro").value = "";
    document.querySelector("#cidade").value = "";
    document.querySelector("#estado").value = "";

}