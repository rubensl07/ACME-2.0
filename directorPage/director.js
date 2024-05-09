import { getDiretor, getFilmesDiretor, validarData } from "../funcoes.js";


const idDiretor = new URLSearchParams(window.location.search).get('idDiretor');
if(!idDiretor){window.location.href='../home/index.html'}


const infoDiretor = await getDiretor(idDiretor)
const filmesDiretor = await getFilmesDiretor(idDiretor)


let nacionalidadeString = ''
let nacionalidadesAtor = infoDiretor.nacionalidade
nacionalidadesAtor.forEach(nacionalidade => {
    nacionalidadeString += nacionalidade.pais + ", "
});
document.getElementById('fotoDiretor').src = infoDiretor.foto
document.getElementById('nome').textContent = infoDiretor.nome
document.getElementById('nacionalidade').textContent = nacionalidadeString.slice(0,nacionalidadeString.length-2)
document.getElementById('sexo').textContent = infoDiretor.sexo.nome

document.getElementById('nascimento').textContent = validarData(infoDiretor.nascimento)
if(infoDiretor.falecimento){
    document.getElementById('nascimento').textContent += ' - '+validarData(infoDiretor.falecimento)
}
if(filmesDiretor){
    const filmesDirigidosField = document.getElementById('filmesDirigidosField')
    const FilmesDirigidosTEXT = document.createElement('h2')
    FilmesDirigidosTEXT.textContent="Filmes dirigidos"
    FilmesDirigidosTEXT.classList.add('text-6xl','m-6','text-white')

    const containerFilmes = document.createElement('div')
    containerFilmes.classList.add('flex','px-12', 'gap-10')
    

    filmesDiretor.forEach(filme => {
        const posterFilme = document.createElement('img')
        posterFilme.classList.add('rounded-2xl','h-72','cursor-pointer')
        posterFilme.src = filme.foto_capa
        posterFilme.addEventListener('click',()=>{
            window.location.href='../moviepage/index.html?idFilme='+filme.id
        })

        containerFilmes.appendChild(posterFilme)

    });

    filmesDirigidosField.appendChild(FilmesDirigidosTEXT)
    filmesDirigidosField.appendChild(containerFilmes)

}

document.getElementById('logo').addEventListener('click',()=>{window.location.href='../home/index.html'})
