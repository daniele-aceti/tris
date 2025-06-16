const celle = document.querySelectorAll(".cella");
const turnoXO = document.querySelector(".turnoXO");
let turno = true;
let simbolo = "";
celle.forEach(cella => {
    cella.addEventListener("click", function (event) {
        if (cella.textContent !== "") {
            return;
        } else {
            if (turno) {
                turnoXO.innerHTML = "E' il turno di O";
                simbolo = "X";
                turno = false;
            } else {
                turnoXO.innerHTML = "E' il turno di X";
                simbolo = "O";
                turno = true;
            }
        }
        cella.textContent = simbolo;
    })
});
