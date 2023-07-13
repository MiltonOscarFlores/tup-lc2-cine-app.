const codigosPeliculas = []
const formulario = document.querySelector("#formAgregarPelicula")
const msjExito = document.querySelector("#msj-success")
const msjWarning = document.querySelector("#msj-warning")
const msjError = document.querySelector("#msj-error")

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let codigoInput = document.querySelector("#codigoInput").value.trim();

    if (codigoInput.length === 0) {
        // input está vacío
        msjExito.style.display = "none";
        msjError.style.display = "block";
        setTimeout(() => {
            msjError.style.display = "none";
            formulario.reset();
        }, 2500);
    } else {
        // input no está vacío
        if (!isNaN(codigoInput)) {
            codigoInput = Number(codigoInput);

            if (!codigosPeliculas.includes(codigoInput)) {
                codigosPeliculas.push(codigoInput);

                msjExito.style.display = "block";
                setTimeout(() => {
                    msjExito.style.display = "none";
                    formulario.reset();
                }, 2500);
            } else {
                msjExito.style.display = "none";
                msjWarning.style.display = "block";

                setTimeout(() => {
                    msjWarning.style.display = "none";
                    formulario.reset();
                }, 2500);
            }

            console.log("arrays con los CODIGOS :" + codigosPeliculas);
            console.log("codigo del Input: " + codigoInput);
        } else {
            // código no válido
            msjExito.style.display = "none";
            msjError.style.display = "block";
            setTimeout(() => {
                msjError.style.display = "none";
                formulario.reset();
            }, 2500);
        }
    }
});