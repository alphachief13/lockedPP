//ainda falta corrigir cores ao acertar
//fazer o sistema de score
//fazer a pagina sobre



const unlockedSound = new Audio('../sounds/unlocked.mp3');
const loseSound = new Audio('../sounds/lose.wav');
const lockSound = new Audio('../sounds/locking.wav')

const btnGeraCombinacao = document.querySelector("#btn-geraComb");
const btnAnalisarCombinacao = document.querySelector("#btn1");
const boxEntrada = document.querySelectorAll(".boxEntrada");
const boxSaida = document.querySelectorAll(".box");
const subtitulo2 = document.querySelector(".subtitulo2");
const menu = document.querySelector("#menu");
const opcoesEl = document.querySelector(".opcoes");
const subtitulo3 = document.querySelector(".subtitulo3");
const voltarMenu = document.querySelector("#voltarMenu");
const lockScoreEl = document.querySelector("#lockscore");
const lockCoinEl = document.querySelector("#lockcoin");
const boxSaida2 = document.querySelectorAll(".box2");
const boxSaida3 = document.querySelectorAll(".box3");
const mostrarLockScore = document.querySelector("#mostraLockScore");

const telaMain = document.querySelector(".faseJogo");
const telaVitoria = document.querySelector(".faseRespostaVenceu");
const telaDerrota = document.querySelector(".faseRespostaPerdeu");


const imgVenceu = "../imgs/telaVencedora.png"
const imgPerdeu = "../imgs/telaPerdedora.png"
const imgDefault = "../imgs/fundo.png"

const fontCadeadoAberto ='<span class="material-symbols-outlined">lock_open</span>'
const fontCadeadoFechado ='<span class="material-symbols-outlined">lock</span>'

let combinacaoEntrada = [];
let combinacaoSaida = [];
let jogadas = 0; 
let emJogo = false;
let tentativas = 0;
let numCorretos = [];
let acertouUmNum = false;
let emTelaMain = true;


let lockScore = 0;
let lockCoin = 0;
recuperaDados();

function recuperaDados(){
    lockScore = Number(localStorage.getItem('lockScore'));
    lockCoin = Number(localStorage.getItem('lockCoin'));
    atualizaLockScore();
    atualizaLockCoin();
}

let possiveisLogs = ["COMBINAÇÃO INCORRETA", "COMBINAÇÃO CORRETA", "COMBINAÇÃO INVÁLIDA", "DIGITE UMA COMBINAÇÃO (0-9)", "VOCÊ ACERTOU UM NÚMERO"];
let coresLogs = ["#ff0000","#00ff00","#ff0000","#e7e8e5", "#00ff00"];

function carregarTodosFundos(){
    atualizaBackground(imgPerdeu);
    atualizaBackground(imgVenceu);
    atualizaBackground(imgDefault);
}

function atualizaLockScore(){
    localStorage.setItem('lockScore', lockScore);
    lockScoreEl.innerHTML = "LOCKSCORE: " + lockScore;
    mostrarLockScore.innerHTML = "LOCKSCORE: " + lockScore;
}

function atualizaLockCoin(){
    localStorage.setItem('lockCoin', lockCoin);
    lockCoinEl.innerHTML = "LOCKCOINS: " + lockCoin;
}

function mostraTelaVitoria(){
    telaMain.style.display = "none";
    telaVitoria.style.display = "flex" ;
    emTelaMain = false;
}

function mostraTelaDerrota(){
    telaMain.style.display = "none";
    telaDerrota.style.display = "flex" ;
    emTelaMain = false;
}

function voltaMain(){
    telaVitoria.style.display = "none" ;
    telaDerrota.style.display = "none" ;
    telaMain.style.display = "flex";
    emTelaMain = true;
    
    comecarJogo();
}

function mostraSaidaTela2(){
    for(let i = 0; i < boxSaida.length; i++){
        boxSaida2[i].innerHTML = combinacaoSaida[i];
    }

}

function mostraSaidaTela3(){
    for(let i = 0; i < boxSaida.length; i++){
        boxSaida3[i].innerHTML = combinacaoSaida[i];
    }

}


function mostraMenuVoltarOuVolta(){
    if(emJogo){
        voltarMenu.style.display = "flex";
    } else{
        window.location.href = "../index.html";
    }
}

function voltarJogo(){
       voltarMenu.style.display = "none"
}

function voltarInicio(){
    window.location.href = "../index.html";
}

function atualizarLogSub3(i){
    subtitulo3.innerHTML = possiveisLogs[i];
    subtitulo3.style.color = coresLogs[i];
}

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
        boxSaida[i].innerHTML = fontCadeadoFechado;
    }
}

function abreCadeados(){
    for(let i = 0; i < boxSaida.length; i++){
        boxSaida[i].innerHTML = fontCadeadoAberto;
    }
}

function atualizaElementosDomAoIniciar(){
        //atualiza o numero de tentativas no inicio
        atualizaTentativasSubtitulo();
        //atualiza log do subtitulo
        atualizarLogSub3(3);
        //retorna ao background default
        atualizaBackground(imgDefault);
        //faz som de tranca
        lockSound.play();
        //fecha os cadeados
        fechaCadeados();
        //ativa o botao de analisar
        ativaBotao(btnAnalisarCombinacao);
        //desativa o botao de gerar
        desativaBotao(btnGeraCombinacao);
            //caso não seja a primeira jogada ele limpará a combinacao da entrada
        if(jogadas > 0){
            limparBoxEntrada();
        }
        //jogadas totais contam como mais uma
        jogadas++;
}

