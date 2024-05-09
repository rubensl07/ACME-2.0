import { editNacionalidade, getNacionalidade, postNacionalidade} from "../../funcoes.js";
const idPais = new URLSearchParams(window.location.search).get('idPais');


const nomeCampo = document.getElementById('nome')
const botaoConfirmar = document.getElementById('botaoConfirmar')

if(idPais){
    const infoPais = await getNacionalidade(idPais)
    nomeCampo.value=infoPais.pais
    botaoConfirmar.textContent='Salvar Alterações'
} else{
    botaoConfirmar.textContent='Criar'
}

botaoConfirmar.addEventListener('click',async ()=>{
    const pais = nomeCampo.value
    const info = {
        pais
    }
    let enviado = false
    if(idPais){
        enviado = await editNacionalidade(idPais,info)
    } else {
        enviado = await postNacionalidade(info)
    }
    if(enviado.success){
        window.location.href='./index.html'
    } else {
        alert('Ocorreu um erro')
    }
})
