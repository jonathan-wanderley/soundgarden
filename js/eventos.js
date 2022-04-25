try {
    
    fetch('https://xp41-soundgarden-api.herokuapp.com/events')
    .then(data => data.json())
    .then(eventos => {
        eventos.forEach(evento => {
            const eventoModel = document.querySelector('.models article').cloneNode(true);
            //Formata a data pro padrao local dd/mm/yyyy
            const data = new Date(evento.scheduled);
            const dataFormatada = data.toLocaleDateString();

            //Titulo e Data
            eventoModel.querySelector('h2').innerHTML = `${evento.name} - ${dataFormatada}`;
            //Atracoes
            eventoModel.querySelector('H4').innerHTML = evento.attractions.join(', ');
            //Descricao
            eventoModel.querySelector('p').innerText = evento.description;

            eventoModel.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();

                const modal = document.querySelector('.modal');

                modal.style.display = 'flex';
                document.querySelector('.modal-window p').innerHTML = `<b>Evento</b>: ${evento.name}<br><b>Data</b>: ${dataFormatada}`
                
                //Adicionando função do botão de fechar modal
                document.querySelector('.modal-window span').addEventListener('click', () => {
                    modal.style.display = 'none';
                })

                //Função do botão reservar do modal
                document.querySelector('.modal-window a').addEventListener('click', (e) => {
                    e.preventDefault();

                    let nome = document.querySelector(`.modal-window #nomeInput`);
                    let email = document.querySelector(`.modal-window #emailInput`);
                    let qntTickets = document.querySelector(`.modal-window label > input`);
                    //Body da requisicao
                    const body = {
                        owner_name: nome.value,
                        owner_email: email.value,
                        number_tickets: qntTickets.value,
                        event_id: evento._id
                    }
                    //Detalhes da requisicao
                    const requisicao = {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {"Content-type": "application/json"}
                    }
                    //Faz a uma requisicao POST para reservar o(s) ticket(s)
                    fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", requisicao)
                        .then(response => response.json())
                        .then(result => {
                            //Emite um erro se returnar algum statuscode de erro
                            //Envia o erro para o catch
                            if(result.error) {
                                throw new Error(result.details.body[0].message);
                            }

                            alert('Reservado com sucesso!');

                            //Fecha o modal
                            modal.style.display = 'none';
                        })
                        .catch(error => {
                            alert('Algo saiu errado, tente novamente :C');
                            console.error('error: ', error.message);
                        })
                        .finally(() => {
                            //Limpa os campos do modal apos a requisicao
                            nome.value = "";
                            email.value = "";
                            qntTickets.value = 1;
                        })
                })
            })

            document.getElementById('boxEventos').append(eventoModel);
        });
    })

} catch (error) {
    console.log(error);
}
