const inputCalango = document.querySelector("#inputCalango");
const inputCheat = document.querySelector("#cheatInput");

function voltar(){
    window.location.href = "jogo.html";
}

function verificar(){
    if(inputCalango.value == "calango"){
        inputCheat.style.display = "block";
        inputCalango.value = "mude suas lockcoins";
        inputCheat.value = recebeLockCoin();
    }

    if(inputCheat.style.display == "block"){
        atualizaLockCoin(inputCheat.value);
    }

}

function atualizaLockCoin(x){
    localStorage.setItem('lockCoin', x);

}
function recebeLockCoin(){
    let lockcoin = localStorage.getItem('lockCoin');
    return lockcoin;
}