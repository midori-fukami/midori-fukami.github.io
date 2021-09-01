$(document).ready(function () {
    function showResult() {
        var pokemon = 2;
        const chute = document.querySelector(".chute").value;
        const result = document.querySelector(".result");

        $(".modal").modal('show');

        if (pokemon == chute) {
            result.textContent = "CORRETA!";
            result.classList.remove("error");
        } else {
            result.classList.add("error");
            result.textContent = "ERRADA!!!";
        }
    }
});