document.addEventListener("DOMContentLoaded", () => {
    const contenedorPeliculas = document.querySelector("#sec-favorities-list");
    const mensajeWarning = document.querySelector("#warningFavoritos");

    const cargarFavoritos = async () => {
        // Obtener el array de códigos desde el localStorage
        let codigosPeliculas = localStorage.getItem("codigosPeliculas");
        codigosPeliculas = codigosPeliculas ? JSON.parse(codigosPeliculas) : [];

        if (codigosPeliculas.length === 0) {
            // No hay películas seleccionadas, mostrar el mensaje de advertencia
            mensajeWarning.style.display = "block";
        } else {
            // Hay películas seleccionadas, ocultar el mensaje de advertencia
            mensajeWarning.style.display = "none";

            for (let codigo of codigosPeliculas) {
                try {
                    // Obtener los detalles de la película desde la API
                    let respuesta = await fetch(
                        `https://api.themoviedb.org/3/movie/${codigo}?api_key=d499f83b1fc4e52d8070293d3520f049&Language=es-AR`
                    );

                    if (respuesta.status === 200) {
                        let pelicula = await respuesta.json();

                        contenedorPeliculas.innerHTML += `
                <div class="contenedorPeliculasFavoritas" data-id="${pelicula.id}">
                  <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="poster" />
                  <h3>${pelicula.title}</h3>
                  <p>
                    <b>Código:</b> ${pelicula.id} <br>
                    <b>Título original:</b> ${pelicula.original_title} <br>
                    <b>Idioma original:</b> ${pelicula.original_language} <br>
                    <b>Resumen:</b> ${pelicula.overview}
                  </p>
                  <div class="padreboton">
                    <button type="button" class="button btn-quitar">Quitar de Favoritos</button>
                  </div>
                </div>`;
                    } else if (respuesta.status === 401) {
                        console.log("Error 401 de autenticación clave API");
                    } else if (respuesta.status === 404) {
                        console.log("Error 404: La película no existe");
                    } else {
                        console.log("Ocurrió un error desconocido");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    cargarFavoritos();

    contenedorPeliculas.addEventListener("click", (event) => {
        // Verificar si se hizo clic en el botón "Quitar de Favoritos"
        if (event.target.classList.contains("btn-quitar")) {
            const peliculaElement = event.target.closest(".contenedorPeliculasFavoritas");
            const peliculaId = peliculaElement.dataset.id;

            // Llamar a la función para eliminar la película del almacenamiento local y la interfaz de usuario
            quitarDeFavoritos(peliculaId);

            // Eliminar la película del DOM
            peliculaElement.remove();

            console.log("pelicula acabo de borrar ID: " + peliculaId);
        }
    });

    const quitarDeFavoritos = (peliculaId) => {
        // Obtener el array de códigos de películas desde el almacenamiento local
        let codigosPeliculas = localStorage.getItem("codigosPeliculas");
        codigosPeliculas = codigosPeliculas ? JSON.parse(codigosPeliculas) : [];
        console.log("Array del localstorage: " + codigosPeliculas);
      
        // Convertir los elementos del array a números
        codigosPeliculas = codigosPeliculas.map((codigo) => Number(codigo));
      
        // Encontrar el índice del código de película que se quiere eliminar
        const indice = codigosPeliculas.indexOf(Number(peliculaId));
      
        // Si se encontró el código de película, eliminarlo del array
        if (indice !== -1) {
          codigosPeliculas.splice(indice, 1);
        }
      
        // Convertir los elementos del array nuevamente a strings
        codigosPeliculas = codigosPeliculas.map((codigo) => String(codigo));
      
        // Guardar el nuevo array en el almacenamiento local
        localStorage.setItem("codigosPeliculas", JSON.stringify(codigosPeliculas));
        console.log("Nuevo array: " + JSON.stringify(codigosPeliculas));
      };
      
      
      





});