document.addEventListener("DOMContentLoaded", async () => {

    const cargarFavoritos = async () => {
        const contenedorPeliculas = document.querySelector("#sec-favorities-list");
        contenedorPeliculas.innerHTML = ""; // Limpia el contenedor de películas

        // Obtengo el array de códigos desde el localStorage
        let codigosPeliculas = localStorage.getItem('codigosPeliculas');
        codigosPeliculas = codigosPeliculas ? JSON.parse(codigosPeliculas) : [];

        codigosPeliculas.forEach(async (codigo) => {
            try {
                let respuesta = await fetch(`https://api.themoviedb.org/3/movie/${codigo}?api_key=d499f83b1fc4e52d8070293d3520f049&Language=es-AR`);

                if (respuesta.status === 200) {
                    let pelicula = await respuesta.json();

                    console.log(pelicula);

                    contenedorPeliculas.innerHTML += `<div class="contenedorPeliculasFavoritas">
                      <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="poster" />
                      <h3>${pelicula.title}</h3>
                      <p>
                        <b>Código:</b> ${pelicula.id} <br>
                        <b>Título original:</b> ${pelicula.original_title} <br>
                        <b>Idioma original:</b> ${pelicula.original_language} <br>
                        <b>Resumen:</b> ${pelicula.overview}
                      </p>
                      <div class="padreboton">
                        <button type="submit" class="button">Agregar a Favoritos</button>
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
        });
    }

    cargarFavoritos();
});