function comecarJogo(){
    emTelaMain = true;
    //reinicia a combinacao de numeros que são corretos na entrada
    numCorretos = [];
    //fala que o jogo começou
    emJogo = true;
    //reinicia o numero de tentativas
    tentativas = 5;
    atualizaElementosDomAoIniciar();
    //gera a combinação e guarda na variavel global que guarda a combinacao correta
    combinacaoSaida = gerarCombinacao();

}

function gerarCombinacao(){
    //cria um array para guardar os numeros aleatorios gerados
    let combinacao = [];
    //a cada caixa ele gera um numero aleatorio
    for(let i = 0; i < boxSaida.length; i++){
        combinacao.push(Math.floor(Math.random() * 10));
    }

    console.log(combinacao)
    //retorna a combinaçao aleatoria
    return combinacao 
}

function verificarSeEntradaValida(entrada){
    let analiseValida = true;

    //caso os dados de entrada sejam maiores que 9 ou menores que 0 ou vazios eles serão considerados falsos
    for(let i = 0; i < boxEntrada.length; i++){
        if(entrada[i] > 9 || entrada[i] < 0 || entrada[i] == ""){
            analiseValida = false;
        }
    }

    return analiseValida;
}

function testarCombinacaoAtual(){
    //fala que as combinacoes sao iguais
    let saidaIgualEntrada = true;
    //recebe o valor da combinacao da entrada
    let combinacaoEntrada = receberValorEntrada();
    //caso os valores nao sejam iguais a var recebe falso
    for(let i = 0; i < boxEntrada.length; i++){
        if(combinacaoEntrada[i] != combinacaoSaida[i]){
            saidaIgualEntrada = false;
        }

    }

    //faz a verificacao se o numero esta certo e libera os cadeados que estão certos
    verificarSeNumeroEstaCerto(combinacaoEntrada, combinacaoSaida);
    //o numero de tentativas cai
    tentativas--;
    //atualiza o n de tentativas no dom
    atualizaTentativasSubtitulo();
    //retorna o resultado da comparacao, se for igual é true, se nao é false
    return resultadoComparacaoDeCombinacoes = saidaIgualEntrada;
}

function perdeu(){
    //o jogo acaba
    emJogo = false;
    //o botao de analisar é desativado  
    desativaBotao(btnAnalisarCombinacao);
    //o botao de gerar é ativado
    ativaBotao(btnGeraCombinacao);
    //atualiza o background para perdedor
    atualizaBackground(imgPerdeu);
    //o som de perda aparece
    loseSound.play();
    //mostra os numeros da combinacao
    mostraNumeros();
    //mostra saida das telas que mostram derrota ou vitoria
    mostraSaidaTela2();
    mostraSaidaTela3();

    //
    mostraTelaDerrota();
}

function ganhou(){
    //o jogo acaba
    emJogo = false;
    //o botao de analisar é desativado  
    desativaBotao(btnAnalisarCombinacao);
    //o botao de gerar é ativado
    ativaBotao(btnGeraCombinacao);
    //atualiza background para vencedor
    atualizaBackground(imgVenceu);
    //mostra os numeros da combinacao
    mostraNumeros();
    //mostra saida das telas que mostram derrota ou vitoria
    mostraSaidaTela2();
    mostraSaidaTela3();
    //
    mostraTelaVitoria();

    if(tentativas == 4){
        lockScore += 1000;
        atualizaLockScore();
    } else{
        lockScore += 25 * tentativas;
        atualizaLockScore();
    }


}

function mostraNumeros(){
    for(let i = 0; i < boxSaida.length; i++){
        boxSaida[i].innerHTML = combinacaoSaida[i];
    }
}

function analisarCombinacao(){
    let combinacoesSaoIguais;
    analiseValida = verificarSeEntradaValida(receberValorEntrada());

    if(analiseValida){
        combinacoesSaoIguais = testarCombinacaoAtual();

        

        if(combinacoesSaoIguais){
            atualizarLogSub3(1)
            ganhou();
        } else if(tentativas == 0 && emJogo){
            atualizarLogSub3(0);
            perdeu()
        }
        else{
            if(acertouUmNum && emJogo){
                atualizarLogSub3(4);

            } else{
                atualizarLogSub3(0);

            }
        }

    } else{
        atualizarLogSub3(2);
    }


}

function verificarSeNumeroEstaCerto(entrada, saida){
    //para cada item da entrada
    for(let i = 0; i < entrada.length; i++){
        //caso o item for correspondente a saida e esse numero nao esteja no numeros corretos
        if(entrada[i] == saida[i]){
            //o numero entra no lugar do cadeado
            boxSaida[i].innerHTML = entrada[i];

            if(!(numCorretos.includes(entrada[i]))){
                //som de cadeado desbloqueado toca caso o numero não tenha sido descoberto ainda
                atualizarLogSub3(4);
                unlockedSound.play();
                acertouUmNum = true;

            } else{
                acertouUmNum = false;
            }

            //envia o numero a lista de corretos
            numCorretos.push(entrada[i]);
        } else{
            boxSaida[i].innerHTML = fontCadeadoFechado;
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

document.addEventListener('keydown', function(event){
    if(event.key === "Enter" && emTelaMain){
        if(!(btnAnalisarCombinacao.disabled)){
            analisarCombinacao();
        } else if(!(btnGeraCombinacao.disabled)){
            comecarJogo();
        }
    }
})

atualizaTentativasSubtitulo();
desativaBotao(btnAnalisarCombinacao);
carregarTodosFundos();