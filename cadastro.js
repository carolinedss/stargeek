const formulario = document.getElementById("formulario");
const msg = document.querySelector(".mensagem")
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const insenha2 = document.getElementById("insenha2");

function verificarEmail(email, evento){
    let dados = JSON.parse(localStorage.getItem("bd"));
    if (dados == null){
        criarUsuario(evento);
    } else {
        dados.forEach(elemento =>{
            if (elemento.emailcliente == email){
                msg.innerHTML="E-mail já existe";
                evento.preventDefault();
            } else {
                criarUsuario(evento);
            }
        }
        );
    }  
}

formulario.onsubmit = (evento) =>{
    if (nome.value == ""){
        evento.preventDefault();
        msg.innerHTML = "Digite seu Nome";
        nome.focus();
        return null;
    }

    if (email.value == ""){
        evento.preventDefault();
        msg.innerHTML = "Digite seu e-mail";
        email.focus();
        return null;
    }

    if (senha.value == ""){
        evento.preventDefault();
        msg.innerHTML = "Digite sua Senha"
        senha.focus();
        return null;
    }

    if (insenha2.value == ""){
        evento.preventDefault();
        msg.innerHTML = "Digite sua senha novamente"
        insenha2.focus();
        return null;
    } 

    if(senha.value != insenha2.value){
        evento.preventDefault();
        msg.innerHTML = "Senha incorreta, insira novamente!"
        insenha2.focus();
        return null;
    }

    verificarEmail(email.value, evento);
}

function criarUsuario(evento){
    let dados = JSON.parse(localStorage.getItem("bd")) || [];
    dados.push(
        {
        nomecliente : nome.value,
        emailcliente : email.value,
        senhacliente : senha.value,
        insenha2cliente : insenha2.value
        }
    )
    localStorage.setItem("bd", JSON.stringify(dados));
    msg.innerHTML ="Usuário cadastrado com sucesso";
    evento.preventDefault();
    setInterval(()=>{
        window.location.assign("login.html");
    },2000)
    
}
