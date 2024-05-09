
import { getSexos, validarData, getUsuario, deleteSexo} from "../../funcoes.js";
const idUsuario = localStorage.getItem('idusuario');
let admin = 0
if(idUsuario){admin = (await getUsuario(idUsuario)).admin}
if(!idUsuario || admin==0){window.location.href='../../login/index.html'}


let listaSexos = await getSexos()
const containers = document.getElementById('sexos')
if(listaSexos){
    listaSexos.forEach(sexo => {
        criarContainer(sexo)
    });    
}



document.getElementById('botaoAdicionar').addEventListener('click',()=>{
    window.location.href='./telaModificar.html'
})

document.getElementById('botaoDeletar').addEventListener('click',()=>{
        const divs = document.querySelectorAll('.sexo');
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
            deleteSexo(aSerDeletado)
        });
        window.location.reload()
    }
})


function criarContainer(info){
    console.log(info);
    const sexo = document.createElement('div')
    sexo.classList.add('sexo', 'flex', 'bg-neutral-100', 'ml-8', 'rounded-lg', 'w-5/6', 'h-20'); 
    
    const nullSpace = document.createElement('div')
    nullSpace.classList.add('flex','w-20','items-center')
    
    const checkbox = document.createElement('input')
    checkbox.classList.add('w-full', 'h-1/2')
    checkbox.setAttribute("type", "checkbox")
    
    const barraCinza = [3]
    
    barraCinza[0] = document.createElement('div')
    
    const id = document.createElement('p')
    id.textContent=info.id
    id.classList.add('id', 'text-black', 'w-16', 'flex', 'justify-center', 'items-center', 'text-5xl');
    
    barraCinza[1] = document.createElement('div')
    
    const sigla = document.createElement('p')
    sigla.classList.add('w-40', 'flex', 'items-center','justify-center', 'text-black', 'text-5xl');
    sigla.textContent=info.sigla

    barraCinza[2] = document.createElement('div')
    
    const nome = document.createElement('p')
    nome.classList.add('ml-5', 'w-96', 'flex', 'items-center', 'text-blue-700', 'hover:underline', 'cursor-pointer','text-5xl');
    nome.textContent=info.nome
    
    
barraCinza.forEach(barra => {
    barra.classList.add('bg-neutral-400')
    barra.classList.add('w-2')
});
    nullSpace.replaceChildren(checkbox)
    sexo.replaceChildren(nullSpace,barraCinza[0],id,barraCinza[1],sigla,barraCinza[2],nome)
    containers.appendChild(sexo)

    nome.addEventListener('click', ()=>{   window.location.href='./telaModificar.html?idSexo='+info.id
})
}

document.getElementById('logo').addEventListener('click',()=>{window.location.href='../../home/index.html'})