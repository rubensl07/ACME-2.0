import { addAtorFilme, addNacionalidadeAtor, editAtor, getAtor, getFilmes, getFilmesAtor, getNacionalidades, getSexos, postAtor, removeAtorFilme, removeNacionalidadeAtor, validarDataInferior } from "../../funcoes.js";

const idAtor = new URLSearchParams(window.location.search).get('idAtor');

const listaSexos = await getSexos()
const listaNacionalidades = await getNacionalidades()
const listaFilmes = await getFilmes()

const nacionalidadeSelect = [2]
nacionalidadeSelect[0] = document.getElementById('nacionalidadeSelect1')
nacionalidadeSelect[1] = document.getElementById('nacionalidadeSelect2')
const sexoSelect= document.getElementById('sexoSelect')
const nomeCampo = document.getElementById('nome')
const nascimentoCampo = document.getElementById('nascimento')
const falecimentoCampo = document.getElementById('falecimento')
const imagemCampo = document.getElementById('foto')
const inputDigitado = document.getElementById('campoDigitacaoImagemInput')
const addFilmeSelect = document.getElementById('addFilmeSelect')
const botaoConfirmar = document.getElementById('botaoConfirmar')

listaSexos.forEach(sexo => {
    const option = document.createElement('option')
    option.value = sexo.id
    option.textContent = sexo.sigla
    sexoSelect.appendChild(option)
});

listaFilmes.forEach(filme => {
    const option = document.createElement('option')
    option.value = filme.id
    option.textContent = filme.nome
    addFilmeSelect.appendChild(option)
});

for (let index = 0; index < nacionalidadeSelect.length; index++) {
    listaNacionalidades.forEach(nacionalidade => {
        const option = document.createElement('option')
        option.value = nacionalidade.id
        option.textContent = nacionalidade.pais
        nacionalidadeSelect[index].appendChild(option)
    });
}

const nacionalidadeOriginal = [0,0]

if(idAtor){
    botaoConfirmar.textContent='Salvar Alterações'
    const infoAtor = await getAtor(idAtor)
    nomeCampo.value=infoAtor.nome
    nascimentoCampo.value=infoAtor.nascimento.slice(0,10)
    if(infoAtor.falecimento){
        falecimentoCampo.value=infoAtor.falecimento.slice(0,10)
    }
    imagemCampo.src = infoAtor.foto

    if(infoAtor.nacionalidade){
        let listaNacionalidadesAtor = infoAtor.nacionalidade
        for (let index = 0; index < listaNacionalidadesAtor.length; index++) {
            if(listaNacionalidadesAtor[index]){
                nacionalidadeOriginal[index] = listaNacionalidadesAtor[index].id
            }
            nacionalidadeSelect[index].value = nacionalidadeOriginal[index]
        }
    }
} else{
    botaoConfirmar.textContent='Criar'
}

