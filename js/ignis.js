let times = [];
let jogos = [];
let auxJogos = []
let rodadas = [];

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


function cadastrarTimes() {
    times = [];
    jogos = [];
    auxJogos = [];
    rodadas = [];
    var dados = document.getElementById("txtaCadastro").value.split('\n');

    if ((dados[0] !== '' && dados.length > 1) && dados.length % 1 !== 1) {
        for (aux = 0; aux < dados.length; aux++) {
            if (dados[aux].split(";").length === 2) {
                times.push({ "time": dados[aux].substr(0, dados[aux].indexOf(";")), "estado": dados[aux].substr(dados[aux].indexOf(";") + 1, dados[aux].length), "vitorias": 0, "empates": 0, "derotas": 0, "pontos": 0 });

            } else {
                alert("Siga o padrão informado no placeholder: time;estado");
                break;
            }
        };
        alert("Os times foram cadastrados com sucesso!\nVá até a seção de jogos.")
        cadastrarJogos();
    } else {
        alert("Preencha o campo com uma quantidade par de times.");
    }
}


function cadastrarJogos() {
    times = sortear(times);
    times.map(time1 => {
        times.map(time2 => {
            if (time1 !== time2 && times.indexOf(time2) > times.indexOf(time1)) {
                teams = [time1, time2];
                sortear(teams);
                auxJogos.push({ "time1": teams[0], "golsIda1": 0, "golsVolta1": 0, "time2": teams[1], "golsIda2": 0, "golsVolta2": 0, "rodadaDupla1": false, "rodadaDupla2": false })
            }
        })
    })

    auxJogos = sortear(auxJogos);

    while (auxJogos.length !== 0) {
        auxJogos.map(jogo => {
            validarJogo(jogo);
        })
    }

    printarJogos();
}

function validarJogo(jogo) {
    var cont = 0;

    if (rodadas.length === 0) {
        rodadas.push(jogo);
        auxJogos.splice(auxJogos.indexOf(jogo), 1);
    } else if (auxJogos.length > 0) {
        rodadas.map(partida => {
            if (jogo !== partida) {
                if (!(jogo.time1 === partida.time1 || jogo.time1 === partida.time2
                    || jogo.time2 === partida.time1 || jogo.time2 === partida.time2)) {
                    cont++;
                }
            }
        })

        if (cont === rodadas.length) {
            rodadas.push(jogo);
            auxJogos.splice(auxJogos.indexOf(jogo), 1);
        }
        validarRodada();
    }
}

function validarRodada() {
    if (rodadas.length === times.length / 2) {
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
}

function sortear(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = parseInt(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}


function printarJogos() {
    var aux = 1;
    var aux2 = 0;
    document.getElementById("lista-jogos").innerHTML = '';
    document.getElementById("btnIniciar").style.display  = "block";

    jogos.map(jogo => {
        if (aux2 === times.length / 2) {
            aux2 = 0
            aux++;
        }
        aux2++;

        document.getElementById("lista-jogos").innerHTML += " <li class='list-group-item d-flex justify-content-between align-items-start text-white bg-warning'> <div class='ms-2 me-auto'> <div class='fw-bold cor-secundaria'>" + "<img src='/img/"+jogo.time1.time.toLowerCase()+".png' class='w-25'/> " + jogo.time1.time + " x "  + "<img src='/img/"+jogo.time2.time.toLowerCase()+".png'  class='w-25'/> " + jogo.time2.time + " - " + jogo.time1.estado + " </div> Jogo Ida - Rodada " + aux + (jogo.rodadaDupla1 ? " (Rodada Dupla) " : "") + " </div> <span class='badge cor-primaria rounded-pill'>" + jogo.golsIda1 + " X " + jogo.golsIda2 + "</span></li>";

    })

    jogos.map(jogo => {
        if (aux2 === times.length / 2) {
            aux2 = 0
            aux++;
        }
        aux2++;

        document.getElementById("lista-jogos").innerHTML += " <li class='list-group-item d-flex justify-content-between align-items-start text-white bg-warning'> <div class='ms-2 me-auto'> <div class='fw-bold cor-secundaria'>"+ "<img src='/img/"+jogo.time2.time.toLowerCase()+".png'  class='w-25'/>" + jogo.time2.time + " x " + "<img src='/img/"+jogo.time1.time.toLowerCase()+".png'  class='w-25'/> " + jogo.time1.time + " - " + jogo.time2.estado + " </div> Jogo Volta - Rodada " + aux + (jogo.rodadaDupla2 ? " (Rodada Dupla) " : "") + " </div> <span class='badge cor-primaria rounded-pill'>" + jogo.golsVolta1 + " X " + jogo.golsVolta2 + "</span></li>";

    })
}

function iniciarTorneio() {
    var cont = 0;
    document.getElementById("tbd-jogos").innerHTML = '';
    document.getElementById("podio").style.display  = "block";

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
        document.getElementById("tbd-jogos").innerHTML += " <tr> <td>" + cont + "°</td> <td>" + time.time + "</td> <td>" + time.estado + "</td><td> " + time.vitorias + "</td> <td> " + time.empates + "</td> <td>" + time.derotas + "</td> <td>" + time.pontos + "</td> </tr>"
    })


    for(j = 0 ; j <= 2; j++){
        if(j === 0 ){   
            document.getElementById("time1").src = '/img/'+times[j].time.toLowerCase()+'.png'; 
            console.log(times[j]);
        }else if (j ===1){
            document.getElementById("time2").src = "/img/"+times[j].time.toLowerCase()+".png"; 
        }else if(j === 2){
            document.getElementById("time3").src = "/img/"+times[j].time.toLowerCase()+".png"; 
        }
    }
}

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
