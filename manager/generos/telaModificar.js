import { editGenero, getGenero, postGenero } from "../../funcoes.js";
const idGenero = new URLSearchParams(window.location.search).get('idGenero');


const nomeCampo = document.getElementById('nome')
const botaoConfirmar = document.getElementById('botaoConfirmar')

if(idGenero){
    const infoGenero = await getGenero(idGenero)
    nomeCampo.value=infoGenero.nome
    botaoConfirmar.textContent='Salvar Alterações'
} else{
    botaoConfirmar.textContent='Criar'
}

botaoConfirmar.addEventListener('click',async ()=>{
    const nome = nomeCampo.value
    const info = {
        nome
    }
    let enviado = false
    if(idGenero){
        enviado = await editGenero(idGenero,info)
    } else {
        enviado = await postGenero(info)
    }
    if(enviado.success){
        window.location.href='./index.html'
    } else {
        alert('Ocorreu um erro')
    }
})
