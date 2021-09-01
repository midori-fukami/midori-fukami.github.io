let playerList = [];

function addPlayer() {
    let nome = document.querySelector("input").value;
    if (nome == "") {
        document.querySelector("p").textContent = "Insira um nome";
        setTimeout(function () {
            document.querySelector("p").innerHTML = '&nbsp;'
        }, 2000);
    } else {
        var p = {
            nome: nome,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            pontos: 0
        };
        playerList.push(p);
        atualizaTable();
        document.querySelector("input").value = "";
    }
}

function htmltr(player, i) {
    let body = document.querySelector("tbody");
    let html = `<tr>
        <td>${player.nome}</td>
        <td>${player.vitorias}</td>
        <td>${player.empates}</td>
        <td>${player.derrotas}</td>
        <td>${player.pontos}</td>
        <td><button onclick="addVitoria(${i})" class="btn-vitoria">Vitória</button></td>
        <td><button onclick="addEmpate(${i})" class="btn-empate">Empate</button></td>
        <td><button onclick="addDerrota(${i})" class="btn-derrota">Derrota</button></td>
      </tr>`;
    body.innerHTML = body.innerHTML + html;
}

function atualizaTable() {
    document.querySelector("tbody").innerHTML = "";
    for (var i = 0; i < playerList.length; i++) {
        atualizaPoints(i)
        htmltr(playerList[i], i)
    }
}

function atualizaPoints(i) {
    playerList[i].pontos = (playerList[i].vitorias * 3) + playerList[i].empates - playerList[i].derrotas;
}

function addVitoria(i) {
    playerList[i].vitorias++;
    atualizaTable();
}

function addEmpate(i) {
    playerList[i].empates++;
    atualizaTable();
}

function addDerrota(i) {
    playerList[i].derrotas++;
    atualizaTable();
}