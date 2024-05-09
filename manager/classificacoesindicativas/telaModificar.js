import { editClassificacaoIndicativa, getClassificacaoIndicativa, postClassificacaoIndicativa } from "../../funcoes.js";
const idClassificacaoIndicativa = new URLSearchParams(window.location.search).get('idClassificacaoIndicativa');


const idadeCampo = document.getElementById('idade')
const descricaoCampo = document.getElementById('descricao')
const iconeCampo = document.getElementById('icone')
const botaoConfirmar = document.getElementById('botaoConfirmar')
const inputDigitado = document.getElementById('campoDigitacaoImagemInput')

if(idClassificacaoIndicativa){
    const infoClassificacaoIndicativa = await getClassificacaoIndicativa(idClassificacaoIndicativa)
    idadeCampo.value=infoClassificacaoIndicativa.idade
    descricaoCampo.value=infoClassificacaoIndicativa.descricao
    iconeCampo.src=infoClassificacaoIndicativa.icone
    botaoConfirmar.textContent='Salvar Alterações'
} else{
    botaoConfirmar.textContent='Criar'
}

botaoConfirmar.addEventListener('click',async ()=>{
    const idade= idadeCampo.value.toUpperCase()
    const descricao = descricaoCampo.value
    const icone = iconeCampo.src

    const info = {
        idade,
        descricao,
        icone
    }
    let enviado = false
    if(idClassificacaoIndicativa){
        enviado = await editClassificacaoIndicativa(idClassificacaoIndicativa,info)
    } else {
        enviado = await postClassificacaoIndicativa(info)
    }
    if(enviado.success){
        window.location.href='./index.html'
    } else {
        alert('Ocorreu um erro')
    }
})

iconeCampo.addEventListener('click',()=>{
    document.getElementById('campoDigitacaoImagem').classList.remove('hidden')
    document.getElementById('campoDigitacaoImagem').classList.add('flex')
    inputDigitado.focus()
}) 

inputDigitado.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        const link = inputDigitado.value
        function isValidUrl(string) {
            try {
              new URL(string);
              return true;
            } catch (err) {
              return false;
            }
          }
          if(isValidUrl(link)){
            iconeCampo.src = link
            console.log("Link digitado: "+link)
          }
          document.getElementById('campoDigitacaoImagem').classList.remove('flex')
          document.getElementById('campoDigitacaoImagem').classList.add('hidden')
        document.getElementById('campoDigitacaoImagemInput').value=''
    }
})

