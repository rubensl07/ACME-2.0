import { getFilme, validarData, getDiretoresFilme, getAtoresFilme, getFavoritosUsuario, idUsuario, postFavorito, deleteFavorito } from "../funcoes.js";

document.getElementById('returnIcon').addEventListener('click',()=>{
    window.location.href='../home/index.html'
})

const idFilme = new URLSearchParams(window.location.search).get('idFilme');
if(!idFilme){window.location.href='../home/index.html'}

const infoFilme = await getFilme(idFilme)
document.title = infoFilme.nome
const titulo = document.getElementById('titulo')
const dataLancamento = document.getElementById('dataLancamento')
const dataRelancamento = document.getElementById('dataRelancamento')
const generos = document.getElementById('generos')
const duracao = document.getElementById('duracao')
const sinopse = document.getElementById('sinopse')
const imagemBackground = document.getElementById('imagemBackground')
const classificacaoIndicativaIcone = document.getElementById('classificacaoIndicativaIcone')
const classificacaoIndicativaSinopse = document.getElementById('classificacaoIndicativaSinopse')

titulo.textContent = infoFilme.nome
dataLancamento.textContent = validarData(infoFilme.data_lancamento)
if(infoFilme.data_relancamento){
    dataRelancamento.textContent = validarData(infoFilme.data_relancamento)
}
generos.textContent = criarStringGeneros(infoFilme.generos)
duracao.textContent = infoFilme.duracao.slice(11,19)
sinopse.textContent = infoFilme.sinopse
imagemBackground.style.backgroundImage = `url(${infoFilme.foto_fundo})`
document.documentElement.style.setProperty('--corPredominante', infoFilme.cor);
classificacaoIndicativaIcone.src = infoFilme.classificacaoIndicativa.icone
classificacaoIndicativaSinopse.textContent = infoFilme.classificacaoIndicativa.descricao

classificacaoIndicativaIcone.addEventListener('mouseover',()=>{
    classificacaoIndicativaSinopse.classList.remove('opacity-0')
})

classificacaoIndicativaIcone.addEventListener('mouseleave',()=>{
    classificacaoIndicativaSinopse.classList.add('opacity-0')
})
document.getElementById('castIcon').addEventListener('click',()=>{
    document.getElementById('castFieldF').classList.remove('w-0')
})

let contElementos = 0
const listaDiretoresFilme = await getDiretoresFilme(idFilme)
if(listaDiretoresFilme){
    const castField = document.getElementById('castField')
    const direcaoTEXT = document.createElement('h2')
    direcaoTEXT.textContent = 'direção'
    direcaoTEXT.classList.add('text-white','uppercase','text-7xl')

    const containerDiretores = document.createElement('div')

    listaDiretoresFilme.forEach(diretor => {
        console.log(diretor);
        const diretorCampo = document.createElement('div')
        diretorCampo.classList.add('flex','p-5','gap-3','cursor-pointer', 'h-60')

        const fotoDiretor = document.createElement('img')
        fotoDiretor.classList.add('h-full', 'rounded-2xl')
        fotoDiretor.src = diretor.foto

        const rightSide = document.createElement('div')
        rightSide.classList.add('h-full','flex','items-center')

        const nomeDiretor = document.createElement('h3')
        nomeDiretor.classList.add('text-white','text-2xl')
        nomeDiretor.textContent=diretor.nome

        rightSide.replaceChildren(nomeDiretor)
        diretorCampo.replaceChildren(fotoDiretor,rightSide)
        containerDiretores.appendChild(diretorCampo)

        diretorCampo.addEventListener('click',()=>{
            window.location.href='../directorPage/index.html?idDiretor='+diretor.id
        })
    });
    castField.appendChild(direcaoTEXT)
    castField.appendChild(containerDiretores)
} else {
    contElementos++
}

const listaAtoresFilme = await getAtoresFilme(idFilme)
if(listaAtoresFilme){
    const castField = document.getElementById('castField')
    const atuacaoTEXT = document.createElement('h2')
    atuacaoTEXT.textContent = 'atores'
    atuacaoTEXT.classList.add('text-white','uppercase', 'text-7xl')

    const containerAtores = document.createElement('div')

    listaAtoresFilme.forEach(ator => {
        const atorCampo = document.createElement('div')
        atorCampo.classList.add('flex','p-5','gap-3','cursor-pointer', 'h-60')

        const fotoAtor = document.createElement('img')
        fotoAtor.classList.add('h-full', 'rounded-2xl')
        fotoAtor.src = ator.foto

        const rightSide = document.createElement('div')
        rightSide.classList.add('h-full','flex','items-center')

        const nomeAtor = document.createElement('h3')
        nomeAtor.classList.add('text-white','text-2xl')
        nomeAtor.textContent = ator.nome

        rightSide.replaceChildren(nomeAtor)
        atorCampo.replaceChildren(fotoAtor, rightSide)
        containerAtores.appendChild(atorCampo)

        atorCampo.addEventListener('click',()=>{
            window.location.href='../actorPage/index.html?idAtor='+ator.id
        })
    });
    castField.appendChild(atuacaoTEXT)
    castField.appendChild(containerAtores)
} else {
    contElementos++
}

if(contElementos == 2){
    document.getElementById('castIcon').classList.add('hidden')
}


function criarStringGeneros(listaGenerosFilme){
    let string = ''
    listaGenerosFilme.forEach(genero => {
        string += genero.nome + ", "
    }); 
    return string.slice(0,string.length-2)
}

document.getElementById('castFieldF').addEventListener('click',()=>{
    document.getElementById('castFieldF').classList.add('w-0')
})
document.getElementById('castField').addEventListener('click',(event)=>{
    event.stopPropagation();
})

const listaFavoritos = await getFavoritosUsuario(idUsuario)
let favoritado = false

if(listaFavoritos){
    listaFavoritos.forEach(favorito => {
        if(favorito.id_filme == idFilme){
            favoritado = favorito
        } 
    });
}
const starIcon = document.getElementById('starIcon')
if(!favoritado){
    starIcon.src = '../img/icons/starUncheck.png'
    starIcon.addEventListener('click',async ()=>{
        const info = {
            idUsuario: parseInt(idUsuario),
            idFilme: parseInt(idFilme)
        }
        console.log(info);
        const addFavoritoResult = await postFavorito(info)
        if(addFavoritoResult){
            window.location.reload()
        } else {
            alert("Erro ao favoritar!!")
        }
    })

} else {
    starIcon.src = '../img/icons/starCheck.png'
    starIcon.addEventListener('click',async ()=>{
        const info = {
            idUsuario,
            idFilme
        }
        const removeFavoritoResult = await deleteFavorito(info)
        if(removeFavoritoResult){
            window.location.reload()
        } else {
            alert("Erro ao desfavoritar!!")
        }
    })
}