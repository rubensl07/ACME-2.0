'use strict'
import {getUsuario, editUsuario, deleteUsuario,verificarUsuarioExistente} from "../funcoes.js"

const idUsuario = localStorage.getItem('idusuario');
if(!idUsuario){window.location.href='../login/index.html'}

let usuarioExistente= await verificarUsuarioExistente(idUsuario);
if(!usuarioExistente){
    localStorage.removeItem('idusuario')
    window.location.reload()
}
const infoUsuario = (await getUsuario(idUsuario))

const imagem = document.getElementById('fotoUsuario')
const nomeCampo = document.getElementById('nome')
const nascimentoCampo = document.getElementById('nascimento')
const generosCampo = document.getElementById('generosSelect')
const mailCampo = document.getElementById('email')
const senhaCampo = document.getElementById('senha')
const editarFilmesButton = document.getElementById('editarFilmesButton')
const admCampo = document.getElementById('adm')
if(infoUsuario.admin==1){
    editarFilmesButton.classList.remove('invisible')
}

function preencherCampos(){
    // console.log(infoUsuario)
    imagem.src=infoUsuario.foto_usuario
    nomeCampo.value = infoUsuario.nome
    nascimentoCampo.value = infoUsuario.nascimento.substr(0,10)
    generosCampo.value = infoUsuario.id_sexo
    mailCampo.value = infoUsuario.login
    senhaCampo.value = infoUsuario.senha
    if(infoUsuario.admin==1){admCampo.checked = true}
}

document.getElementById('botaoEditarPerfil').addEventListener('click',()=>{
    document.getElementById('botaoEditarPerfil').textContent='Atualizar Perfil'
    const nome = nomeCampo.value
    const nascimento = nascimentoCampo.value
    const fotoUsuario = imagem.src
    const login = mailCampo.value
    const senha = senhaCampo.value
    const id_sexo = document.getElementById('generosSelect').options[document.getElementById('generosSelect').selectedIndex].value;
    const adm = admCampo.checked
    let admin
    if(adm){admin = 1} else {admin = 0}

    if(nome == ''||nascimento==''||login==''||senha==''){
        alert('Campos faltantes')
    } else 
    if(senha.length<8) { 
        alert('Senha muito curta')
    }
    else
    {
        const novasInfos = {
            nome,
            nascimento,
            foto_usuario: fotoUsuario,
            login,
            senha,
            id_sexo,
            admin
        }
        console.log(novasInfos)
        editUsuario(idUsuario, novasInfos)
            document.getElementById('botaoEditarPerfil').textContent='PERFIL ATUALIZADO!'
    
    }

})
document.getElementById('botaoLogout').addEventListener('click',()=>{
    localStorage.removeItem('idusuario')
    window.location.reload()
})
document.getElementById('botaoExcluirPerfil').addEventListener('click',()=>{
    if(window.confirm('Tem certeza que deseja excluir este perfil?')){
        deleteUsuario(infoUsuario.id)
        localStorage.removeItem('idusuario')
        window.location.reload()
    } 
})

preencherCampos()