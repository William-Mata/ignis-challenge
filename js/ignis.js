let times = [];
let jogos = [];
let auxJogos = []
let rodadas = [];

// altera a cor do fundo da pagina preto/branco
function alterarCor() {
    let cor = document.getElementById("body").style.backgroundColor;

    if (cor === "white") {
        document.getElementById("body").style.backgroundColor = "black";
        document.getElementById("body").style.color = "white";

    } else {
        document.getElementById("body").style.backgroundColor = "white";
        document.getElementById("body").style.color = "black";
    }
}

// cadastra os times e os válida
function cadastrarTimes() {
    times = [];
    jogos = [];
    auxJogos = [];
    rodadas = [];
    var dados = document.getElementById("txtaCadastro").value.split('\n');
    document.getElementById("tbd-jogos").innerHTML = '';
    document.getElementById("podio").style.display = "none";

    // Em dados.length <= 10 e possivel alterar o limite de time cadastrado, limitei a 10, pois no meu pc funcionou sem travamento, consegui ir até 20, mais ouve bastante travamento.
    if ((dados[0] !== '' && dados.length > 1) && dados.length % 1 !== 1 && dados.length <= 10) {
        for (aux = 0; aux < dados.length; aux++) {
            if (dados[aux].split(";").length === 2) {
                times.push({ "time": dados[aux].substr(0, dados[aux].indexOf(";")), "estado": dados[aux].substr(dados[aux].indexOf(";") + 1, dados[aux].length), "vitorias": 0, "empates": 0, "derotas": 0, "pontos": 0 });

            } else if (times) {
                alert("Siga as orientações para cadastro dos times.");
                break;
            }
        };
        alert("Os times foram cadastrados com sucesso!\nVá até a seção de jogos.")
        cadastrarJogos();
    } else {
        alert("Siga as orientações para cadastro dos times.");
    }
}

// cadastra os jogos de forma que não se repita
function cadastrarJogos() {
    times = sortear(times);
    times.map(time1 => {
        times.map(time2 => {
            if (time1 !== time2 && times.indexOf(time1) > times.indexOf(time2)) {
                teams = sortear([time1, time2]);
                auxJogos.push({ "time1": teams[0], "golsIda1": 0, "golsVolta1": 0, "time2": teams[1], "golsIda2": 0, "golsVolta2": 0, "rodadaDupla1": false, "rodadaDupla2": false })
            }
        })
    })

    validarJogo();
    printarJogos();
}

// Realiza a validação dos jogos, verifica se um mesmo time está jogando mais de uma vez na mesma rodada
function validarJogo() {
    while (auxJogos.length !== 0) {
        auxJogos = auxJogos.concat(rodadas);
        auxJogos = sortear(auxJogos);
        rodadas = [];

        var aux = 0;
        while (aux <= times.length) {
            aux++;
            auxJogos.map(jogo => {
                if (rodadas.length === 0) {
                    rodadas.push(jogo);
                    auxJogos.splice(auxJogos.indexOf(jogo), 1);

                } else if ((rodadas.length + auxJogos.length) === (times.length / 2)) {
                    rodadas = rodadas.concat(auxJogos);
                    auxJogos = [];
                } else if (rodadas.length < (times.length / 2)) {
                    var cont = 0;
                    rodadas.map(partida => {
                        if (!((jogo.time1.time === partida.time1.time || jogo.time1.time === partida.time2.time)
                            || (jogo.time2.time === partida.time1.time || jogo.time2.time === partida.time2.time))) {
                            cont++;
                        }

                        if (cont === rodadas.length) {
                            rodadas.push(jogo);
                            auxJogos.splice(auxJogos.indexOf(jogo), 1);
                        }
                    })
                }
            })
            if (rodadas.length === (times.length / 2)) {
                validarRodada();
            }
        }
    }
    printarJogos();
}

// Verifica se não ha jogos repetidos na mesma rodada e se a rodada é dupla
function validarRodada() {
    rodadas.map(jogo1 => {
        rodadas.map(jogo2 => {
            if (jogo1 !== jogo2) {
                if (jogo1.time1.estado === jogo2.time1.estado) {
                    jogo1.rodadaDupla1 = true;
                }
                if (jogo1.time2.estado === jogo2.time2.estado) {
                    jogo1.rodadaDupla2 = true;
                }
            }
        })
    })
    jogos = jogos.concat(rodadas);
    rodadas = [];
}

