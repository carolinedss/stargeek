const nome = document.getElementById("nome");
const resumo = document.getElementById("resumo");
const botaocadastrar = document.getElementById("btncadastrar");
const foto = document.getElementById("foto");

var url = new URL (window.location.href);
var peditar = url.searchParams.get("peditar");
var pindice = url.searchParams.get("indice");

if (peditar == "true"){
    editar(pindice)
}

botaocadastrar.onclick = (evento) => {
    if ((peditar != "true")||(peditar == null)){
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
else
{
    editarenvio(evento);
    window.location.assign("catalogo.html")
}
}

function editar(indice){
    nome.value = "";
    resumo.value = "";
    foto.files[0] = null;
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    nome.value = dados[indice].nome;
    resumo.value = dados[indice].descricao;
    fotoa = dados[indice].foto;

}

function editarenvio(evento){
    evento.preventDefault();
    if ((fotoa != foto.value)&&(foto.value != "")){
        fenvio()
        .then(result =>{
                        if(result){
                            salvarEdicao(nomeArq);
                        }
                    });
                   }
}

function salvarEdicao(pfoto){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados[pindice].nome = nome.value;
    dados[pindice].descricao = descricao.value;
    dados[pindice].foto = pfoto;
    localStorage.setItem("catalogo", JSON.stringify(dados));
    window.location.assign("catalogo.html");
  }

var fotoa;
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