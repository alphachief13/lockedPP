const statusEl = document.querySelector(".status");

function voltarJogo(){
    window.location.href = "jogo.html"
}


function adicionarElemento(numeroTentativa, combinacao, score, situacao){

    //crio uma div com class boxTentativa (main)
    let divBoxTentativa = document.createElement("div");
    divBoxTentativa.className = "boxTentativa";

    //crio uma div onde vai ficar o numero de jogadas e passo a classe respectiva (primaria)
    let divNumeroJogada = document.createElement("div");
    divNumeroJogada.className = "numeroJogada";
    
    //crio um elemento de paragrafo com classe jogada e um text content de numero de tentativa, adiciono esse p a div
    let pJogada = document.createElement("p");
    pJogada.className = "jogada";
    pJogada.textContent = numeroTentativa;
    divNumeroJogada.appendChild(pJogada);

    //div secundaria e divs dentro dela
    //crio as divs respectivas e adiciono suas respectivas classes e adiciono todas a div de conteudo
    var divContent = document.createElement("div");
    divContent.className = "content";
    var pCombinacao = document.createElement("p");
    pCombinacao.className = "combinacao";
    pCombinacao.textContent = "COMBINAÇÃO: " + combinacao;
    var pSituacao = document.createElement("p");
    pSituacao.className = "situacao";
    pSituacao.textContent = situacao;
    var pScore = document.createElement("p");
    pScore.className = "score";
    pScore.textContent = "SCORE: " + score;
    divContent.appendChild(pCombinacao);
    divContent.appendChild(pSituacao);
    divContent.appendChild(pScore);

    //adiciono as divs primarias e secundarias dentro da main
    divBoxTentativa.appendChild(divNumeroJogada);
    divBoxTentativa.appendChild(divContent);

    let todasTentativas = document.querySelector(".todasTentativas");
    todasTentativas.appendChild(divBoxTentativa);

}


function recuperaTentativas(){

    let stringTodasTentativas = localStorage.getItem('todasTentativas');
    let todasTentativas = JSON.parse(stringTodasTentativas);
    
    return todasTentativas;


}

let todasTentativas = recuperaTentativas();
let tamanhoTodasTentativas =  todasTentativas.length
if(!(tamanhoTodasTentativas)){
    statusEl.innerHTML = "PARECE QUE VOCÊ AINDA NÃO JOGOU NENHUMA VEZ"
}else{
    statusEl.innerHTML = "TODAS AS SUAS TENTATIVAS: "
}

if(todasTentativas){
    for(let i = 0; i < tamanhoTodasTentativas; i++){

        adicionarElemento(i+1, todasTentativas[i][0], todasTentativas[i][1], todasTentativas[i][2]);
    }

} 