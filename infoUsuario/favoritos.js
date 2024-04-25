const idUsuario = localStorage.getItem('idusuario')
if(!idUsuario) {window.location.href='../login/index.html'}

import {getFavoritosUsuario, getFilmes, getUsuario,deleteFavorito} from "../funcoes.js"

const infoUsuario = (await getUsuario(idUsuario))

const container = document.getElementById('container')
const editarFilmesButton = document.getElementById('editarFilmesButton')
if(infoUsuario.admin==1){
    editarFilmesButton.classList.remove('invisible')
}

const listaFavoritos = await getFavoritosUsuario(idUsuario)
const listaFilmes = await getFilmes()

function listarFilmesFavoritosUsuario(){
    const listaFilmesFavoritosUsuario = []
    listaFavoritos.forEach(favorito =>{
        listaFilmes.forEach(filme => {
            if(filme.id == favorito.filme_id){
                listaFilmesFavoritosUsuario.push(filme)
            }
    })
    });
    return listaFilmesFavoritosUsuario
}
if(listaFavoritos){
    const favoritosUsuario = listarFilmesFavoritosUsuario()
        favoritosUsuario.forEach(favorito => {
            criarFavoritos(favorito)
    });
} else {
    criarCampoSemFavoritos()
}


function criarFavoritos(info){
    container.classList.add('grid','grid-cols-3','px-36','gap-10')
    const card = document.createElement('div')
    card.classList.add('z-0','flex','items-center', 'h-52','p-3','rounded-2xl','cursor-pointer','gap-4','relative')
    card.style.background = `linear-gradient(140deg, rgb(20,20,20),${info.cor})`;
    const closeButton = document.createElement('img')
    closeButton.src='../img/icons/xicon.png'
    closeButton.classList.add('z-10','p-1','absolute','h-10','bg-red-500','rounded-full','closePosition')
    const leftSide = document.createElement('div')
    leftSide.classList.add('flex','justify-center','items-center','h-full','w-2/6')
    const img = document.createElement('img')
    img.classList.add('h-full','rounded-xl','poster')
    img.src=info.foto_capa
    const rightSide = document.createElement('div')
    rightSide.classList.add('h-full','flex','flex-col','w-4/6')
    const titulo = document.createElement('h1')
    titulo.classList.add('mb-3','text-2xl','text-center', 'text-zinc-300')
    titulo.textContent=info.nome
    const sinopse = document.createElement('p')
    sinopse.classList.add('h-full','overflow-hidden','text-zinc-200')
    sinopse.textContent=info.sinopse
    rightSide.replaceChildren(titulo,sinopse)
    leftSide.replaceChildren(img)
    card.replaceChildren(closeButton,leftSide,rightSide)
    container.appendChild(card)
    card.addEventListener('click',()=>{
        window.location.href='../home/home.html?id='+info.id
    })
    closeButton.addEventListener('click',()=>{
        const informacoes = {
            idUsuario,
            idFilme: info.id
        }
        deleteFavorito(informacoes)
        window.location.reload()
    })
}

function criarCampoSemFavoritos(){
    container.classList.add('h-5/6','flex','justify-center','items-center')
    const notFound = document.createElement('div')
    notFound.classList.add('h-96','w-96','flex','flex-col','items-center','gap-4')
    const img = document.createElement('img')
    img.classList.add('h-80')
    img.src = '../img/icons/estrela.png'
    const text = document.createElement('p')
    text.classList.add('text-2xl','text-gray-300', 'text-center')
    text.textContent = 'Aqui serão exibidos os seus filmes favoritos.'
    const button = document.createElement('a')
    button.textContent="Navegar"
    button.classList.add('bg-gray-500', 'px-6','py-4', 'rounded-2xl', 'text-xl','hover:text-white','cursor-pointer')
    button.setAttribute('href','../home/home.html')
    notFound.replaceChildren(img,text,button)
    container.replaceChildren(notFound)
}
