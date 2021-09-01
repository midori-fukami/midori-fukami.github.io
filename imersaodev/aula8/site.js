let cardCabrita = {
    Nome: "Emmy",
    img: "https://i.ibb.co/Nn9qjNG/cabritinhaemote.png",
    atributos: {
        energia: 90,
        obediencia: 50,
        cabritagem: 100, //cabritagem é como trolagem, só que pior
        idade: 5
    }
};

let cardChorro = {
    Nome: "Loki",
    img: "https://i.ibb.co/XFc8D6Q/loki112.png",
    atributos: {
        energia: 70,
        obediencia: 90,
        cabritagem: 60, //cabritagem é como trolagem, só que pior
        idade: 8
    }
};

let cardYoshi = {
    Nome: "Yoshi",
    img:
        "https://play.nintendo.com/images/Masthead_yoshi.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png",
    atributos: {
        energia: 60,
        obediencia: 50,
        cabritagem: 90,
        idade: 31
    }
};

let cardXunGODzim = {
    Nome: "GOD",
    img: "https://www.ffesports.com.br/wp-content/uploads/2020/05/logo-time-god.png",
    atributos: {
        energia: 100,
        obediencia: 100,
        cabritagem: 100,
        idade: 25
    }
};

let cardG_e_ZU = {
    Nome: "Geyzon",
    img: "https://i.ibb.co/zVXph11/jason-removebg-preview.png",
    atributos: {
        energia: 50,
        obediencia: 90,
        cabritagem: 90,
        idade: 19
    }
};

let cardMarotzky = {
    Nome: "Marotzky",
    img: "https://scontent.fcpq5-1.fna.fbcdn.net/v/t1.6435-9/83996536_2670881649695539_979753456933797888_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=7hdojfsZmoAAX_uesK6&_nc_ht=scontent.fcpq5-1.fna&oh=5c9109ddcfdef0d091913a6d98aa6438&oe=6089F2A7",
    atributos: {
        energia: 100,
        obediencia: 90,
        cabritagem: 90,
        idade: 31
    }
};

let deck = [cardCabrita, cardChorro, cardYoshi, cardXunGODzim, cardG_e_ZU, cardMarotzky];

var cardPlayer;
var cardPC;

function sortearCarta() {
    let randomP = parseInt(Math.random() * deck.length);

    cardPlayer = deck[randomP];
    addValueHtml(document.getElementById("card-player"), cardPlayer);

    let randomPC = parseInt(Math.random() * deck.length);
    while (randomP == randomPC) {
        randomPC = parseInt(Math.random() * deck.length);
    }
    cardPC = deck[randomPC];
    document.getElementById("btnSortear").disabled = true;
}

function addValueHtml(section, card) {
    section.getElementsByTagName("h3")[0].innerText = card.Nome;
    section.getElementsByTagName("img")[0].src = card.img;
    section.querySelector("[data-energia]").textContent = card.atributos.energia;
    section.querySelector("[data-obediencia]").textContent =
        card.atributos.obediencia;
    section.querySelector("[data-cabritagem]").textContent =
        card.atributos.cabritagem;
    section.querySelector("[data-idade]").textContent = card.atributos.idade;
    section.classList.remove("ativo");
}

function getAtributoChecked() {
    var atributos = document.getElementsByName("atributo");
    for (var i = 0; i < atributos.length; i++) {
        if (atributos[i].checked) {
            return atributos[i].value;
        }
    }
}

function jogar() {
    var atributo = getAtributoChecked();
    var valorPlayer = cardPlayer.atributos[atributo];
    var valorPc = cardPC.atributos[atributo];

    var result = document.querySelector(".result");

    if (valorPlayer > valorPc) {
        result.textContent = "Vc ganhou!";
    } else if (valorPlayer == valorPc) {
        result.textContent = "Deu empate, cara";
    } else {
        result.textContent = "Vc perdeu, cara";
    }
    document.querySelector(".modal").style.display = "block";
    document.querySelector(".modal-backdrop").style.display = "block";
    document.querySelector(".modal").classList.add("ativo");

    addValueHtml(document.getElementById("card-pc"), cardPC);

    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnResetar").disabled = false;
}

function resetarJogo() {
    document.querySelector(".result").textContent = "";
    document.getElementById("card-player").classList.add("ativo");
    document.getElementById("card-pc").classList.add("ativo");
    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnSortear").disabled = false;
    document.getElementById("btnResetar").disabled = true;

    var atributos = document.getElementsByName("atributo");
    for (var i = 0; i < atributos.length; i++) {
        if (atributos[i].checked) {
            atributos[i].checked = false;
        }
    }
}

function selectedRadio() {
    document.getElementById("btnJogar").disabled = false;
}

function closeModal() {
    document.querySelector(".modal-backdrop").style.display = "none";
    document.querySelector(".modal").style.display = "none";
}