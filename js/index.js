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

celle.forEach((cella, i) => {
    cella.addEventListener("click", function (event) {
        if (cella.textContent !== "" || finePartita) {
            return;
        }
        const bit = 1 << i;
        if (turno) {
            cella.innerHTML = `<img src="${imgX}" style="width:50px; display:block; margin:0 auto;">`;
            bitX |= bit;
            turno = false;
            if (checkWin(bitX)) {
                turnoXO.textContent = "Ha vinto PG1!";
                risultato = "PG1 ha vinto";
                finePartita = true;
                salvaRisultato(risultato);
                return;
            }
            turnoXO.textContent = "È il turno di PG2";
        } else {
            cella.innerHTML = `<img src="${imgO}" style="width:50px; display:block; margin:0 auto;">`;
            bitO |= bit;
            turno = true;
            if (checkWin(bitO)) {
                turnoXO.textContent = "Ha vinto PG2!";
                risultato = "PG2 ha vinto";
                finePartita = true;
                salvaRisultato(risultato);
                return;
            }
            turnoXO.textContent = "È il turno di PG1";
        }

        // Controlla se tutte le celle sono piene
        let tuttePiene = true;
        for (let i = 0; i < celle.length; i++) {
            if (celle[i].textContent === "") {
                tuttePiene = false;
                break;
            }
        }

        if (tuttePiene && !finePartita) {
            turnoXO.textContent = "Pareggio!";
            risultato = "Pareggio";
            finePartita = true;
            salvaRisultato(risultato);
        }
    });
});

function checkWin(bitboard) {
    return combinazioniVincenti.some(mask => (bitboard & mask) === mask);
}

function salvaRisultato(risultato) {
    // Recupera array esistente o ne crea uno nuovo
    let risultati = JSON.parse(localStorage.getItem("risultati")) || [];

    // Aggiunge un nuovo oggetto risultato con data e testo
    risultati.push({
        giocatore: risultato,
        data: new Date().toLocaleString()
    });

    // Salva di nuovo in localStorage
    localStorage.setItem("risultati", JSON.stringify(risultati));
}
