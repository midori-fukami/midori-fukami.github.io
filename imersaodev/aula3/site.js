let numeroRandom = parseInt(Math.random() * 10);
let tentativas = 0;
//console.log(numeroRandom)
function chute() {
    const result = document.querySelector(".result");
    const resultGameover = document.querySelector(".result-gameover");
    let chute = document.querySelector(".chute").value;

    //while (tentativas < 3) {
    if (numeroRandom == chute) {
        result.textContent = "CORRETA!";
        result.classList.remove("error");
        tentativas = 3;
    } else {
        result.classList.add("error");
        if (numeroRandom > chute) {
            result.textContent = "ERRADA!!! É maior";
        } else result.textContent = "ERRADA!!! É menor";
        tentativas++;
    }
    $(".modal-result").modal("show");
    //}

    if (tentativas == 3) {
        setTimeout(function () {
            $(".modal-result").modal("hide");
        }, 2000);

        setTimeout(function () {
            $("#modal-gameover").modal("show");
            if (chute != numeroRandom) {
                resultGameover.textContent = "Errou 3 vezes, acabou, era " + numeroRandom;
            } else {
                resultGameover.textContent = "Acertou mesmo, acabou";
            }
        }, 2000);
    }
}

$("#modal-gameover").on("hidden.bs.modal", function (e) {
    tentativas = 0;
    numeroRandom = parseInt(Math.random() * 10);
});
