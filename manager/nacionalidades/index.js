
import { getNacionalidades, validarData, getUsuario, deleteNacionalidade,} from "../../funcoes.js";
const idUsuario = localStorage.getItem('idusuario');
let admin = 0
if(idUsuario){admin = (await getUsuario(idUsuario)).admin}
if(!idUsuario || admin==0){window.location.href='../../login/index.html'}


let listaNacionalidades = await getNacionalidades()
const containers = document.getElementById('nacionalidades')
if(listaNacionalidades){
    listaNacionalidades.forEach(nacionalidade => {
        criarContainer(nacionalidade)
    });    
}



document.getElementById('botaoAdicionar').addEventListener('click',()=>{
    window.location.href='./telaModificar.html'
})

document.getElementById('botaoDeletar').addEventListener('click',()=>{
        const divs = document.querySelectorAll('.nacionalidade');
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
            deleteNacionalidade(aSerDeletado)
        });
        window.location.reload()
    }
})


function criarContainer(info){
    console.log(info);
    const nacionalidade = document.createElement('div')
    nacionalidade.classList.add('nacionalidade', 'flex', 'bg-neutral-100', 'ml-8', 'rounded-lg', 'w-5/6', 'h-20'); 
    
    const nullSpace = document.createElement('div')
    nullSpace.classList.add('flex','w-20','items-center')
    
    const checkbox = document.createElement('input')
    checkbox.classList.add('w-full', 'h-1/2')
    checkbox.setAttribute("type", "checkbox")
    
    const barraCinza = [2]
    
    barraCinza[0] = document.createElement('div')
    
    const id = document.createElement('p')
    id.textContent=info.id
    id.classList.add('id', 'text-black', 'w-24', 'flex', 'justify-center', 'items-center', 'text-5xl');
    
    barraCinza[1] = document.createElement('div')
    
    const pais = document.createElement('p')
    pais.classList.add('ml-5', 'tamanhoTitulo', 'flex', 'items-center', 'text-blue-700', 'hover:underline', 'cursor-pointer', 'text-black', 'text-5xl');
    pais.textContent=info.pais
    
barraCinza.forEach(barra => {
    barra.classList.add('bg-neutral-400')
    barra.classList.add('w-2')
});
    nullSpace.replaceChildren(checkbox)
    nacionalidade.replaceChildren(nullSpace,barraCinza[0],id,barraCinza[1],pais)
    containers.appendChild(nacionalidade)

    pais.addEventListener('click', ()=>{   window.location.href='./telaModificar.html?idPais='+info.id
})
}

document.getElementById('logo').addEventListener('click',()=>{window.location.href='../../home/index.html'})