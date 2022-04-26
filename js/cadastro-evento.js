//Seleciona os inputs e guarda cada um em uma variavel
const nome = document.querySelector('#nome');
const atracoes = document.querySelector('#atracoes');
const descricao = document.querySelector('#descricao');
const data = document.querySelector('#data');
const lotacao = document.querySelector('#lotacao');

//Seleciona o botao cadastrar e adiciona um evento de click a ele
//Para que quando clickado pegue os dados digitados nos inputs/campos
//E faca uma requisicao POST enviando esses dados
const button = document.querySelector('button');

button.addEventListener('click', (e) => {
    e.preventDefault(); //Previne o comportamento padrao

    //Body da requisicao
    const body = {
        name: nome.value,
        poster: "https://i.imgur.com/fQHuZuv.png",
        attractions: atracoes.value.split(','),
        description: descricao.value,
        scheduled:  data.value,
        number_tickets: lotacao.value
    }

    //Detalhes da requisicao
    const requisicao = {
        method: 'POST',
        body: JSON.stringify(body), //Aqui passamos o body e convertemos em string
        headers: {
            "Content-type": "application/json"
        }
    }
    //Faz a uma requisicao POST para criar o evento
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events`, requisicao)
        .then(response => response.json())
        .then(result => {
            //Emite um erro se retornar algum statuscode/messagem de erro
            //Ao emitir o erro, ele interrompe o .then e cai no .catch
            if(result.error) {
                throw new Error(result.details.body[0].message);
            }
            
            alert('Evento cadastrado com sucesso!'); //Mostra um alerta de sucesso
            window.location.href = "admin.html"; //Redireciona para a pagina admin.html
        })
        .catch(error => {
            //Mostra um alerta informando erro e printa no console o erro
            alert('Algo saiu errado, tente novamente!');
            console.log(error);
        })
});