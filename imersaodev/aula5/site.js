var addedMovieList = [];
const urlImgDefault = "https://image.tmdb.org/t/p/w500/";
const urlApi = "https://api.themoviedb.org/3/search/movie?api_key=36c49ba4fd59283236a6b0349daa936a&language=pt-BR&query=";

async function addMovie() {
    let NameMovie = document.querySelector("input").value;

    let p = document.querySelector("p");

    await chamaApi(NameMovie);

    setTimeout(function () {
        p.innerHTML = "&nbsp;";
    }, 2000);
}

async function chamaApi(movieName) {
    let divImg = document.querySelector(".div-img");
    let p = document.querySelector("p");

    await fetch(`${urlApi}${movieName.toLowerCase()}`, { method: "GET" })
        .then((res) => {
            return res.json();
        })
        .then(async (data) => {
            if (data.total_results > 0) {
                if (isAdded(data.results[0].title)) {
                    p.textContent = "Já adicionou esse filme, cara";
                } else {
                    addedMovieList.push(data.results[0].title);

                    var urlTrailer = await getTrailer(data.results[0].id);

                    divImg.innerHTML =
                        divImg.innerHTML +
                        htmlImg(
                            urlImgDefault + data.results[0].poster_path,
                            urlTrailer
                        );
                    document.querySelector("input").value = "";
                }
            } else {
                p.textContent = "Não tem esse filme, cara";
            }
        })
        .catch((error) => {
            console.log(error);
            p.textContent = "Deu erro pra pegar o filme, cara";
        });
}

async function getTrailer(idMovie) {
    let urlApiTrailer = `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=36c49ba4fd59283236a6b0349daa936a&language=en-US`;

    let urlTrailer = "";

    await fetch(urlApiTrailer, { method: "GET" })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.results.length > 0) {
                const keyYt = data.results[0].key;
                urlTrailer = `https://youtu.be/${keyYt}`;
            }
        })
        .catch((error) => {
            console.log(error);
        });
    return urlTrailer;
}

function isAdded(movieName) {
    return addedMovieList.includes(movieName);
}

function htmlImg(urlMovie, trailer) {

    return `<a ${trailer.length > 0
            ? "title='Clique para ver o trailer' href='" + trailer + "'"
            : "title='Não tem trailer esse filme'"
        } target="_blank"><img src="${urlMovie}"></a>`;
}

// deprecated
function isImg(urlMovie) {
    return (
        urlMovie.endsWith(".jpg") ||
        urlMovie.endsWith(".jpeg") ||
        urlMovie.endsWith(".png")
    );
}

document.querySelector("button").addEventListener("click", addMovie);
