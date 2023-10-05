//os cadeados estarão abertos até que gere uma combinação nova
//o botão de analisar combinação estará desativado até que gere uma combinação nova
const unlockedSound = new Audio('sounds/unlocked.mp3');
const loseSound = new Audio('sounds/lose.wav');
const btnGeraCombinacao = document.querySelector("#btn-geraComb");
const btnAnalisarCombinacao = document.querySelector("#btn1");
const boxEntrada = document.querySelectorAll(".boxEntrada");
const boxSaida = document.querySelectorAll(".box");
const subtitulo2 = document.querySelector(".subtitulo2");
const menu = document.querySelector("#menu");
const opcoesEl = document.querySelector(".opcoes");

const imgVenceu = "imgs/telaVencedora.png"
const imgPerdeu = "imgs/telaPerdedora.png"
const imgDefault = "imgs/fundoLop.png"

const fontCadeadoAberto ='<span class="material-symbols-outlined">lock_open</span>'
const fontCadeadoFechado ='<span class="material-symbols-outlined">lock</span>'

let combinacaoEntrada = [];
let combinacaoSaida = [];
let jogadas = 0; 
let emJogo = false;
let tentativas = 0;
let numCorretos = [];

atualizaTentativasSubtitulo();

function atualizaBackground(src){
    const body = document.body
    body.style.transition = "background-image 1.3s ease"
    body.style.backgroundImage = "url(" + src + ")"
}

function mostrarCombinacoes(){
    opcoesEl.classList.toggle("mostrar");
}

function desativaBotao(btn){
    btn.disabled = true;
    btn.style.cursor = "not-allowed"
    btn.style.backgroundColor = "rgb(175, 93, 156)"

    btn.onmouseover = function() {
        btn.style.cursor = 'not-allowed';
    };
}

function ativaBotao(btn){
    btn.disabled = false;
    btn.style.border = "none"


    btn.onmouseover = function() {
        btn.style.backgroundColor = 'rgb(145, 53, 123)';
        btn.style.cursor = 'pointer';
      };

    btn.onmouseout = function(){
        btn.style.backgroundColor = 'rgb(175, 93, 156)';
    }
}

function atualizaTentativasSubtitulo(){
    subtitulo2.innerHTML = "TENTATIVAS RESTANTES: " + tentativas;
}



function receberValorEntrada(){
    let arr = [];
    for(let i = 0; i < boxEntrada.length; i++){
        arr.push(boxEntrada[i].value);
    }

    return arr;
}

function limparBoxEntrada(){
    for(let i = 0; i < boxEntrada.length; i++){
        boxEntrada[i].value = "";
    }
}

function fechaCadeados(){
    for(let i = 0; i < boxSaida.length; i++){
        
        //transforma o icon do cadeado em fechado
        boxSaida[i].innerHTML = fontCadeadoFechado;
    }
}

function abreCadeados(){
    for(let i = 0; i < boxSaida.length; i++){
        
        //transforma o icon do cadeado em fechado
        boxSaida[i].innerHTML = fontCadeadoAberto;
    }
}


function gerarCombinacao(){
    numCorretos = [];
    emJogo = true;
    tentativas = 10;
    atualizaTentativasSubtitulo();
    atualizaBackground(imgDefault);
    let combinacao = [];
    

    for(let i = 0; i < boxSaida.length; i++){
        
        //gera um valor aleatorio para cada box
        combinacao.push(Math.floor(Math.random() * 10));
    }

    fechaCadeados();
    ativaBotao(btnAnalisarCombinacao);
    desativaBotao(btnGeraCombinacao);
    if(jogadas > 0){
        limparBoxEntrada();
    }
    jogadas++;
    combinacaoSaida = combinacao;
    console.log(combinacaoSaida)
}

function verificarSeEntradaValida(entrada){
    let analiseValida = true;

    for(let i = 0; i < boxEntrada.length; i++){
        if(entrada[i] > 9 || entrada[i] < 0 || entrada[i] == ""){
            analiseValida = false;
        }
    }

    return analiseValida;
}

function analisarCombinacao(){
    let entrada = receberValorEntrada();
    analiseValida = verificarSeEntradaValida(entrada);

    if(analiseValida){
        
    let combinacaoCorreta = true;
    let combinacaoEntrada = receberValorEntrada();

    for(let i = 0; i < boxEntrada.length; i++){
        if(combinacaoEntrada[i] != combinacaoSaida[i]){
            combinacaoCorreta = false;
        }

    }

    verificarSeNumeroEstaCerto(entrada, combinacaoSaida);
    tentativas--;
    atualizaTentativasSubtitulo();
    if(tentativas == 0 && emJogo){
        emJogo = false;
        desativaBotao(btnAnalisarCombinacao);
        ativaBotao(btnGeraCombinacao);
        tentativas = 10;
        atualizaBackground(imgPerdeu);
        loseSound.play();
    }
    
    if(combinacaoCorreta){
        emJogo = false;
        desativaBotao(btnAnalisarCombinacao);
        ativaBotao(btnGeraCombinacao);
        console.log("combinacao correta");
        atualizaBackground(imgVenceu);
    } else{
        console.log("combinação incorreta")
    }
    return combinacaoCorreta;
    } else{
        console.log("entrada invalida")
    }


}

function verificarSeNumeroEstaCerto(entrada, saida){
    for(let i = 0; i < entrada.length; i++){
        if(entrada[i] == saida[i] && !(numCorretos.includes(entrada[i]))){
            boxSaida[i].innerHTML = entrada[i];
            numCorretos.push(entrada[i]);
            unlockedSound.play();
        }
    }


}

//sistema de foco e seleção das caixas
boxEntrada.forEach((input, index) => {
    input.addEventListener('input', function() {
    if (this.value.length === this.maxLength) {
        if (index < boxEntrada.length - 1) {
            boxEntrada[index + 1].focus();
        }
      }
    })
})
boxEntrada.forEach((input, index) => {
    input.addEventListener('keydown', function(event) {
    if (event.key === 'a' && index > 0){

        boxEntrada[index - 1].focus();

    } else if (event.key === 'd' && index < boxEntrada.length - 1) {
        boxEntrada[index + 1].focus();
    }
    })
})

desativaBotao(btnAnalisarCombinacao);