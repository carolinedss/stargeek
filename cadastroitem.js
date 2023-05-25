const nome = document.getElementById("nome");
const resumo = document.getElementById("resumo");
const botaocadastrar = document.getElementById("btncadastrar");

botaocadastrar.onclick = (evento) => {
    evento.preventDefault();
    fenvio()
    .then(result =>{
        if(result){let dados = JSON.parse(localStorage.getItem("catalogo")) || [];
        dados.push(
            {
                nome: nome.value,
                descricao : resumo.value,
                foto : nomeArq 
            }
        )
        localStorage.setItem("catalogo",JSON.stringify(dados));
        window.location.assign("catalogo.html");
    }
        else {
            alert("Houve erro no envio do arquivo");
        }
    });
}


var nomeArq;
async function fenvio() {
    const url = 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    console.log(JSON.stringify(formData));
    try{
        var resp = await fetch(url, {
                method:'POST',
                body: formData,

        })

        if(resp.ok){
         let respText = await resp.text();
         nomeArq = respText;
         return true;
        }
        else{
            return false;
        }
    }
    catch (error){
        console.error(error);
        return false; 
        
    }
}