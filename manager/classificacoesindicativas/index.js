
import { getClassificacoesIndicativas, validarData, getUsuario, deleteClassificacaoIndicativa} from "../../funcoes.js";
const idUsuario = localStorage.getItem('idusuario');
let admin = 0
if(idUsuario){admin = (await getUsuario(idUsuario)).admin}
if(!idUsuario || admin==0){window.location.href='../../login/index.html'}


let listaClassificacoesIndicativas = await getClassificacoesIndicativas()
const containers = document.getElementById('classificacoesIndicativas')
if(listaClassificacoesIndicativas){
    listaClassificacoesIndicativas.forEach(classificacaoIndicativa => {
        criarContainer(classificacaoIndicativa)
    });    
}



document.getElementById('botaoAdicionar').addEventListener('click',()=>{
    window.location.href='./telaModificar.html'
})

document.getElementById('botaoDeletar').addEventListener('click',()=>{
        const divs = document.querySelectorAll('.classificacaoInd');
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
            deleteClassificacaoIndicativa(aSerDeletado)
        });
        window.location.reload()
    }
})


function criarContainer(info){
    console.log(info);
    const classificacaoIndicativa = document.createElement('div')
    classificacaoIndicativa.classList.add('classificacaoInd', 'flex', 'bg-neutral-100', 'ml-8', 'rounded-lg', 'w-5/6', 'h-20'); 
    
    const nullSpace = document.createElement('div')
    nullSpace.classList.add('flex','w-20','items-center')
    
    const checkbox = document.createElement('input')
    checkbox.classList.add('w-full', 'h-1/2')
    checkbox.setAttribute("type", "checkbox")
    
    const barraCinza = [2]
    
    barraCinza[0] = document.createElement('div')
    
    const id = document.createElement('p')
    id.textContent=info.id
    id.classList.add('id', 'text-black', 'w-16', 'flex', 'justify-center', 'items-center', 'text-5xl');
    
    barraCinza[1] = document.createElement('div')
    
    const idade = document.createElement('p')
    idade.classList.add('w-20', 'flex', 'items-center', 'text-blue-700', 'hover:underline', 'cursor-pointer', 'text-5xl', 'justify-center');
    idade.textContent=info.idade

barraCinza.forEach(barra => {
    barra.classList.add('bg-neutral-400')
    barra.classList.add('w-2')
});
    nullSpace.replaceChildren(checkbox)
    classificacaoIndicativa.replaceChildren(nullSpace,barraCinza[0],id,barraCinza[1],idade)
    containers.appendChild(classificacaoIndicativa)

    idade.addEventListener('click', ()=>{   window.location.href='./telaModificar.html?idClassificacaoIndicativa='+info.id
})
}

document.getElementById('logo').addEventListener('click',()=>{window.location.href='../../home/index.html'})