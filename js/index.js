const celle = document.querySelectorAll(".cella");
const turnoXO = document.querySelector(".turnoXO");
const personaggi = document.querySelectorAll(".figure");


let personaggioUno = null;
let personaggioDue = null;

/* 
*scelta personaggi
 */


personaggi.forEach(personaggio => {
    personaggio.addEventListener("click", function (event) {
        event.preventDefault();
        const selezionato = event.target;   // elemento <img>
        const srcSelezionato = selezionato.src; // la stringa src

        // Evita che lo stesso personaggio venga scelto due volte
        if (srcSelezionato === personaggioUno || srcSelezionato === personaggioDue) {
            return;
        }

        // Se non è stato ancora scelto il primo personaggio
        if (!personaggioUno) {
            personaggioUno = srcSelezionato;
            selezionato.style.border = "2px solid red"; // evidenzia scelta 1
        }
        // Se il primo è scelto ma non il secondo
        else if (!personaggioDue) {
            personaggioDue = srcSelezionato;
            selezionato.style.border = "2px solid blue"; // evidenzia scelta 2
        }
        // Altrimenti entrambi i personaggi sono già scelti → non fare nulla
    });
});


let turno = true;
let bitX = 0;
let bitO = 0;
let finePartita = false;


const combinazioniVincenti = [7, 56, 448, 73, 146, 292, 273, 84]; // 7 = cella 0-1-2 che in binario 000000111

/*   
    *0    |     1 << 0 → 0b000000001
    *1    |     1 << 1 → 0b000000010
    *2    |     1 << 2 → 0b000000100 
    *che sommati fanno   0b000000111 = 7
     */

/* 
*logica di gioco
*/
celle.forEach((cella, i) => {
    cella.addEventListener("click", function (event) {
        if (cella.textContent !== "" || finePartita) {
            return;
        }
        const bit = 1 << i; //i volte 9 volte
        if (turno) {
            cella.innerHTML = '<img src="/img/metal-sug pg1.gif" style="width: 50px; display: block; margin: 0 auto;">';
            bitX |= bit; //mappa le celle cliccate bitX = bitX | bit tiene traccia di tutti i bit attivi senza spegnerli
            turno = false;
            if (checkWin(bitX)) {
                turnoXO.textContent = "Ha vinto X!";
                finePartita = true;
                return;
            }
            turnoXO.textContent = "È il turno di O";
        } else {
            cella.textContent = "O";
            bitO |= bit;
            turno = true;
            if (checkWin(bitO)) {
                turnoXO.textContent = "Ha vinto O!";
                finePartita = true;
                return;
            }
            turnoXO.textContent = "È il turno di X";
        }
        // Controlla se tutte le celle sono piene
        let tuttePiene = true;

        for (let i = 0; i < celle.length; i++) {
            if (celle[i].textContent === "") {
                tuttePiene = false;
                break;
            }
        }

        // Se tutte sono piene e la partita non è finita, è pareggio
        if (tuttePiene && !finePartita) {
            turnoXO.textContent = "Pareggio!";
            finePartita = true;
        }

    })

    function checkWin(bitboard) {
        return combinazioniVincenti.some(mask => (bitboard & mask) === mask);
    }

});
