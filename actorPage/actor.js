import { getAtor, getFilmesAtor, validarData } from "../funcoes.js";


const idAtor = new URLSearchParams(window.location.search).get('idAtor');
if(!idAtor){window.location.href='../home/index.html'}

const infoAtor = await getAtor(idAtor)
const filmesAtor = await getFilmesAtor(idAtor)
console.log(infoAtor)
console.log(filmesAtor)


let nacionalidadeString = ''
let nacionalidadesAtor = infoAtor.nacionalidade
nacionalidadesAtor.forEach(nacionalidade => {
    nacionalidadeString += nacionalidade.pais + ", "
});
document.getElementById('fotoAtor').src = infoAtor.foto
document.getElementById('nome').textContent = infoAtor.nome
document.getElementById('nacionalidade').textContent = nacionalidadeString.slice(0,nacionalidadeString.length-2)
document.getElementById('sexo').textContent = infoAtor.sexo.nome

document.getElementById('nascimento').textContent = validarData(infoAtor.nascimento)
if(infoAtor.falecimento){
    document.getElementById('nascimento').textContent += ' - '+validarData(infoAtor.falecimento)
}

if(filmesAtor){
    const filmesAtuadosField = document.getElementById('filmesAtuadosField')
    const FilmesAtuadosTEXT = document.createElement('h2')
    FilmesAtuadosTEXT.textContent="Filmes nos quais atuou"
    FilmesAtuadosTEXT.classList.add('text-6xl','m-6','text-white')

    const containerFilmes = document.createElement('div')
    containerFilmes.classList.add('flex','px-12', 'gap-10')
    

    filmesAtor.forEach(filme => {
        const posterFilme = document.createElement('img')
        posterFilme.classList.add('rounded-2xl','h-72','cursor-pointer')
        posterFilme.src = filme.foto_capa
        posterFilme.addEventListener('click',()=>{
            window.location.href='../moviepage/index.html?idFilme='+filme.id
        })

        containerFilmes.appendChild(posterFilme)

    });

    filmesAtuadosField.appendChild(FilmesAtuadosTEXT)
    filmesAtuadosField.appendChild(containerFilmes)

}

document.getElementById('logo').addEventListener('click',()=>{window.location.href='../home/index.html'})
