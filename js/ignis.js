let times = [
    {"time": "vasco", "estado": "Rio De Janeiro", "vitorias": 0, "empates": 0, "derotas": 0, "pontos": 0}, {"time": "flamnego", "estado": "Rio De Janeiro", "vitorias": 0, "empates": 0, "derotas": 0, "pontos": 0}
]


function alterarCor(){
    let cor = document.getElementById("pag").style.backgroundColor;

    console.log(cor);

    if(cor == "white"){
        document.getElementById("pag").style.backgroundColor = "black"; 
        document.getElementById("pag").style.color = "white";

    }else{
        document.getElementById("pag").style.backgroundColor = "white";
        document.getElementById("pag").style.color = "black";
    }
}