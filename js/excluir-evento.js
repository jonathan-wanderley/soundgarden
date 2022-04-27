//Pega o id passado por parametro
const url = new URL(window.location.href);
id = url.searchParams.get("id");
//Seleciona os inputs e guarda em uma variavel
const nome = document.querySelector('#nome');
const banner = document.querySelector('#banner');
const atracoes = document.querySelector('#atracoes');
const descricao = document.querySelector('#descricao');
const data = document.querySelector('#data');
const lotacao = document.querySelector('#lotacao');

//Faz a requisicao GET pra pegar os eventos
fetch("https://xp41-soundgarden-api.herokuapp.com/events")
    .then(data => data.json()) //Pega o resultado e transforma em json
    .then(eventos => { //Agora temos a nossa lista de eventos em json que chamei de 'eventos'
        
        const eventoFiltrado = eventos.filter((evento) => {
            return evento._id == id;
        })
        if(eventoFiltrado.length == 0) {
            alert("Id de evento invalido!");
            window.location.href = "admin.html";
        }
        
        eventoFiltrado.forEach(evento => { //Roda o forEach percorrendo evento por evento dentro da lista
            if(evento._id == id) { //Verifica se o id do evento atual percorrido é igual ao id que queremos excluir

                //Substitui os inputs/campos com o valor do evento achado por id(que foi recebido por parametro)
                nome.value = evento.name;
                banner.value = evento.poster;
                //Attractions é um array, usamos o join pra pegar cada item do array
                //e separar usando o parametro passado, nesse caso separamos os itens por ", "
                atracoes.value = evento.attractions.join(', ');
                descricao.value = evento.description;
                //Pegamos a string da data que veio no json e removemos o Z do final para conseguir colocar no input
                //Para isso usamos o substring e cortamos a posicao 0 até a ultima -1 como está abaixo
                data.value = evento.scheduled.substring(0, evento.scheduled.length-1);
                lotacao.value = evento.number_tickets;
                
            }
        });
    })
    .catch(error => console.error(error)); //Se houver algum erro, printa esse erro no console

//Seleciona o botao de excluir e adiciona um evento de clique no botão
//Para que quando for clicado envie uma requisicao DELETE para excluir o evento
const button = document.querySelector('button');

button.addEventListener('click', (e) => {
    e.preventDefault(); //Previne o comportamento padrao

    if(!id) {
        alert("Id invalido, tente novamente!");
        window.location.href = "admin.html";
    }

    //Detalhes da requisicao
    const requisicao = {
        method: 'DELETE'
    }
    //Faz a uma requisicao DELETE para deletar os tickets
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, requisicao)
        .then( response => {
            //Emite um erro se retornar algum statuscode diferen do 204(status q informa q o evento foi excluido com sucesso)
            //Ao emitir o erro, ele interrompe o .then e cai no .catch
            if(response.status != 204){
                throw new Error();
            }
            alert("Excluido com sucesso!"); //Mostra um alerta de sucesso
            window.location.href = "admin.html"; //Redireciona para a pagina admin.html
        })
        .catch(error => {
            //Mostra um alerta informando erro e printa no console o erro
            console.log(error);
            alert("Algo saiu errado, tente novamente!");
        })
});