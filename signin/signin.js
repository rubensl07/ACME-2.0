localStorage.clear('idusuario')
// if(localStorage.getItem('idusuario')){window.location.href='../home/home.html'}

import {getSexos, getUsuarios, postUsuario} from "../funcoes.js"
const listaUsuarios = await getUsuarios()
const listaSexos = await getSexos()

const buttonValidar = document.getElementById('button')
buttonValidar.addEventListener('click',signin)

const nomeCampo = document.getElementById('nome')
const emailCampo = document.getElementById('email')
const senhaCampo = document.getElementById('senha')
const nascimentoCampo = document.getElementById('nascimento')
const generoCampo = document.getElementById('genero')
const adminCampo= document.getElementById('adm')

listaSexos.forEach(sexo => {
    const option = document.createElement('option')
    option.value = sexo.id
    option.textContent = sexo.nome
    generoCampo.appendChild(option)
});

nomeCampo.focus()
nomeCampo.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        emailCampo.focus()
    }
})
emailCampo.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        senhaCampo.focus()
    }
})
senhaCampo.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        nascimentoCampo.focus()
    }
})
nascimentoCampo.addEventListener('keypress',(event)=>{
    if(event.key==="Enter"){
        buttonValidar.click()
    }
})

async function signin(){
const nome = nomeCampo.value
const email = emailCampo.value
const senha = senhaCampo.value
const nascimento = nascimentoCampo.value
const genero = generoCampo.value
const admin = adminCampo.checked

    try{
        if(nome==''||email==''||senha==''||nascimento==''){
            let mensagem = "Preencha os campos obrigatórios"
            if(nome==''){
                mensagem=mensagem+"\n- Nome"
            }
            if(email==''){
                mensagem=mensagem+"\n- E-mail"
            }
            if(senha==''){
                mensagem=mensagem+"\n- Senha"
            }
            if(nascimento==''){
                mensagem=mensagem+"\n- Nascimento"
            }
            alert(mensagem)
        } else 
        if(!validarEmailExistente(email)){
            alert("Já existe um usuário cadastrado com esse e-mail");
        } else
        if(!validarIdade(nascimento)){
            alert("Você não possui a idade mínima para cadastrar-se no site")
        } else 
        if(senha.length<8){
            alert("Senha muito curta")
        } else {
            const infos = {
                nome,
                nascimento,
                foto_usuario:"https://br.web.img3.acsta.net/c_310_420/pictures/18/06/29/00/35/0101925.jpg",
                login:email,
                senha,
                id_sexo: genero,
                admin
            }
            let valorPost = await postUsuario(infos)
            console.log(valorPost) 
            if(valorPost) {
                window.location.href="../login/index.html"
            } else {
                alert('Deu erro aí fi')
            }

        }
        
    } catch(error){
        console.log(error)
    }
}

function validarEmailExistente(emailDigitado){
    console.log("Email digitado: "+emailDigitado)

    let emailDisponivel = true
    listaUsuarios.forEach((user) => {
        console.log("Email usuário "+user.login)
        if(emailDigitado === user.login){
            emailDisponivel = false
        } 
    })
    return emailDisponivel
}

function validarIdade(dataNascimento){
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const mesNascimento = nascimento.getMonth();
    const diaNascimento = nascimento.getDate();
    if (mesAtual<mesNascimento||(mesAtual===mesNascimento&&diaAtual<diaNascimento)) {
        idade--;
    }
    console.log(idade);
    if(idade>=13){
        return true
    } else {
        return false
    }
}


