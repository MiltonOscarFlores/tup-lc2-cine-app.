document.addEventListener("DOMContentLoaded", async () => {

    // REFERENCIAS
    let pagina = 1;
    const btnAnterior = document.querySelector("#btnAnterior");
    const btnSiguiente = document.querySelector("#btnSiguiente");
    const paginaActual = document.querySelector("#paginaActual");

    // PELICULAS
    const cargarPeliculas = async () => {
      try {
        let respuesta = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=d499f83b1fc4e52d8070293d3520f049&Language=es-AR&page=${pagina}`);

        if (respuesta.status === 200) {
          let datos = await respuesta.json();

          const contenedorPeliculas = document.querySelector("#sec_peliculas");
          contenedorPeliculas.innerHTML = ""; // Limpio el contenedor de peliculas

          datos.results.forEach(pelicula => {
            contenedorPeliculas.innerHTML += `<div class="contenedorPeliculas">
              <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="creed" />
              <h3>${pelicula.title}</h3>
              <p>
                <b>Código:</b> ${pelicula.id} <br>
                <b>Título original:</b> ${pelicula.original_title} <br>
                <b>Idioma original:</b> ${pelicula.original_language} <br>
                <b>Año:</b> ${pelicula.release_date}
              </p>
              <div class="padreboton">
                <button type="submit" class="button">Agregar a Favoritos</button>
              </div>
            </div>`;
          });

          paginaActual.textContent = pagina;
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
    };

    cargarPeliculas();



    // EVENTOS DE PAGINACION

    btnSiguiente.addEventListener("click", () => {
      if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
        paginaActual.textContent = pagina;
      }
    });

    btnAnterior.addEventListener("click", () => {
      if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
        paginaActual.textContent = pagina;
      }
    });
});
