import React, { useState, useEffect } from 'react'; 
import Card from '../Card/Card'; 

function FavMovies() { 

    const [todosdatos, setTodosDatos] = useState([])

    const [cargados, setCargados] = useState(false)

    useEffect(
        () => { 
        let listFav = localStorage.getItem("movie") 
        console.log(listFav);
        let listFavJson = JSON.parse(listFav); 
        console.log('listFavJSON movies', listFavJson);

        if (listFavJson === null || listFavJson.length === 0) {
            setCargados(false) 
        } else {
            const favsRecuperados = [] 
            listFavJson.map((i) =>
            fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=9db3ef1e0eb1302b52edf03773eaebd3`) 
              .then(res => res.json()) 
              .then(data => {
                favsRecuperados.push(data) 
                setTodosDatos(favsRecuperados)
                setCargados(true) 
                })
              .catch(error => console.log(error)) 
            )
        }
    }, []
    )
 
        return(
            <React.Fragment>
                <h2 className="pelisfav">Películas Favoritas</h2>
                <div>
                    <section className="row cards" id="movie">
                        {cargados == false ? 
                            <p className="noresult">No hay películas guardadas</p>
                            : todosdatos.length == 0 ? 
                            <p>Cargando</p>
                            : todosdatos.map((peliculas, id) => ( 
                                <Card 
                                  type="movie" 
                                  titulo={peliculas.title} 
                                  id={peliculas.id} 
                                  imagen={peliculas.poster_path} 
                                  descripcion={peliculas.overview}
                                />
                            ))
                        }
                    </section>
                </div>
            </React.Fragment>
        )
}

export default FavMovies; 