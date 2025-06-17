const personaggi = document.querySelectorAll(".figure");
const button = document.querySelector(".button");

button.classList.toggle("d-none");

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
            personaggio.innerHTML = `<h4 class= "pg">PG1</h4>`
            personaggioUno = srcSelezionato;
            selezionato.style.border = "5px solid red"; // evidenzia scelta 1

        }
        // Se il primo è scelto ma non il secondo
        else if (!personaggioDue) {
            personaggio.innerHTML = `<h4 class= "pg">PG2</h4>`
            personaggioDue = srcSelezionato;
            selezionato.style.border = "5px solid blue"; // evidenzia scelta 2
        }
        if (personaggioUno && personaggioDue) {
            localStorage.setItem("pg1", personaggioUno);
            localStorage.setItem("pg2", personaggioDue);
            button.classList.toggle("d-none");
        }
    });
});
