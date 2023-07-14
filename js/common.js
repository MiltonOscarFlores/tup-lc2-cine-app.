document.addEventListener("DOMContentLoaded", async () => {
  // REFERENCIAS
  let pagina = 1;
  const btnAnterior = document.querySelector("#btnAnterior");
  const btnSiguiente = document.querySelector("#btnSiguiente");
  const paginaActual = document.querySelector("#paginaActual");

  // PELICULAS
  const cargarEstrenos = async () => {
    try {
      let respuesta = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=d499f83b1fc4e52d8070293d3520f049&Language=es-AR&page=${pagina}`
      );

      if (respuesta.status === 200) {
        let datos = await respuesta.json();

        const contenedorPeliculas = document.querySelector("#sec_peliculas");
        contenedorPeliculas.innerHTML = ""; // Limpio el contenedor de peliculas

        datos.results.forEach((pelicula) => {
          const peliculaId = pelicula.id;
          const esFavorito = esPeliculaFavorita(peliculaId);

          contenedorPeliculas.innerHTML += `<div class="contenedorPeliculas" data-id="${peliculaId}">
              <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="creed" />
              <h3>${pelicula.title}</h3>
              <p>
                <b>Código:</b> ${peliculaId} <br>
                <b>Título original:</b> ${pelicula.original_title} <br>
                <b>Idioma original:</b> ${pelicula.original_language} <br>
                <b>Año:</b> ${pelicula.release_date}
              </p>
              <div class="padreboton">
                <button type="button" class="button ${esFavorito ? 'btn-quitar-favoritos' : 'btn-agregar-favoritos'}">
                  ${esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                </button>
              </div>
            </div>`;
        });

        // Verificar si cada película está en la lista de favoritos y actualizar el botón en consecuencia
        const peliculas = contenedorPeliculas.querySelectorAll(".contenedorPeliculas");
        peliculas.forEach((pelicula) => {
          const peliculaId = pelicula.dataset.id;
          const boton = pelicula.querySelector(".button");

          if (esPeliculaFavorita(peliculaId)) {
            boton.textContent = "Quitar de Favoritos";
            boton.classList.remove("btn-agregar-favoritos");
            boton.classList.add("btn-quitar-favoritos");
          }
        });

        paginaActual.textContent = pagina;

        // Agregar controlador de eventos al botón "Agregar a Favoritos" o "Quitar de Favoritos" de cada película
        const favoritosButtons = document.querySelectorAll(".button");
        favoritosButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const peliculaElement = button.closest(".contenedorPeliculas");
            const peliculaId = peliculaElement.dataset.id;

            if (button.classList.contains("btn-agregar-favoritos")) {
              // Agregar la película a favoritos
              agregarAFavoritos(peliculaId);

              // Actualizar el botón a "Quitar de Favoritos"
              button.textContent = "Quitar de Favoritos";
              button.classList.remove("btn-agregar-favoritos");
              button.classList.add("btn-quitar-favoritos");
            } else if (button.classList.contains("btn-quitar-favoritos")) {
              // Quitar la película de favoritos
              quitarDeFavoritos(peliculaId);

              // Actualizar el botón a "Agregar a Favoritos"
              button.textContent = "Agregar a Favoritos";
              button.classList.remove("btn-quitar-favoritos");
              button.classList.add("btn-agregar-favoritos");
            }
          });
        });
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

  cargarEstrenos();

  // Función para verificar si una película está en la lista de favoritos
  const esPeliculaFavorita = (peliculaId) => {
    let codigosPeliculas = localStorage.getItem("codigosPeliculas");
    codigosPeliculas = codigosPeliculas ? JSON.parse(codigosPeliculas) : [];
    return codigosPeliculas.includes(peliculaId);
  };

  // Función para agregar película a Favoritos en el almacenamiento local
  const agregarAFavoritos = (peliculaId) => {
    let codigosPeliculas = localStorage.getItem("codigosPeliculas");
    codigosPeliculas = codigosPeliculas ? JSON.parse(codigosPeliculas) : [];

    // Verificar si la película ya está en la lista de Favoritos
    if (!codigosPeliculas.includes(peliculaId)) {
      codigosPeliculas.push(peliculaId);
      localStorage.setItem("codigosPeliculas", JSON.stringify(codigosPeliculas));
    }
  };

  // Función para quitar película de Favoritos en el almacenamiento local
  const quitarDeFavoritos = (peliculaId) => {
    let codigosPeliculas = localStorage.getItem("codigosPeliculas");
    codigosPeliculas = codigosPeliculas ? JSON.parse(codigosPeliculas) : [];

    // Filtrar el array para crear un nuevo array sin el código de película que se quiere eliminar
    const nuevoArray = codigosPeliculas.filter((codigo) => codigo !== peliculaId);

    // Guardar el nuevo array en el almacenamiento local
    localStorage.setItem("codigosPeliculas", JSON.stringify(nuevoArray));
  };

  // EVENTOS DE PAGINACION
  btnSiguiente.addEventListener("click", () => {
    if (pagina < 1000) {
      pagina += 1;
      cargarEstrenos();
      paginaActual.textContent = pagina;
    }
  });

  btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
      pagina -= 1;
      cargarEstrenos();
      paginaActual.textContent = pagina;
    }
  });
});