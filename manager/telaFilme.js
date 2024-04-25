import { getFilme,postFilme, editFilme} from "../funcoes.js";
// const idUsuario = localStorage.getItem('idusuario');
// const admin = (await getUsuario(idUsuario)).admin
// if(!idUsuario || admin==0){window.location.href='../login/index.html'}
const id = new URLSearchParams(window.location.search).get('id');

let imagemAberta = 0

//Pegar elementos do HTML
const inputDigitado = document.getElementById('campoDigitacaoImagemInput')
const campoDigitacaoImagem = document.getElementById('campoDigitacaoImagem')
const tituloCampo = document.getElementById('titulo')
const sinopseCampo = document.getElementById('sinopse')
const dataLancamentoCampo = document.getElementById('dataLancamento')
const dataRelancamentoCampo = document.getElementById('dataRelancamento')
const duracaoCampo = document.getElementById('duracao')
const fotoCapaCampo = document.getElementById('foto_capa') 
const fotoFundoCampo = document.getElementById('foto_fundo')
const corCampo = document.getElementById('cor')
fotoCapaCampo.addEventListener('click',()=>{abrirCampoTrocarImagem(1)}) 
fotoFundoCampo.addEventListener('click',()=>{abrirCampoTrocarImagem(2)}) 


// tituloCampo.value='oi'
// sinopseCampo.value='oi'
// dataLancamentoCampo.value='2022-10-31'
// duracaoCampo.value='01:31'
// fotoCapaCampo.src = 'https://www.guiaviagensbrasil.com/imagens/Imagem%20do%20mar%20calma%20e%20belo%20da%20Praia%20da%20Engenhoca-Itacar%C3%A9-Bahia-BA.jpg'
// fotoFundoCampo.src = 'https://www.guiaviagensbrasil.com/imagens/Imagem%20do%20mar%20calma%20e%20belo%20da%20Praia%20da%20Engenhoca-Itacar%C3%A9-Bahia-BA.jpg'



function abrirCampoTrocarImagem(imagem){
    campoDigitacaoImagem.style.display='flex'
    inputDigitado.focus()
    imagemAberta = imagem
}
inputDigitado.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        trocarImagem()
        campoDigitacaoImagem.style.display='none'
        document.getElementById('campoDigitacaoImagemInput').value=''
    }
})
function trocarImagem(){
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
          
        if(imagemAberta==1){
            document.getElementById('foto_capa').src  = link
            console.log("Imagem 1 trocada")

        }  else
        if(imagemAberta==2){
            document.getElementById('foto_fundo').src = link
            console.log("Imagem 2 trocada")
        }
        console.log("Link digitado: "+link)
      }
}

if(id){
    const infoFilme = (await getFilme(id))
    tituloCampo.value = infoFilme.nome
    sinopseCampo.textContent= infoFilme.sinopse
    dataLancamentoCampo.value = infoFilme.data_lancamento.substr(0,10)
    if(infoFilme.data_relancamento){
        dataRelancamentoCampo.value = infoFilme.data_relancamento.substr(0,10)
    }
    duracaoCampo.value = infoFilme.duracao.slice(11, 16); 
    fotoCapaCampo.src = infoFilme.foto_capa
    if(infoFilme.foto_fundo){
        fotoFundoCampo.src = infoFilme.foto_fundo
    }
    corCampo.value = infoFilme.cor
    document.getElementById('botaoConfirmar').textContent='Salvar Alterações'
    document.getElementById('botaoConfirmar').addEventListener('click',()=>{confirmar(false)})
} else {
    document.getElementById('botaoConfirmar').textContent='Criar novo'
    document.getElementById('botaoConfirmar').addEventListener('click',()=>{confirmar(true)})
}



function confirmar(novo){
    const titulo            = tituloCampo.value
    const descricao         = sinopseCampo.value
    const dataLancamento    = dataLancamentoCampo.value
    const dataRelancamento  = dataRelancamentoCampo.value
    const duracao           = duracaoCampo.value
    const fotoCapa          = fotoCapaCampo.src
    const fotoFundo         = fotoFundoCampo.src
    const corPredominante = corCampo.value

    if(titulo == ''||descricao==''||dataLancamento==''||duracao==''||fotoCapa==''){
        let stringRestantes = '' 
        if(titulo==''){
            stringRestantes = stringRestantes + '\n - Título'
        }
        if(descricao==''){
            stringRestantes = stringRestantes + '\n - Descrição'
        }
        if(dataLancamento==''){
            stringRestantes = stringRestantes + '\n - Data de lançamento'
        }
        if(duracao==''){
            stringRestantes = stringRestantes + '\n - Duração'
        }
        if(fotoCapa==''){
            stringRestantes = stringRestantes + '\n - Foto de capa'
        }
        alert("Preencha todos os campos corretamente!\nCampos restantes: "+stringRestantes)
    } else 
        if(!validarDataRelancamento(dataLancamento,dataRelancamento)) {
            alert("Erro: A data de relançamento está anterior a data de lançamento.")
         } 
    else 
    {
        const novasInfos = {
            nome: titulo,
            sinopse: descricao,
            data_lancamento: dataLancamento,
            data_relancamento: dataRelancamento,
            duracao: duracao,
            foto_capa: fotoCapa,
            foto_fundo: fotoFundo,
            cor: corPredominante
        }
        if(novo){
            postFilme(novasInfos)
        } else {
            editFilme(id, novasInfos)
        }
        window.location.href='./index.html'
    }
}


function validarDataRelancamento(dataLancamento,dataRelancamento){
    dataLancamento = dataLancamento.split('-')
    dataLancamento = parseInt(dataLancamento[0]+dataLancamento[1]+dataLancamento[2])
    dataRelancamento = dataRelancamento.split('-')
    dataRelancamento = parseInt(dataRelancamento[0]+dataRelancamento[1]+dataRelancamento[2])
    if(dataLancamento>dataRelancamento){
        return false
    } else {
        return true
    }
}