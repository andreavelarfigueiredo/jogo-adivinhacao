// ===============================================
// 1. INICIALIZAÇÃO DO JOGO (Ao carregar a página)
// ===============================================

// Variáveis de estado do jogo
let numeroSecreto = 0;
const MAX_TENTATIVAS = 10;
let tentativasRestantes = MAX_TENTATIVAS;
let jogoAtivo = true; // Flag para saber se o jogo pode continuar

// Referências aos elementos do HTML
const inputPalpite = document.getElementById('palpiteInput');
const chutarBtn = document.getElementById('chutarBtn');
const mensagemTag = document.getElementById('mensagem');
const tentativasTag = document.getElementById('tentativas');
const reiniciarBtn = document.getElementById('reiniciarBtn');

/**
 * Gera um número aleatório entre 1 e 100 e reinicia o estado do jogo.
 */
function iniciarJogo() {
    // Requisito: Gerar um número aleatório entre 1 e 100
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    
    // Requisito: Inicializar o contador de tentativas
    tentativasRestantes = MAX_TENTATIVAS;
    jogoAtivo = true;
    
    // Atualiza a interface
    tentativasTag.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    mensagemTag.textContent = "Digite seu primeiro palpite!";
    mensagemTag.className = 'info'; 
    inputPalpite.value = '';
    inputPalpite.disabled = false;
    chutarBtn.disabled = false;
    reiniciarBtn.style.display = 'none'; 
    
    console.log("Novo número secreto gerado: " + numeroSecreto); // Apenas para testes
}

// ===============================================
// 2. FUNÇÃO PRINCIPAL: CHUTAR
// ===============================================

/**
 * Executada quando o jogador clica no botão "Chutar".
 */
function checarPalpite() {
    if (!jogoAtivo) {
        return;
    }

    // Requisito: Capturar o valor inserido no input
    const palpite = parseInt(inputPalpite.value);
    
    // Requisito: Validar se o palpite é um número válido entre 1 e 100
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        mensagemTag.textContent = "ERRO: Digite um número válido entre 1 e 100.";
        mensagemTag.className = 'error';
        return; // Sai da função
    }

    // Requisito: Decrementar o contador de tentativas
    tentativasRestantes--;
    // Requisito: Exibir o número de tentativas restantes
    tentativasTag.textContent = `Tentativas restantes: ${tentativasRestantes}`;


    // Requisito: Comparar o palpite com o número secreto e exibir uma mensagem
    if (palpite === numeroSecreto) {
        // "Você acertou!" (e o jogo termina)
        mensagemTag.textContent = `Parabéns! Você acertou o número secreto (${numeroSecreto})!`;
        mensagemTag.className = 'vitoria';
        terminarJogo();

    } else if (palpite < numeroSecreto) {
        // "O número secreto é maior"
        mensagemTag.textContent = "O número secreto é MAIOR. Tente um número mais alto.";
        mensagemTag.className = 'dica-maior';

    } else { // palpite > numeroSecreto
        // "O número secreto é menor"
        mensagemTag.textContent = "O número secreto é MENOR. Tente um número mais baixo.";
        mensagemTag.className = 'dica-menor';
    }


    // Requisito: Se o jogador atingir o número máximo de tentativas, o jogo termina
    if (tentativasRestantes === 0 && palpite !== numeroSecreto) {
        mensagemTag.textContent = `FIM DE JOGO! Você perdeu! O número secreto era ${numeroSecreto}.`;
        mensagemTag.className = 'derrota'; 
        terminarJogo();
    }
    
    // Limpa o campo para o próximo palpite
    inputPalpite.value = '';
}

/**
 * Termina o jogo (bloqueia inputs e mostra botão de reiniciar).
 */
function terminarJogo() {
    jogoAtivo = false;
    inputPalpite.disabled = true;
    chutarBtn.disabled = true;
    reiniciarBtn.style.display = 'block';
}


// ===============================================
// 3. ATRIBUIR EVENTOS
// ===============================================

// Requisito: Ao carregar a página, o JavaScript deve iniciar o jogo
document.addEventListener('DOMContentLoaded', iniciarJogo);

// Requisito: Ao clicar no botão "Chutar", o JavaScript deve checar o palpite
chutarBtn.addEventListener('click', checarPalpite);

// Atribui a função ao botão Reiniciar
reiniciarBtn.addEventListener('click', iniciarJogo);