const pets = [

    {
        nome: "Hércules",
        idade: "2 anos",
        raca: "SRD",
        sexo: "Masculino",
        personalidade: "Brincalhão",
        porte: "Grande",
        imagem: "../img/dogUm.png"
    },

    {
        nome: "Mingau",
        idade: "3 anos",
        raca: "SRD",
        sexo: "Masculino",
        personalidade: "Carinhoso",
        porte: "Médio",
        imagem: "../img/catUm.png"
    },

    {
        nome: "Nala",
        idade: "2 anos",
        raca: "SRD",
        sexo: "Feminino",
        personalidade: "Tranquila",
        porte: "Pequeno",
        imagem: "../img/catD.png"
    },

    {
        nome: "Theo",
        idade: "4 anos",
        raca: "SRD",
        sexo: "Masculino",
        personalidade: "Dócil",
        porte: "Grande",
        imagem: "../img/dogD.png"
    },

    {
        nome: "Luna",
        idade: "1 ano",
        raca: "SRD",
        sexo: "Feminino",
        personalidade: "Carinhosa",
        porte: "Pequeno",
        imagem: "../img/catT.png"
    },

    {
        nome: "Toby",
        idade: "3 anos",
        raca: "SRD",
        sexo: "Masculino",
        personalidade: "Brincalhão",
        porte: "Médio",
        imagem: "../img/dogT.png"
    }

];


const indice = Number(localStorage.getItem("petSelecionado")) || 0;

const pet = pets[indice];


document.getElementById("nomePet").textContent = pet.nome;

document.getElementById("nomePetCard").textContent = pet.nome;

document.getElementById("idadePet").textContent = pet.idade;

document.getElementById("sexoPet").textContent = pet.sexo;

document.getElementById("portePet").textContent = "Porte " + pet.porte;

document.getElementById("imagemPet").src = pet.imagem;