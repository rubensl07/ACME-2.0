'use strict'
import { pesquisarFilme, filtrarFilmes, getGeneros, getFilmes, getUsuario, getUsuarios, verificarUsuarioExistente} from "../funcoes.js";
const idUsuario = localStorage.getItem('idusuario')

const searchBar = document.getElementById('searchBar')
const container = document.getElementById('container')

const listaGeneros = await getGeneros()
const containerGeneros = document.getElementById('containerGenerosCheckboxes')

if(listaGeneros){
    listaGeneros.forEach(genero => {
        const generoDiv = document.createElement('div')
        generoDiv.classList.add('flex','gap-3')
        const generoCheckbox= document.createElement('input')
        generoCheckbox.setAttribute('type','checkbox')
        generoCheckbox.checked = true
        const size = 12
        generoCheckbox.classList.add(`h-${size}`,`w-${size}`,'generoCheckbox')
        const generoText = document.createElement('p')
        generoText.textContent=genero.nome
        generoText.classList.add('text-2xl','text-white')
        generoDiv.replaceChildren(generoCheckbox,generoText)
        containerGeneros.appendChild(generoDiv)
    });
}

let usuarioExistente= await verificarUsuarioExistente(idUsuario);
if(idUsuario){
    if(usuarioExistente){
        loginButton.classList.add('hidden')
        document.getElementById('infoUserButton').classList.remove('hidden')
        const infoUsuario = await getUsuario(idUsuario)
        document.getElementById('fotoUsuario').src = infoUsuario.foto_usuario
    } else {
        localStorage.removeItem('idusuario')
    }
} 

function criarNotFound(){
    container.classList.remove('grid','grid-cols-3','pt-40','pb-20','px-36','gap-16')
    container.classList.add('h-5/6','flex','justify-center','items-center')
    const notFound = document.createElement('div')
    notFound.classList.add('h-full','pt-40','pb-20','w-96','flex','flex-col','justify-center','items-center','gap-4')
    const img = document.createElement('img')
    img.classList.add('aspect-square','h-80','rounded-full','ghostface','hover:h-96','duration-300','cursor-pointer')
    img.src = '../img/ghostface4042.png'
    const text = document.createElement('p')
    text.classList.add('text-2xl','text-gray-300', 'text-center','hover:text-white','cursor-pointer')
    text.textContent = 'Sentimos muito! Não foi encontrado nenhum item no nosso catálogo com esses parâmetros.'
    notFound.replaceChildren(img,text)
    container.replaceChildren(notFound)
    searchBar.focus()
    img.addEventListener('click',searchPanico)
    text.addEventListener('click',searchPanico)
    async function searchPanico(){
        excluirCardsFilmes()
        document.getElementById('searchBar').value = 'Todo Mundo Em Pânico'
        const data = await pesquisarFilme(document.getElementById('searchBar').value)
            data.forEach(filme => {
                criarCard(filme)
            })
    }
}
function criarCard(info){
    container.classList.remove('h-5/6','flex','justify-center','items-center')
    container.classList.add('grid','grid-cols-3','pt-40','pb-20','px-36','gap-16')
    const card = document.createElement('div')
    card.classList.add('flex','items-center', 'h-52','py-6','px-1.5','rounded-2xl','cursor-pointer','embranquecer')
    card.style.background = `linear-gradient(140deg, rgb(20,20,20),${info.cor})`;
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
    card.replaceChildren(leftSide,rightSide)
    container.appendChild(card)
    card.addEventListener('click',()=>{
        window.location.href='../home/index.html?id='+info.id
    })
}
if(await getFilmes()){
    (await getFilmes()).forEach(filme => {
        criarCard(filme)
    });
}


document.getElementById('logo').addEventListener('click', () => {
    window.location.href = '../home/index.html'
})
searchBar.addEventListener('keyup',async (event)=>{
    excluirCardsFilmes()
    const data = await pesquisarFilme(document.getElementById('searchBar').value)
    if(data!=undefined){
        data.forEach(filme => {
            criarCard(filme)
        });
    } else {
        criarNotFound()
    }
})

const filtrarPage = document.getElementById('filtrarPage')
const listaCheckboxesGeneros = document.querySelectorAll('.generoCheckbox')

document.getElementById('filtrarIcon').addEventListener('click',()=>{
    filtrarPage.style.display='block'

})

document.getElementById('cleanFilterButton').addEventListener('click',async ()=>{
    document.getElementById('dataMinima').value = ''
    document.getElementById('dataMaxima').value = ''
    document.getElementById('faixaEtariaSelect').value = 6
    listaCheckboxesGeneros.forEach(element => {
        element.checked=true
    });
})
document.getElementById('zerarButton').addEventListener('click',async ()=>{
    listaCheckboxesGeneros.forEach(element => {
        element.checked=false
    });
})
document.getElementById('checkButton').addEventListener('click',async ()=>{
    listaCheckboxesGeneros.forEach(element => {
        if(element.checked){element.checked=false}
        else {element.checked=true}
    });
})
document.getElementById('cancelFiltrosButton').addEventListener('click',async ()=>{
    filtrarPage.style.display='none'
})

document.getElementById('aplicarFiltrosButton').addEventListener('click',async ()=>{
    filtrarPage.style.display='none'
    excluirCardsFilmes()

    let listaChecks = []
    listaCheckboxesGeneros.forEach(checkbox => {
        listaChecks.push(checkbox.checked)
    });
    
    const maxAge = document.getElementById('faixaEtariaSelect').options[document.getElementById('faixaEtariaSelect').selectedIndex].value;
    for (let cont = 0; cont < listaGeneros.length; cont++) {
        listaGeneros[cont].checked = listaChecks[cont]
    }
    let filtragem = {
        generos: listaGeneros,
        maxAge,
        search: searchBar.value
    }
    const dataMinima = document.getElementById('dataMinima').value
    const dataMaxima = document.getElementById('dataMaxima').value

    if(dataMinima){
        filtragem.dataMinima = dataMinima
    }
    if(dataMaxima){
        filtragem.dataMaxima = dataMaxima
    }
    const data = await filtrarFilmes(filtragem)
    if(data!=undefined){
        data.forEach(filme => {
            criarCard(filme)
        });
    } else {
        criarNotFound()
    }
})
function excluirCardsFilmes(){
    container.innerHTML=''
}