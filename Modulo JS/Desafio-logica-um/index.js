// Desafio Classificador de nível de Herói
// Utilizando variáveis, operadores, laços de repetição e estruturas de decisões

// Função para classificar o nível do herói baseado no XP
function classificarHeroi(nome, xp) {
    let nivel;
    
    // Estrutura de decisão para determinar o nível baseado no XP
    if (xp < 1000) {
        nivel = "Ferro";
    } else if (xp >= 1001 && xp <= 2000) {
        nivel = "Bronze";
    } else if (xp >= 2001 && xp <= 5000) {
        nivel = "Prata";
    } else if (xp >= 5001 && xp <= 7000) {
        nivel = "Ouro";
    } else if (xp >= 7001 && xp <= 8000) {
        nivel = "Platina";
    } else if (xp >= 8001 && xp <= 9000) {
        nivel = "Ascendente";
    } else if (xp >= 9001 && xp <= 10000) {
        nivel = "Imortal";
    } else if (xp >= 10001) {
        nivel = "Radiante";
    }
    
    // Exibir a mensagem conforme solicitado
    console.log(`O Herói de nome ${nome} está no nível de ${nivel}`);
    return nivel;
}

// Exemplos de heróis para demonstrar o funcionamento
const herois = [
    { nome: "Aragorn", xp: 500 },
    { nome: "Legolas", xp: 1500 },
    { nome: "Gimli", xp: 3500 },
    { nome: "Gandalf", xp: 6500 },
    { nome: "Boromir", xp: 7500 },
    { nome: "Frodo", xp: 8500 },
    { nome: "Sauron", xp: 9500 },
    { nome: "Morgoth", xp: 15000 }
];

// Laço de repetição para classificar todos os heróis
console.log("=== Classificação de Heróis ===");
for (let i = 0; i < herois.length; i++) {
    const heroi = herois[i];
    classificarHeroi(heroi.nome, heroi.xp);
}

// Exemplo adicional com entrada manual
console.log("\n=== Exemplo Individual ===");
let nomeHeroi = "Arthur";
let xpHeroi = 4200;
classificarHeroi(nomeHeroi, xpHeroi);

// Demonstração com diferentes valores de XP
console.log("\n=== Testando Todos os Níveis ===");
const testesNivel = [
    { nome: "Novato", xp: 500 },      // Ferro
    { nome: "Iniciante", xp: 1500 },  // Bronze
    { nome: "Experiente", xp: 3000 }, // Prata
    { nome: "Veterano", xp: 6000 },   // Ouro
    { nome: "Elite", xp: 7500 },      // Platina
    { nome: "Mestre", xp: 8500 },     // Ascendente
    { nome: "Lenda", xp: 9500 },      // Imortal
    { nome: "Divino", xp: 12000 }     // Radiante
];

for (let heroi of testesNivel) {
    classificarHeroi(heroi.nome, heroi.xp);
}