import { getFilme,postFilme, editFilme, getGeneros,  getGenerosFilme, postGeneroFilme, removeGeneroFilme, validarDataInferior} from "../../funcoes.js";
const idFilme = new URLSearchParams(window.location.search).get('idFilme');

const listaGeneros = await getGeneros()


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
document.getElementById('openPannelAddGeneroButton').addEventListener('click',()=>{
    campoAddGeneros.classList.remove('hidden')
}) 
document.getElementById('closePannelAddGeneroButton').addEventListener('click',()=>{
    campoAddGeneros.classList.add('hidden')
})

listaGeneros.forEach(genero => {
    const option = document.createElement('option')
    option.value = genero.id
    option.textContent = genero.nome
    addGeneroSelect.appendChild(option)
});

const arrayGenerosOriginal = []
if(idFilme){
    const listaGenerosFilme = await getGenerosFilme(idFilme)
    if(listaGenerosFilme){
    listaGenerosFilme.forEach(genero =>{
        arrayGenerosOriginal.push(genero.id)
        criarGenero(genero.id)
    })
}
}
let arrayGenerosNova = arrayGenerosOriginal.slice()

function criarGenero(idGenero){
    let info
    listaGeneros.forEach(genero => {
        if(genero.id == idGenero){
            info = genero
        }
    });
    const generosContainer = document.getElementById('generosContainer')
    
    const genero = document.createElement('div')
    genero.classList.add('bg-gray-300','text-4xl','text-center','p-2','rounded-xl','relative')
    
    const nomeGenero = document.createElement('p')
    nomeGenero.textContent = info.nome
    
    const closeButton = document.createElement('img')
    closeButton.classList.add('absolute','closeButton','h-8','w-8','cursor-pointer')
    closeButton.src = "../../img/icons/xicon.png"


    genero.replaceChildren(nomeGenero,closeButton)
    generosContainer.appendChild(genero)
    closeButton.addEventListener('click',async ()=>{
        arrayGenerosNova = arrayGenerosNova.filter(array => array !== info.id)
        genero.remove();
    })
}


function abrirCampoTrocarImagem(imagem){
    campoDigitacaoImagem.style.display='flex'
    inputDigitado.focus()
    imagemAberta = imagem
}




document.getElementById('addGeneroButton').addEventListener('click',async ()=>{
    if(addGeneroSelect.value>0){
        let generoAdicionado = parseInt(addGeneroSelect.value)
        let disponivel = true
        arrayGenerosNova.forEach(generoId =>{
            if(generoAdicionado == generoId){
                disponivel = false
            }
        })
        if(disponivel){
            arrayGenerosNova.push(generoAdicionado)
            criarGenero(generoAdicionado)
        }
    }
    addGeneroSelect.value = 0
    campoAddGeneros.classList.add('hidden')
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

if(idFilme){
    document.getElementById('botaoConfirmar').textContent='Salvar Alterações'
    const infoFilme = (await getFilme(idFilme))
    tituloCampo.value = infoFilme.nome
    sinopseCampo.textContent= infoFilme.sinopse
    dataLancamentoCampo.value = infoFilme.data_lancamento.substr(0,10)
    if(infoFilme.data_relancamento){
        dataRelancamentoCampo.value = infoFilme.data_relancamento.substr(0,10)
    }
    duracaoCampo.value = infoFilme.duracao.slice(11, 16); 
    fotoCapaCampo.src = infoFilme.foto_capa
    fotoFundoCampo.src = infoFilme.foto_fundo
    corCampo.value = infoFilme.cor
    classificacaoCampo.options[infoFilme.classificacaoIndicativa.id-1].selected = true
} else {
    document.getElementById('botaoConfirmar').textContent='Criar'
}

document.getElementById('botaoConfirmar').addEventListener('click',async ()=>{
    const titulo            = tituloCampo.value
    const descricao         = sinopseCampo.value
    const dataLancamento    = dataLancamentoCampo.value
    const dataRelancamento  = dataRelancamentoCampo.value
    const duracao           = duracaoCampo.value
    const fotoCapa          = fotoCapaCampo.src
    const fotoFundo         = fotoFundoCampo.src
    const corPredominante   = corCampo.value
    const classificacao     = classificacaoCampo.options[classificacaoCampo.selectedIndex].value
    if(titulo == ''||descricao==''||dataLancamento==''||duracao==''||fotoCapa==''||fotoFundo==''){
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
        if(fotoFundo==''){
            stringRestantes = stringRestantes + '\n - Foto de fundo'
        }
        alert("Preencha todos os campos corretamente!\nCampos restantes: "+stringRestantes)
    } else 
        if(!validarDataInferior(dataLancamento,dataRelancamento)) {
            alert("Erro: A data de relançamento está anterior a data de lançamento.")
         } 
    else 
    {
        const infoFilme = {
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
        let filmeModificado = false
        if(idFilme){
            filmeModificado = await editFilme(idFilme, infoFilme)
        } else {
            filmeModificado = await postFilme(infoFilme)
        }
        if(filmeModificado.success){
            console.log(filmeModificado.data.id);
            const idAlterado = filmeModificado.data.id
        
        let generosASeremRemovidos = arrayGenerosOriginal.filter(numero => !arrayGenerosNova.includes(numero));
        let generosASeremAdicionados = arrayGenerosNova.filter(numero => !arrayGenerosOriginal.includes(numero));

        generosASeremRemovidos.forEach(async idGenero =>{
            let info = {
                idFilme: idAlterado,
                idGenero
            }
            const removerGeneroFilmeResult = await removeGeneroFilme(info)
            console.log(removerGeneroFilmeResult);
        });
        generosASeremAdicionados.forEach(async idGenero =>{
            let info = {
                idFilme: idAlterado,
                idGenero
            }
            const adicionarGeneroFilmeResult = await postGeneroFilme(info)
            console.log(adicionarGeneroFilmeResult);
        });
        window.location.href='./index.html'

    } else {
        alert('Ocorreu um erro')
    }
    }
})

