const jogarElement = document.querySelector("#jogar");
const instrucoesElement = document.querySelector("#instrucoes");
const contatoElement = document.querySelector("#contato");

let color = "rgb(175, 93, 156)"
let color2 = "rgb(145, 53, 123, 0)"

function entrar(){
    window.location.href = "pages/jogo.html";
}

function instrucoes(){
    window.location.href = "pages/instrucoes.html";
}

jogarElement.addEventListener('mouseover', ()=>{
    jogarElement.style.backgroundColor = color
    instrucoesElement.style.backgroundColor = color2
    contatoElement.style.backgroundColor = color2
})

instrucoesElement.addEventListener('mouseover', ()=>{
    jogarElement.style.backgroundColor = color2
    instrucoesElement.style.backgroundColor = color
    contatoElement.style.backgroundColor = color2
})

contatoElement.addEventListener('mouseover', ()=>{
    jogarElement.style.backgroundColor = color2
    instrucoesElement.style.backgroundColor = color2
    contatoElement.style.backgroundColor = color
})

jogarElement.style.backgroundColor = color

document.addEventListener('keydown', (event)=>{
    if(event.key === "Enter"){
        if(jogarElement.style.backgroundColor == color){
            entrar();
            
        } else if(instrucoesElement.style.backgroundColor == color){
            instrucoes();

        } else if(contatoElement.style.backgroundColor == color){
            //
        }
    }
    if(event.key === "ArrowUp" || event.key === "w"){
        if(jogarElement.style.backgroundColor == color){
            jogarElement.style.backgroundColor = color2
            instrucoesElement.style.backgroundColor = color2
            contatoElement.style.backgroundColor = color
            
        } else if(instrucoesElement.style.backgroundColor == color){
            jogarElement.style.backgroundColor = color
            instrucoesElement.style.backgroundColor = color2
            contatoElement.style.backgroundColor = color2

        } else if(contatoElement.style.backgroundColor == color){
            jogarElement.style.backgroundColor = color2
            instrucoesElement.style.backgroundColor = color
            contatoElement.style.backgroundColor = color2
        }
    }
    if(event.key === "ArrowDown" || event.key === "s"){
        if(jogarElement.style.backgroundColor == color){
            jogarElement.style.backgroundColor = color2
            instrucoesElement.style.backgroundColor = color
            contatoElement.style.backgroundColor = color2
            
        } else if(instrucoesElement.style.backgroundColor == color){
            jogarElement.style.backgroundColor = color2
            instrucoesElement.style.backgroundColor = color2
            contatoElement.style.backgroundColor = color

        } else if(contatoElement.style.backgroundColor == color){
            jogarElement.style.backgroundColor = color
            instrucoesElement.style.backgroundColor = color2
            contatoElement.style.backgroundColor = color2
        }
    }
})