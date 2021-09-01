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
    img:
        "https://www.ffesports.com.br/wp-content/uploads/2020/05/logo-time-god.png",
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
    img:
        "https://scontent.fcpq5-1.fna.fbcdn.net/v/t1.6435-9/83996536_2670881649695539_979753456933797888_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=7hdojfsZmoAAX_uesK6&_nc_ht=scontent.fcpq5-1.fna&oh=5c9109ddcfdef0d091913a6d98aa6438&oe=6089F2A7",
    atributos: {
        energia: 100,
        obediencia: 90,
        cabritagem: 90,
        idade: 31
    }
};

let deck = [
    cardCabrita,
    cardChorro,
    cardYoshi,
    cardXunGODzim,
    cardG_e_ZU,
    cardMarotzky
];

let deckPlayer = [];
let deckPC = [];

var cardPlayer;
var cardPC;

var pointPlayer = 0;
var pointPC = 0;

function sortearCarta() {
    var qtdOriginal = deck.length;
    for (var i = 0; i < qtdOriginal / 2; i++) {
        let randomP = parseInt(Math.random() * deck.length);
        cardPlayer = deck[randomP];
        deckPlayer.push(cardPlayer);
        deck.splice(randomP, 1);
        console.log(i);
    }
    cardPlayer = deckPlayer[0];
    addValueHtml(document.getElementById("card-player"), cardPlayer);

    qtdOriginal = deck.length;
    for (var i = 0; i < qtdOriginal; i++) {
        let randomPC = parseInt(Math.random() * deck.length);
        cardPC = deck[randomPC];
        deckPC.push(cardPC);
        deck.splice(randomPC, 1);
    }
    cardPC = deckPC[0];
    document.getElementById("btnSortear").disabled = true;

    atualizaCards();
}

function atualizaCards() {
    document.querySelector(".qtd-card-player").textContent = `Vc tem ${deckPlayer.length} carta(s)`;
    document.querySelector(".qtd-card-pc").textContent = `PC tem ${deckPC.length} carta(s)`;
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
        pointPlayer++;
    } else if (valorPc > valorPlayer)
        pointPC++;

    if (deckPC.length != 1 || deckPlayer.length != 1) {
        if (valorPlayer > valorPc) {
            result.textContent = "Vc ganhou a rodada";
            document.querySelector("h2").textContent = "Escolha seu atributo"
        } else if (valorPlayer == valorPc) {
            result.textContent = "Deu empate";
            document.querySelector("h2").textContent = "Escolha seu atributo"
        } else {
            result.textContent = "Vc perdeu a rodada";
            document.querySelector("h2").textContent = "Vez da máquina escolher"
            jogadaIA();
        }
        document.getElementById("btnNext").disabled = false;
    } else {
        document.querySelector("#btnNext").disabled = true;

        if (pointPlayer > pointPC) result.textContent = "Ganhou de verdade!";
        else if (pointPC > pointPlayer) result.textContent = "Perdeu tudo!";
        else result.textContent = "Empato tudo!";
    }
    atualizaPlacar();

    document.querySelector(".modal").style.display = "block";
    document.querySelector(".modal-backdrop").style.display = "block";
    document.querySelector(".modal").classList.add("ativo");

    addValueHtml(document.getElementById("card-pc"), cardPC);

    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnResetar").disabled = false;

    disabledChecks(false);
}

function resetarJogo() {
    document.querySelector("h2").textContent = "Escolha seu atributo"
    document.querySelector(".result").textContent = "";
    document.getElementById("card-player").classList.add("ativo");
    document.getElementById("card-pc").classList.add("ativo");
    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnSortear").disabled = false;
    document.getElementById("btnNext").disabled = true;
    document.getElementById("btnResetar").disabled = true;

    uncheckAttr();
    deck = [
        cardCabrita,
        cardChorro,
        cardYoshi,
        cardXunGODzim,
        cardG_e_ZU,
        cardMarotzky
    ];
    deckPlayer = [];
    deckPC = [];

    pointPlayer = 0;
    pointPC = 0;
    atualizaPlacar();
    atualizaCards();
}

function atualizaPlacar() {
    document.querySelector(".verde").textContent = `Jogador ${pointPlayer} `;
    document.querySelector(".red").textContent = ` ${pointPC} Máquina`;
}

function uncheckAttr() {
    var atributos = document.getElementsByName("atributo");
    for (var i = 0; i < atributos.length; i++) {
        if (atributos[i].checked) {
            atributos[i].checked = false;
        }
    }
}

function disabledChecks(desabilita) {
    var atributos = document.getElementsByName("atributo");
    for (var i = 0; i < atributos.length; i++) {
        atributos[i].disabled = desabilita
    }
}

function selectedRadio() {
    document.getElementById("btnJogar").disabled = false;
}

function closeModal() {
    document.querySelector(".modal-backdrop").style.display = "none";
    document.querySelector(".modal").style.display = "none";
}

function next() {
    deckPlayer.shift();
    cardPlayer = deckPlayer[0];
    addValueHtml(document.getElementById("card-player"), cardPlayer);

    deckPC.shift();
    cardPC = deckPC[0];

    atualizaCards();

    document.getElementById("card-pc").classList.add("ativo");

    document.getElementById("btnNext").disabled = true;

    uncheckAttr();
}

function jogadaIA() {
    setTimeout(function () {
        closeModal();

        document.getElementById("card-pc").classList.add("ativo");
        document.getElementById("card-player").classList.add("ativo");

        setTimeout(function () {
            next();
            document.getElementById("card-pc").classList.remove("ativo");
            addValueHtml(document.getElementById("card-pc"), cardPC);
            var atributoPC = escolheAttrPC();
            setAtributoEscolhido(atributoPC);
            disabledChecks(true);
            selectedRadio();
        }, 2000)
    }, 2000)
}

function escolheAttrPC() {
    var maiorAtributo = ""

    if (cardPC.atributos.energia >= cardPC.atributos.obediencia &&
        cardPC.atributos.energia >= cardPC.atributos.cabritagem &&
        cardPC.atributos.energia >= cardPC.atributos.idade)
        maiorAtributo = "energia"
    else if (cardPC.atributos.obediencia >= cardPC.atributos.cabritagem &&
        cardPC.atributos.obediencia >= cardPC.atributos.idade)
        maiorAtributo = "obediencia"
    else
        maiorAtributo = "cabritagem"

    //exceção maior idade = 31
    if (cardPC.atributos.idade == 31)
        maiorAtributo = "idade"

    return maiorAtributo;
}

function setAtributoEscolhido(atributoPC) {
    var atributos = document.getElementsByName("atributo");
    for (var i = 0; i < atributos.length; i++) {
        if (atributos[i].value == atributoPC) {
            atributos[i].checked = true;
            return;
        }
    }
}