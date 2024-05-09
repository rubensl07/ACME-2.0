import {getUsuario, getUsuarios} from "../funcoes.js";

const idUsuario = localStorage.getItem('idusuario')

let usuarioExistente= await verificarUsuarioExistente(idUsuario);
if(idUsuario){
    if(usuarioExistente){
        loginButton.classList.add('hidden')
        document.getElementById('infoUserButton').classList.remove('hidden')
        const infoUsuario = await getUsuario(idUsuario)
        document.getElementById('fotoUsuario').src = '../img/icons/3-bar.png'
    } else {
        localStorage.removeItem('idusuario')
    }
} 

async function verificarUsuarioExistente(idUsuario){
    let boolean = false
    if(await getUsuarios()){
        (await getUsuarios()).forEach(usuario => {
            if(usuario.id == idUsuario){
                boolean = true
            }
        });
    }
    return boolean
  }