// Embaralha o array 
function sortear(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = parseInt(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

// Imprimir os jogos cadastrado na pagina jogos
function printarJogos() {
    var aux = 1;
    var aux2 = 0;
    document.getElementById("lista-jogos").innerHTML = '';
    document.getElementById("btnIniciar").style.display = "block";

    jogos.map(jogo => {
        if (aux2 === times.length / 2) {
            aux2 = 0
            aux++;
        }
        aux2++;

        document.getElementById("lista-jogos").innerHTML += " <li class='list-group-item d-flex justify-content-between align-items-start text-white bg-warning'> <div class='ms-2 me-auto'> <div class='fw-bold cor-secundaria'>" + "<img src='/img/" + jogo.time1.time.toLowerCase() + ".png' class='logo'/> " + jogo.time1.time + " x " + "<img src='/img/" + jogo.time2.time.toLowerCase() + ".png'  class='logo'/> " + jogo.time2.time + " - " + jogo.time1.estado + " </div> Jogo Ida - Rodada " + aux + (jogo.rodadaDupla1 ? " (Rodada Dupla) " : "") + " </div> <span class='badge cor-primaria rounded-pill'>" + jogo.golsIda1 + " X " + jogo.golsIda2 + "</span></li>";

    })

    jogos.map(jogo => {
        if (aux2 === times.length / 2) {
            aux2 = 0
            aux++;
        }
        aux2++;

        document.getElementById("lista-jogos").innerHTML += " <li class='list-group-item d-flex justify-content-between align-items-start text-white bg-warning'> <div class='ms-2 me-auto'> <div class='fw-bold cor-secundaria'>" + "<img src='/img/" + jogo.time2.time.toLowerCase() + ".png'  class='logo'/>" + jogo.time2.time + " x " + "<img src='/img/" + jogo.time1.time.toLowerCase() + ".png'  class='logo'/> " + jogo.time1.time + " - " + jogo.time2.estado + " </div> Jogo Volta - Rodada " + aux + (jogo.rodadaDupla2 ? " (Rodada Dupla) " : "") + " </div> <span class='badge cor-primaria rounded-pill'>" + jogo.golsVolta1 + " X " + jogo.golsVolta2 + "</span></li>";

    })
}

// Inicia o torneio, realiza a simulação dos jogos pontuando as equipes e imprime a tabela com os dados e o campeão.
function iniciarTorneio() {
    var cont = 0;
    document.getElementById("tbd-jogos").innerHTML = '';
    document.getElementById("podio").style.display = "block";

    times.map(time => {
        time.vitorias = 0;
        time.derotas = 0;
        time.empates = 0;
        time.pontos = 0;
    })

    iniciarJogos();
    printarJogos();
    ordernarTimes();

    times.map(time => {
        cont++;
        document.getElementById("tbd-jogos").innerHTML += " <tr> <td>" + cont + "°</td> <td>" + "<img src='/img/" + time.time.toLowerCase() + ".png'  class='logo'/>" + time.time + "</td> <td>" + time.estado + "</td><td> " + time.vitorias + "</td> <td> " + time.empates + "</td> <td>" + time.derotas + "</td> <td>" + time.pontos + "</td> </tr>"
    })


    for (j = 0; j <= 2; j++) {
        if (j === 0) {
            document.getElementById("time1").src = '/img/' + times[j].time.toLowerCase() + '.png';
        } else if (j === 1) {
            document.getElementById("time2").src = "/img/" + times[j].time.toLowerCase() + ".png";
        } else if (j === 2) {
            document.getElementById("time3").src = "/img/" + times[j].time.toLowerCase() + ".png";
        }
    }
}

// ordena 
function ordernarTimes() {
    var copiaTimes = [];
    var team;

    while (times.length !== 0) {
        times.map(time => {
            team = time;
            times.map(time2 => {
                if ((time !== time2) && (team.pontos < time2.pontos)) {
                    team = time2;
                }
            })
            times.splice(times.indexOf(team), 1);
            copiaTimes.push(team);
        })
    }
    times = copiaTimes;
}

function iniciarJogos() {

    jogos.map(jogo => {

        jogo.golsIda1 = parseInt(Math.random() * (10 - 0) + 0);
        jogo.golsIda2 = parseInt(Math.random() * (10 - 0) + 0);
        jogo.golsVolta1 = parseInt(Math.random() * (10 - 0) + 0);
        jogo.golsVolta2 = parseInt(Math.random() * (10 - 0) + 0);

        if (jogo.golsIda1 > jogo.golsIda2) {
            times.map(time => {
                if (time.time === jogo.time1.time) {
                    time.vitorias += 1;
                    time.pontos += 3;
                } else if (time.time == jogo.time2.time) {
                    time.derotas += 1
                }
            })
        } else if (jogo.golsIda2 > jogo.golsIda1) {
            times.map(time => {
                if (time.time === jogo.time2.time) {
                    time.vitorias += 1;
                    time.pontos += 3;
                } else if (time.time == jogo.time1.time) {
                    time.derotas += 1
                }
            })
        } else if (jogo.golsIda1 === jogo.golsIda2) {
            times.map(time => {

                if (time.time === jogo.time1.time) {
                    time.empates += 1;
                    time.pontos += 1;

                } else if (time.time == jogo.time2.time) {
                    time.empates += 1
                    time.pontos += 1;
                }
            })
        }

        if (jogo.golsVolta1 > jogo.golsVolta2) {
            times.map(time => {
                if (time.time === jogo.time1.time) {
                    time.vitorias += 1;
                    time.pontos += 3;
                } else if (time.time == jogo.time2.time) {
                    time.derotas += 1
                }
            })
        } else if (jogo.golsVolta2 > jogo.golsVolta1) {
            times.map(time => {
                if (time.time === jogo.time2.time) {
                    time.vitorias += 1;
                    time.pontos += 3;
                } else if (time.time == jogo.time1.time) {
                    time.derotas += 1
                }
            })
        } else if (jogo.golsVolta1 === jogo.golsVolta2) {
            times.map(time => {

                if (time.time === jogo.time1.time) {
                    time.empates += 1;
                    time.pontos += 1;

                } else if (time.time == jogo.time2.time) {
                    time.empates += 1
                    time.pontos += 1;
                }
            })
        }

    })
}