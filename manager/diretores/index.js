
import { getDiretoresSort, validarData, getUsuario, deleteDiretor} from "../../funcoes.js";
const idUsuario = localStorage.getItem('idusuario');
let admin = 0
if(idUsuario){admin = (await getUsuario(idUsuario)).admin}
if(!idUsuario || admin==0){window.location.href='../../login/index.html'}

let ordem = -1;
let listaDiretores

function alterarOrdem(){
    let sort
    if(ordem>4){ordem = 0}
    if(ordem==0){sort = 'id'}
    if(ordem==1){sort = 'nome'}
    if(ordem==2){sort = 'nome desc'}
    if(ordem==3){sort = 'nascimento desc'}
    if(ordem==4){sort = 'nascimento'}
    return sort
}
const containers = document.getElementById('diretores')


iniciarTela()
async function iniciarTela(){
    ordem++
    listaDiretores = (await getDiretoresSort(alterarOrdem()))
    excluirListaContainers()
    criarContainers()
    if(ordem==0){document.getElementById('sortField').textContent="ID"}
    if(ordem==1){document.getElementById('sortField').textContent="A-Z"}
    if(ordem==2){document.getElementById('sortField').textContent="Z-A"}
    if(ordem==3){document.getElementById('sortField').textContent="Mais novo"}
    if(ordem==4){document.getElementById('sortField').textContent="Mais velho"}
}



document.getElementById('botaoAdicionar').addEventListener('click',()=>{
    window.location.href='./telaModificar.html'
})

document.getElementById('botaoDeletar').addEventListener('click',()=>{
        const divs = document.querySelectorAll('.diretor');
        const lista = []; 
    
    divs.forEach(function(div) {
        const checkbox = div.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            const id = div.querySelector('.id').textContent;
            lista.push(id);
        }
    });


    if(lista.length>0){
        lista.forEach(aSerDeletado => {
            deleteDiretor(aSerDeletado)
        });
        window.location.reload()
    }
})

document.getElementById('botaoSort').addEventListener('click',async()=>{
    iniciarTela()
    alterarOrdem()
})
document.getElementById('botaoSort').addEventListener('mouseenter',()=>{
    document.getElementById('sortField').classList.remove('opacity-0')
    document.getElementById('sortField').classList.remove('invisible')
})
document.getElementById('botaoSort').addEventListener('mouseleave',()=>{
    document.getElementById('sortField').classList.add('opacity-0')
    document.getElementById('sortField').classList.add('invisible')
})

function criarContainer(info){
    console.log(info);
    const diretor = document.createElement('div')
    diretor.classList.add('diretor', 'flex', 'bg-neutral-100', 'ml-8', 'rounded-lg', 'w-5/6', 'h-20'); 
    
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
    
    const nome = document.createElement('p')
    nome.classList.add('overflow-hidden', 'tamanhoTitulo', 'flex', 'items-center', 'ml-5', 'text-blue-700', 'hover:underline', 'cursor-pointer', 'text-black', 'text-4xl');
    nome.textContent=info.nome
    
    barraCinza[2] = document.createElement('div')
    
    const nascimento = document.createElement('p')
    nascimento.textContent=validarData(info.nascimento)
    nascimento.classList.add('w-56', 'text-black', 'flex', 'justify-center', 'items-center', 'text-4xl');
    
    barraCinza[3] = document.createElement('div')

    const sexo = document.createElement('p')

    sexo.textContent= info.sexo.sigla
    sexo.classList.add('text-black', 'ml-10', 'flex', 'items-center', 'text-4xl');


barraCinza.forEach(barra => {
    barra.classList.add('bg-neutral-400')
    barra.classList.add('w-2')
});
    nullSpace.replaceChildren(checkbox)
    diretor.replaceChildren(nullSpace,barraCinza[0],id,barraCinza[1],nome,barraCinza[2],nascimento,barraCinza[3],sexo)
    containers.appendChild(diretor)

    nome.addEventListener('click', ()=>{   window.location.href='./telaModificar.html?idDiretor='+info.id
})
}
function criarContainers(){
    if(listaDiretores){
        listaDiretores.forEach(diretor => {
            criarContainer(diretor)
        });    
    }
}
function excluirListaContainers(){
    while (containers.firstChild) {
        containers.removeChild(containers.firstChild);
    }
}


document.getElementById('logo').addEventListener('click',()=>{window.location.href='../../home/index.html'})