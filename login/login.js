import {getUsuarios} from "../funcoes.js"

const email = document.getElementById('email')
const senha = document.getElementById('senha')
const buttonValidar = document.getElementById('button')
buttonValidar.addEventListener('click',validarLogin)

email.focus()


email.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        senha.focus()
    }
})
senha.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        buttonValidar.click()
    }
})

async function validarLogin(){
    let logado = false
    try{
        const usuarios = await getUsuarios();
        if (!usuarios || usuarios.length === 0) {
            throw new Error("Não foi possível carregar os usuários. Tente novamente mais tarde.");
        } else {
        usuarios.forEach((user) => {
            if(email.value === user.login && senha.value === user.senha){
                localStorage.setItem("idusuario", user.id)
                window.location.href = '../search/index.html'
                logado=true
            } 
        });
        if(!logado) {
            alert("Login inválido!")
        }
    }
    } catch(error){
        console.error(error);
        alert("Ocorreu um erro ao tentar validar o login. Por favor, tente novamente mais tarde.");
    }
}