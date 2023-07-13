const formulario = document.querySelector("#formAgregarPelicula");
const msjExito = document.querySelector("#msj-success");
const msjWarning = document.querySelector("#msj-warning");
const msjError = document.querySelector("#msj-error");

let codigosPeliculas = localStorage.getItem('codigosPeliculas'); // creo el locStorage
codigosPeliculas = codigosPeliculas // si existe?
                    ? JSON.parse(codigosPeliculas) // lo parseo de string a array
                        : []; // si no existe, lo creo como array nuevo

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let codigoInput = document.querySelector("#codigoInput").value.trim();
    const expresionRegular = /^\d+$/;

    if (codigoInput.length === 0) {

        // input está vacío
        msjExito.style.display = "none";
        msjError.style.display = "block";

        setTimeout(() => {
            msjError.style.display = "none";
            formulario.reset();
        }, 2500);

    } else if (!expresionRegular.test(codigoInput)) {

        // código no válido
        msjExito.style.display = "none";
        msjError.style.display = "block";

        setTimeout(() => {
            msjError.style.display = "none";
            formulario.reset();
        }, 2500);

    } else {
        // código válido
        codigoInput = Number(codigoInput);

        if (!codigosPeliculas.includes(codigoInput)) {
            codigosPeliculas.push(codigoInput);

            // actualizo/guardo el localStorage
            localStorage.setItem('codigosPeliculas', JSON.stringify(codigosPeliculas));

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

        console.log("Arrays con los CODIGOS: " + codigosPeliculas);
        console.log("Código del Input: " + codigoInput);
    }
});