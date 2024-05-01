import { getFilme,postFilme, editFilme, getGeneros,  getGenerosFilme,deleteGeneroFilme, postGeneroFilme} from "../funcoes.js";
// const idUsuario = localStorage.getItem('idusuario');
// const admin = (await getUsuario(idUsuario)).admin
// if(!idUsuario || admin==0){window.location.href='../login/index.html'}
const id = new URLSearchParams(window.location.search).get('id');

let imagemAberta = 0

//Pegar elementos do HTML
const inputDigitado = document.getElementById('campoDigitacaoImagemInput')
const campoDigitacaoImagem = document.getElementById('campoDigitacaoImagem')
const campoAddGeneros = document.getElementById('campoAddGenero')
const addGeneroSelect = document.getElementById('addGeneroSelect')
const tituloCampo = document.getElementById('titulo')
const sinopseCampo = document.getElementById('sinopse')
const dataLancamentoCampo = document.getElementById('dataLancamento')
const dataRelancamentoCampo = document.getElementById('dataRelancamento')
const duracaoCampo = document.getElementById('duracao')
const fotoCapaCampo = document.getElementById('foto_capa') 
const fotoFundoCampo = document.getElementById('foto_fundo')
const corCampo = document.getElementById('cor')
const classificacaoCampo = document.getElementById('classificacao')

fotoCapaCampo.addEventListener('click',()=>{abrirCampoTrocarImagem(1)}) 
fotoFundoCampo.addEventListener('click',()=>{abrirCampoTrocarImagem(2)})
document.getElementById('openPannelAddGeneroButton').addEventListener('click',abrirCampoAdicionarGenero) 


const listaGeneros = await getGeneros()
listaGeneros.forEach(genero => {
    const option = document.createElement('option')
    option.value = genero.id
    option.textContent = genero.nome
    addGeneroSelect.appendChild(option)
});

function preencherGeneros(generos){
    generos.forEach(genero => {
        criarGenero(genero)
    });
}

function criarGenero(info){
    const generosContainer = document.getElementById('generosContainer')
    
    const genero = document.createElement('div')
    genero.classList.add('bg-gray-300','text-4xl','text-center','p-2','rounded-xl','relative')
    
    const nomeGenero = document.createElement('p')
    nomeGenero.textContent = info.nome
    
    const closeButton = document.createElement('img')
    closeButton.classList.add('absolute','closeButton','h-8','w-8','cursor-pointer')
    closeButton.src = "../img/icons/xicon.png"


    genero.replaceChildren(nomeGenero,closeButton)
    generosContainer.appendChild(genero)

    closeButton.addEventListener('click',async ()=>{
        excluirGeneros.push(info)
    })
    

}
function excluirCardsGeneros(){
    generosContainer.innerHTML=''
}


function abrirCampoAdicionarGenero(){
    campoAddGeneros.style.display='flex'
}
function abrirCampoTrocarImagem(imagem){
    campoDigitacaoImagem.style.display='flex'
    inputDigitado.focus()
    imagemAberta = imagem
}

document.getElementById('closePannelAddGeneroButton').addEventListener('click',()=>{
    campoAddGeneros.style.display='none'
})
const novosGeneros = []
const excluirGeneros = []
document.getElementById('addGeneroButton').addEventListener('click',async ()=>{
   
    if(addGeneroSelect.value>0){
        const dados = {
            idFilme: id,
            idGenero: addGeneroSelect.value
        }
        novosGeneros.push(dados)
        const tempInfo= {
            nome: addGeneroSelect.options[addGeneroSelect.value].textContent
        }
        criarGenero(tempInfo)
    }
    campoAddGeneros.style.display='none'
})
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
    classificacaoCampo.options[infoFilme.classificacaoIndicativa.id-1].selected = true
    if(infoFilme.generos.length>0){
        let oldGeneros = []
        const listaGenerosFilme = await getGenerosFilme(id)
        listaGenerosFilme.forEach(element =>{
            oldGeneros.push(element.id)
        })
        console.log(oldGeneros)
        preencherGeneros(listaGenerosFilme)
    }

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
    const classificacao = classificacaoCampo.options[classificacaoCampo.selectedIndex].value
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
            cor: corPredominante,
            classificacao
        }
        if(novo){
            postFilme(novasInfos)
        } else {
            editFilme(id, novasInfos)
        }
        if(novosGeneros>0){
            novosGeneros.forEach(element => {
                postGeneroFilme(element)
            });
        }
        if(excluirGeneros>0){
            excluirGeneros.forEach(element => {
                deleteGeneroFilme(element)
            });
        }
        window.location.href='./manager.html'
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