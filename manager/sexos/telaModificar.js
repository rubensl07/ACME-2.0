import { editSexo, getSexo, postSexo} from "../../funcoes.js";
const idSexo = new URLSearchParams(window.location.search).get('idSexo');


const nomeCampo = document.getElementById('nome')
const siglaCampo = document.getElementById('sigla')
const botaoConfirmar = document.getElementById('botaoConfirmar')

if(idSexo){
    const infoSexo = await getSexo(idSexo)
    nomeCampo.value=infoSexo.nome
    siglaCampo.value=infoSexo.sigla
    botaoConfirmar.textContent='Salvar Alterações'
} else{
    botaoConfirmar.textContent='Criar'
}

botaoConfirmar.addEventListener('click',async ()=>{
    const nome = nomeCampo.value
    const sigla = siglaCampo.value.toUpperCase()
    const info = {
        nome,
        sigla
    }
    let enviado = false
    if(idSexo){
        enviado = await editSexo(idSexo,info)
    } else {
        enviado = await postSexo(info)
    }
    if(enviado.success){
        window.location.href='./index.html'
    } else {
        alert('Ocorreu um erro')
    }
})