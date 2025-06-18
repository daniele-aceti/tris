const celle = document.querySelectorAll(".cella");
const turnoXO = document.querySelector(".turnoXO");

const imgX = localStorage.getItem("pg1");
const imgO = localStorage.getItem("pg2");

let turno = true;
let bitX = 0;
let bitO = 0;
let finePartita = false;
let risultato = null;

const combinazioniVincenti = [7, 56, 448, 73, 146, 292, 273, 84];


// Funzione per creare il pulsante RESTART
function mostraRestart() {
    const btn = document.createElement("button");
    btn.textContent = "RESTART";
    btn.style.position = "fixed";
    btn.style.top = "50%";
    btn.style.left = "50%";
    btn.style.transform = "translate(-50%, -50%)";
    btn.style.padding = "20px 40px";
    btn.style.fontSize = "20px";
    btn.style.backgroundColor = "red";
    btn.style.color = "yellow";
    btn.style.border = "3px solid orange";
    btn.style.fontFamily = "'Press Start 2P', cursive";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "1000";
    btn.addEventListener("click", () => location.reload());
    document.body.appendChild(btn);
}

celle.forEach((cella, i) => {
    cella.addEventListener("click", function () {
        if (cella.innerHTML !== "" || finePartita) return;

        const bit = 1 << i;

        if (turno) {
            cella.innerHTML = `<img src="${imgX}" style="width:50px; display:block; margin:0 auto;">`;
            bitX |= bit;

            if (checkWin(bitX)) {
                turnoXO.textContent = "Ha vinto PG1!";
                risultato = "PG1 ha vinto";
                finePartita = true;
                salvaRisultato(risultato);
                mostraRestart();
                return;
            }

        } else {
            cella.innerHTML = `<img src="${imgO}" style="width:50px; display:block; margin:0 auto;">`;
            bitO |= bit;

            if (checkWin(bitO)) {
                turnoXO.textContent = "Ha vinto PG2!";
                risultato = "PG2 ha vinto";
                finePartita = true;
                salvaRisultato(risultato);
                mostraRestart();
                return;
            }
        }

        turno = !turno;

        const tuttePiene = Array.from(celle).every(c => c.innerHTML !== "");
        if (tuttePiene && !finePartita) {
            turnoXO.textContent = "Pareggio!";
            risultato = "Pareggio";
            finePartita = true;
            salvaRisultato(risultato);
            mostraRestart();
        } else {
            turnoXO.textContent = turno ? "È il turno di PG1" : "È il turno di PG2";
        }
    });
});

function checkWin(bitboard) {
    return combinazioniVincenti.some(mask => (bitboard & mask) === mask);
}

function salvaRisultato(risultato) {
    let risultati = JSON.parse(localStorage.getItem("risultati")) || [];
    risultati.push({
        giocatore: risultato,
        data: new Date().toLocaleString()
    });
    localStorage.setItem("risultati", JSON.stringify(risultati));
}