botaoConfirmar.addEventListener('click',async ()=>{
    const nome = nomeCampo.value
    const nascimento = nascimentoCampo.value
    const falecimento = falecimentoCampo.value
    const foto = imagemCampo.src
    const id_sexo = sexoSelect.value

    const nacionalidadeAtual = [2]
    nacionalidadeAtual[0] = parseInt(nacionalidadeSelect[0].value)
    nacionalidadeAtual[1] = parseInt(nacionalidadeSelect[1].value)
    if(nome == ''||nascimento==''||foto==''){
        let stringsRestantes = ''
        if(nome==''){
            stringsRestantes = stringsRestantes + '\n - Nome'
        }
        if(nascimento==''){
            stringsRestantes = stringsRestantes + '\n - Data de nascimento'
        }
        if(foto==''){
            stringsRestantes = stringsRestantes + '\n - Foto'
        }
        alert("Preencha todos os campos corretamente!\nCampos restantes: "+stringsRestantes)
    } else 
        if(!validarDataInferior(nascimento,falecimento)){
            alert("Erro: A data de nascimento está anterior a data de falecimento.")
        } else if(nacionalidadeAtual[0]!=0 && nacionalidadeAtual[0]==nacionalidadeAtual[1]){
            alert("Erro: As duas nacionalidades inseridas são iguais.")
        } else
    {


    const info = {
        nome,
        nascimento,
        falecimento,
        foto,
        id_sexo
    }
    let enviado = false
    if(idAtor){
        enviado = await editAtor(idAtor,info)
    } else {
        enviado = await postAtor(info)
    }
    if(enviado.success){
        const idAtorModificado = enviado.data.id

        for (let index = 0; index < 2; index++) {
            if((nacionalidadeOriginal[index]!=nacionalidadeAtual[index])){
                if(nacionalidadeOriginal[index]!=0){
                    const exclusaoJSON = {
                        idAtor: idAtorModificado,
                        idNacionalidade: nacionalidadeOriginal[index]
                    }
                    const removerNacionalidadeAtorResult = removeNacionalidadeAtor(exclusaoJSON)
                    console.log(removerNacionalidadeAtorResult);
                }
                if(nacionalidadeAtual[index]!=0){
                    const adicionadoJSON = {
                        idAtor: idAtorModificado,
                        idNacionalidade: nacionalidadeAtual[index]
                    }
                    const adicionarNacionalidadeAtorResult = addNacionalidadeAtor(adicionadoJSON)
                    console.log(adicionarNacionalidadeAtorResult);
                }
            }
        }
        let filmesASeremRemovidos = arrayFilmesOriginal.filter(numero => !arrayFilmesNova.includes(numero));
        let filmesASeremAdicionados = arrayFilmesNova.filter(numero => !arrayFilmesOriginal.includes(numero));

        filmesASeremRemovidos.forEach(async idFilme => {
            let json = {
                idFilme,
                idAtor: idAtorModificado
            }
            const removerAtorFilmeResult = await removeAtorFilme(json)
            console.log(removerAtorFilmeResult);
        });
        filmesASeremAdicionados.forEach(async idFilme => {
            let json = {
                idFilme,
                idAtor: idAtorModificado
            }
            const adicionarAtorFilmeResult = await addAtorFilme(json)
            console.log(adicionarAtorFilmeResult);
        });
        window.location.href='./index.html'
    } else {
        alert('Ocorreu um erro')
    }
}
})


imagemCampo.addEventListener('click',()=>{
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
            imagemCampo.src = link
            console.log("Link digitado: "+link)
          }
          document.getElementById('campoDigitacaoImagem').classList.remove('flex')
          document.getElementById('campoDigitacaoImagem').classList.add('hidden')
        document.getElementById('campoDigitacaoImagemInput').value=''
    }
})


function criarFilme(idFilme){
    let info
    listaFilmes.forEach(filme => {
        if(filme.id == idFilme){
            info = filme
        }
    });
    const filmeContainer = document.getElementById('generosContainer')
    
    const filme = document.createElement('div')
    filme.classList.add('bg-gray-300','text-4xl','text-center','p-2','rounded-xl','relative')
    
    const nomeFilme = document.createElement('p')
    nomeFilme.textContent = info.nome
    
    const closeButton = document.createElement('img')
    closeButton.classList.add('absolute','closeButton','h-8','w-8','cursor-pointer')
    closeButton.src = "../../img/icons/xicon.png"


    filme.replaceChildren(nomeFilme,closeButton)
    filmeContainer.appendChild(filme)
    closeButton.addEventListener('click',async ()=>{
        arrayFilmesNova = arrayFilmesNova.filter(array => array !== info.id)
        filme.remove();
    })
}

const arrayFilmesOriginal = []
if(idAtor){
    const listaFilmesAtor = await getFilmesAtor(idAtor)
    if(listaFilmesAtor){
    listaFilmesAtor.forEach(filme =>{
        arrayFilmesOriginal.push(filme.id)
        criarFilme(filme.id)
    })
}
}
let arrayFilmesNova = arrayFilmesOriginal.slice()

document.getElementById('openPannelAddFilmeButton').addEventListener('click',()=>{
    document.getElementById('campoAddFilme').classList.remove('hidden')
})
document.getElementById('closePannelAddFilmeButton').addEventListener('click',()=>{
    document.getElementById('campoAddFilme').classList.add('hidden')
})


document.getElementById('addFilmeButton').addEventListener('click',async ()=>{
    if(addFilmeSelect.value>0){
        let filmeAdicionado = parseInt(addFilmeSelect.value)
        let disponivel = true
        arrayFilmesNova.forEach(filmeId =>{
            if(filmeAdicionado == filmeId){
                disponivel = false
            }
        })
        if(disponivel){
            arrayFilmesNova.push(filmeAdicionado)
            criarFilme(filmeAdicionado)
        }
    }
    addFilmeSelect.value = 0
    document.getElementById('campoAddFilme').classList.add('hidden')
})