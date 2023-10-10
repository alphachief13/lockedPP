const inputCalango = document.querySelector("#inputCalango");
const inputCheat = document.querySelector("#cheatInput");

function voltar(){
    window.location.href = "jogo.html";
}

function verificar(){
    if(inputCalango.value == "calango"){
        inputCheat.style.display = "block";
    }
    if(inputCheat.style.display == "block"){
        atualizaLockCoin(inputCheat.value);
    }
}

function atualizaLockCoin(x){
    localStorage.setItem('lockCoin', x);

}