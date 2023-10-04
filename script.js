//os cadeados estarão abertos até que gere uma combinação nova
//o botão de analisar combinação estará desativado até que gere uma combinação nova

const btnGeraCombinacao = document.querySelector("#btn-geraComb");
const btnAnalisarCombinacao = document.querySelector("#btn1");
const boxEntrada = document.querySelectorAll(".boxEntrada");
const boxSaida = document.querySelectorAll(".box");
const subtitulo = document.querySelector(".subtitulo");

const fontCadeadoAberto ='<span class="material-symbols-outlined">lock_open</span>'
const fontCadeadoFechado ='<span class="material-symbols-outlined">lock</span>'

let combinacaoEntrada = [];
let combinacaoSaida = [];
let jogadas = 0; 

function desativaBotao(btn){
    btn.disabled = true;
    btn.style.opacity = "0.5"
    btn.style.cursor = "default"
    btn.style.backgroundColor = "rgb(175, 93, 156)"
}

function ativaBotao(btn){
    btn.disabled = false;
    btn.style.opacity = "1"

    btn.onmouseover = function() {
        btn.style.backgroundColor = 'rgb(145, 53, 123)';
        btn.style.cursor = 'pointer';
      };

    btn.onmouseout = function(){
        btn.style.backgroundColor = 'rgb(175, 93, 156)';
    }
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

function gerarCombinacao(){
    let combinacao = [];
    

    for(let i = 0; i < boxSaida.length; i++){
        
        //gera um valor aleatorio para cada box
        combinacao.push(Math.floor(Math.random() * 10));

        //transforma o icon do cadeado em fechado
        boxSaida[i].innerHTML = fontCadeadoFechado;
    }



    ativaBotao(btnAnalisarCombinacao);
    desativaBotao(btnGeraCombinacao);
    subtitulo.innerHTML = "Adivinhe A Combinação (0-9)";
    if(jogadas > 0){
        limparBoxEntrada();
    }
    jogadas++;
    combinacaoSaida = combinacao;
    console.log(combinacaoSaida)
}

function analisarCombinacao(){
    let combinacaoCorreta = true;
    let combinacao = receberValorEntrada();

    for(let i = 0; i < boxEntrada.length; i++){
        if(combinacao[i] != combinacaoSaida[i]){
            combinacaoCorreta = false;
        }

    }

    desativaBotao(btnAnalisarCombinacao);
    ativaBotao(btnGeraCombinacao);
    if(combinacaoCorreta){
        subtitulo.innerHTML = "Combinação Correta!"
    } else{
        subtitulo.innerHTML = "Combinação Incorreta!"
    }
    return combinacaoCorreta;

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