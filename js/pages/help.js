document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const nombreInput = document.querySelector("#nombre");
    const emailInput = document.querySelector("#email");
    const mensajeInput = document.querySelector("#mensaje");
    const errorNombre = document.querySelector("#nombreError");
    const errorEmail = document.querySelector("#emailError");
    const errorMensaje = document.querySelector("#errorMensaje");
    const limpiar = document.querySelector("#limpiar")
    const enviado = document.querySelector("#enviado")
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const nombreValue = nombreInput.value.trim();
        const emailValue = emailInput.value.trim();
        const mensajeValue = mensajeInput.value.trim();

        if (nombreValue === "") {
            errorNombre.textContent = "Debe ingresar un nombre";
            errorNombre.style.display = "block";
        } else {
            errorNombre.style.display = "none";
        }

        if (emailValue === "") {
            errorEmail.textContent = "Debe ingresar un email";
            errorEmail.style.display = "block";
        } else {
            errorEmail.style.display = "none";
        }

        if (mensajeValue === "") {
            errorMensaje.textContent = "Debe ingresar un mensaje";
            errorMensaje.style.display = "block";
        } else {
            errorMensaje.style.display = "none";
        }

        if (nombreValue !== "" && emailValue !== "" && mensajeValue !== "") {
            // Aquí puedes realizar cualquier acción adicional que desees al enviar el formulario
            enviado.textContent = "Enviado Exitosamente"
            enviado.style.display = "block"
            form.reset();
            setTimeout(() => {
                enviado.style.display = "none"
            }, 2500);
        }

    });

    limpiar.addEventListener("click", () => {
        form.reset()
    })
});