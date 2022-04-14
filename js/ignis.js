let times = [];
let jogos = [];

function alterarCor() {
    let cor = document.getElementById("body").style.backgroundColor;

    console.log(cor);
    if (cor === "white") {
        document.getElementById("body").style.backgroundColor = "black";
        document.getElementById("body").style.color = "white";

    } else {
        document.getElementById("body").style.backgroundColor = "white";
        document.getElementById("body").style.color = "black";
    }
}


function cadastrarTimes() {
    times = [];

    let dados = document.getElementById("txtaCadastro").value.split('\n');

    if ((dados[0] !== '' && dados.length > 1) && dados.length % 1 !== 1) {

        for (aux = 0; aux < dados.length; aux++) {
            if (dados[aux].split(";").length === 2) {
                times.push({ "time": dados[aux].substr(0, dados[aux].indexOf(";")), "estado": dados[aux].substr(dados[aux].indexOf(";") + 1, dados[aux].length), "vitorias": 0, "empates": 0, "derotas": 0, "pontos": 0 });

            } else {
                alert("Siga o padrão informado no placeholder: time;estado");
                break;
            }
        };

        cadastrarJogos();
    } else {
        alert("Preencha o campo com uma quantidade par de times.");

    }

}


function cadastrarJogos() {

    for (aux = 0; aux < times.length; aux++) {
        if (aux % 2 === 0) {
            jogos.push({ "time1": times[aux].time, "estado1": times[aux].estado, "ganhou1": false, "time2": times[aux + 1].time, "estado2": times[aux + 1].estado, "ganhou2": false })
        }

    }
    for (aux = 1; aux <= 2; aux++) {


        jogos.map(jogo => {
            if (aux === 1) {

                document.getElementById("lista-jogos").innerHTML += "<li class='list-group-item bg-warning d-flex'> <p class='fw-bold'>" + jogo.time1 + " x " + jogo.time2 + " - " + jogo.estado1 + " | " + "Rodada " + aux + (jogo.estado1.toLowerCase() === jogo.estado2.toLowerCase() ? " - Rodada de Ida " + " (Rodada Dupla) </p></li>" :  " </p></li>");

                
                if (jogo === jogos[jogos.length - 1]) {
                    jogos.map(jogo => {
                        if (aux === 1) {
                            if (jogo.estado1.toLowerCase() === jogo.estado2.toLowerCase()) {
                                document.getElementById("lista-jogos").innerHTML += "<li class='list-group-item bg-warning d-flex'> <p class='fw-bold'>" + jogo.time2 + " x " + jogo.time1 + " - " + jogo.estado1 + " | " + "Rodada " + aux + " - Rodada de Volta (Rodada Dupla)</p></li>";
                            }
                        }
                    })
                }
            }
        })
    }
}

function iniciarTorneio() {
    //parseInt(Math.random() * (10 - 0) + 0);      
}