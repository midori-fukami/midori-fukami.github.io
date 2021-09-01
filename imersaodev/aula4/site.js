var movieList = [
    "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BOTc3YmM3N2QtODZkMC00ZDE5LThjMTQtYTljN2Y1YTYwYWJkXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_.jpg"
];

var nameList = ["O Meu Vizinho Totoro", "A Viagem de Chihiro", "Ponyo"];

var addedMovie = [];

const ulListaNome = document.querySelector(".lista-nome");

// listar os nomes dos filmes
for (var i = 0; i < movieList.length; i++) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(nameList[i]));
    ulListaNome.appendChild(li);
}

// adicionar a imagem do filme
function addMovie() {
    const number = Number(document.querySelector(".txtmovie").value) - 1;

    const p = document.querySelector("p")

    if (addedMovie.includes(number.toString())) {
        p.textContent = "já adicionou esse filme, cara"
        setTimeout(function () { p.textContent = "" }, 2000);
    } else {
        addedMovie.push(number.toString());

        const divImg = document.querySelector(".div-img");

        var elem = document.createElement("img");
        elem.setAttribute("src", movieList[number]);
        elem.setAttribute("title", nameList[number]);
        divImg.appendChild(elem);
    }
}