let cardCabrita = {
    Nome: "Emmy",
    img: "https://i.ibb.co/Nn9qjNG/cabritinhaemote.png",
    atributos: {
        energia: 90,
        obediencia: 50,
        cabritagem: 100, //cabritagem é como trolagem, só que pior
        idade: 5
    }
}

let cardChorro = {
    Nome: "Loki",
    img: "https://i.ibb.co/XFc8D6Q/loki112.png",
    atributos: {
        energia: 70,
        obediencia: 90,
        cabritagem: 60, //cabritagem é como trolagem, só que pior
        idade: 8
    }
}

let cardYoshi = {
    Nome: "Yoshi",
    img: "https://play.nintendo.com/images/Masthead_yoshi.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png",
    atributos: {
        energia: 60,
        obediencia: 50,
        cabritagem: 90,
        idade: 31
    }
}

let deck = [cardCabrita, cardChorro, cardYoshi];

var cardPlayer;
var cardPC;

function sortearCarta() {
    let randomP = parseInt(Math.random() * 3)

    cardPlayer = deck[randomP];
    console.log(cardPlayer)
    addValueHtml(document.getElementById("card-player"), cardPlayer);

    let randomPC = parseInt(Math.random() * 3)
    while (randomP == randomPC) {
        randomPC = parseInt(Math.random() * 3)
    }
    cardPC = deck[randomPC];
    //console.log(cardPC)
    document.getElementById('btnJogar').disabled = false;
    document.getElementById('btnSortear').disabled = true;

    showOpcoes()
}

function addValueHtml(section, card) {

    section.getElementsByTagName("h3")[0].innerText = card.Nome;
    section.getElementsByTagName("img")[0].src = card.img;
    section.querySelector('[data-energia]').textContent = card.atributos.energia;
    section.querySelector('[data-obediencia]').textContent = card.atributos.obediencia;
    section.querySelector('[data-cabritagem]').textContent = card.atributos.cabritagem;
    section.querySelector('[data-idade]').textContent = card.atributos.idade;
    section.classList.remove("ativo");
}

function showOpcoes() {
    var opcoes = document.getElementById('opcoes')
    var html = ""
    for (var atr in cardPlayer.atributos) {
        html += `<input type="radio" name="atributo" value="${atr}" for="atributo">${atr}`;
    }
    opcoes.innerHTML = html;
}

function getAtributoChecked() {
    var atributos = document.getElementsByName("atributo")
    for (var i = 0; i < atributos.length; i++) {
        if (atributos[i].checked) {
            return atributos[i].value
        }
    }
}

function jogar() {
    var atributo = getAtributoChecked();
    var valorPlayer = cardPlayer.atributos[atributo]
    var valorPc = cardPC.atributos[atributo]

    var result = document.querySelector('.result')

    if (valorPlayer > valorPc) {
        result.textContent = ('Vc ganhou!')
    } else if (valorPlayer == valorPc) {
        result.textContent = ('Deu empate, cara')
    } else {
        result.textContent = ('Vc perdeu, cara')
    }
    addValueHtml(document.getElementById("card-pc"), cardPC);
}