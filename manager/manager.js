
import { getFilmesSort, deleteFilme, validarData, getUsuario, deleteFavoritosFilme} from "../funcoes.js";

const idUsuario = localStorage.getItem('idusuario');
const admin = (await getUsuario(idUsuario)).admin
if(!idUsuario || admin==0){window.location.href='../login/index.html'}
let ordem = -1;
let listaFilmes 

async function alterarOrdem(){
    let sort
    if(ordem>5){ordem = 0}
    if(ordem==0){sort = 'id'}
    if(ordem==1){sort = 'nome'}
    if(ordem==2){sort = 'data_lancamento desc'}
    if(ordem==3){sort = 'data_lancamento'}
    if(ordem==4){sort = 'duracao desc'}
    if(ordem==5){sort = 'duracao'}
    return sort
}
const filmes = document.getElementById('filmes')


iniciarTela()
async function iniciarTela(){
    ordem++
    listaFilmes = (await getFilmesSort(await alterarOrdem()))
    excluirListaFilmes()
    criarFilmes()
    if(ordem==0){document.getElementById('sortField').textContent="ID"}
    if(ordem==1){document.getElementById('sortField').textContent="Ordem Alfabética"}
    if(ordem==2){document.getElementById('sortField').textContent="Mais recente"}
    if(ordem==3){document.getElementById('sortField').textContent="Mais antigo"}
    if(ordem==4){document.getElementById('sortField').textContent="Mais longo"}
    if(ordem==5){document.getElementById('sortField').textContent="Mais curto"}
}



document.getElementById('botaoAdicionar').addEventListener('click',()=>{
    window.location.href='./telaFilme.html'
})

document.getElementById('botaoDeletar').addEventListener('click',()=>{
        const divsFilme = document.querySelectorAll('.filme');
        const lista = []; 
    
    divsFilme.forEach(function(div) {
        const checkbox = div.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            const id = div.querySelector('.id').textContent;
            lista.push(id);
        }
    });

    lista.forEach(filmeASerDeletado => {
        deleteFavoritosFilme(filmeASerDeletado)
        deleteFilme(filmeASerDeletado)
    });

    if(lista.length>0)
    window.location.reload()
})

document.getElementById('botaoSort').addEventListener('click',async()=>{
    iniciarTela()
    alterarOrdem()
})
document.getElementById('botaoSort').addEventListener('mouseenter',()=>{
    document.getElementById('sortField').classList.remove('opacity-0')
})
document.getElementById('botaoSort').addEventListener('mouseleave',()=>{
    document.getElementById('sortField').classList.add('opacity-0')
})

function criarFilme(info){
    
    const filme = document.createElement('div')
    filme.classList.add('filme', 'flex', 'bg-neutral-100', 'ml-8', 'rounded-lg', 'w-5/6', 'h-20'); 
    
    const nullSpace = document.createElement('div')
    nullSpace.classList.add('flex','w-20','items-center')
    
    const checkbox = document.createElement('input')
    checkbox.classList.add('w-full', 'h-1/2')
    checkbox.setAttribute("type", "checkbox")
    
    const barraCinza = [4]
    
    barraCinza[0] = document.createElement('div')
    
    const id = document.createElement('p')
    id.textContent=info.id
    id.classList.add('id', 'text-black', 'w-16', 'flex', 'justify-center', 'items-center', 'text-5xl');
    
    barraCinza[1] = document.createElement('div')
    
    const titulo = document.createElement('p')
    titulo.classList.add('overflow-hidden', 'tamanhoTitulo', 'flex', 'items-center', 'ml-5', 'text-blue-700', 'hover:underline', 'cursor-pointer', 'text-black', 'text-4xl');
    titulo.textContent=info.nome
    
    barraCinza[2] = document.createElement('div')
    
    const lancamento = document.createElement('p')
    lancamento.textContent=validarData(info.data_lancamento)
    lancamento.classList.add('w-56', 'text-black', 'flex', 'justify-center', 'items-center', 'text-4xl');
    
    barraCinza[3] = document.createElement('div')

    const duracao = document.createElement('p')

    duracao.textContent= info.duracao.slice(11, 19);
    duracao.classList.add('text-black', 'ml-10', 'flex', 'items-center', 'text-4xl');


barraCinza.forEach(barra => {
    barra.classList.add('bg-neutral-400')
    barra.classList.add('w-2')
});
    nullSpace.replaceChildren(checkbox)
    filme.replaceChildren(nullSpace,barraCinza[0],id,barraCinza[1],titulo,barraCinza[2],lancamento,barraCinza[3],duracao)
    filmes.appendChild(filme)

    titulo.addEventListener('click', ()=>{   window.location.href='./telaFilme.html?id='+info.id
})
}
function criarFilmes(){
    listaFilmes.forEach(filme => {
        criarFilme(filme)
    });    
}
function excluirListaFilmes(){
    while (filmes.firstChild) {
        filmes.removeChild(filmes.firstChild);
    }
}


document.getElementById('logo').addEventListener('click',()=>{window.location.href='../home/index.html'}
)