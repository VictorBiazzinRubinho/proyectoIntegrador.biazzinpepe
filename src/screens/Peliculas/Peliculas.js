import React, { useState, useEffect } from 'react';
import BuscadorFiltro from '../../components/BuscadorFiltro/BuscadorFiltro';
import Card from '../../components/Card/Card';

function Peliculas(props) {

    const [datos, setDatos] = setState([])

    const [pag, setPag] = setState(1)

    const [cargados, setCargados] = setState(false)

    const [backup, setBackup] = setState()

    useEffect(
        () => {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc` + `&api_key=9db3ef1e0eb1302b52edf03773eaebd3`)
            .then(res => res.json())
            .then(data => { setDatos(data.results)
                            setBackup(data.results)
                            setCargados(true)
        })
            .catch(error => console.log(error));
    }, []
    )

    function cargarMas() {
        let newpag = pag + 1
        fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=9db3ef1e0eb1302b52edf03773eaebd3` + `&page=${newpag}`)
            .then(res => res.json())
            .then(data => this.setState({ datos: datos.concat(data.results), backup: datos.concat(data.results), pag: newpag }))
            .catch(error => console.log(error));
    }

    function filtrarPeliculas(Pelicula) {
        const peliculas = backup.filter((i) => i.title.toLowerCase().includes(Pelicula.toLowerCase()))
        setDatos(peliculas)
    }

        return (
        <React.Fragment>
            <BuscadorFiltro filter={(input) => this.filtrarPeliculas(input)} />
            <h2 className="todaspelis">Todas las películas</h2>
            {cargados == false ?
                <h3>Cargando...</h3> :
                datos.length === 0 ?
                <p className="noresult">No hay resultados para su busqueda</p> :
                <div>
                <section className="row cards" id="movies">
                    {datos.map((pelicula, id) => (
                    <Card 
                        type="movie"
                        titulo={pelicula.title}
                        key={pelicula.id}
                        id={pelicula.id}
                        imagen={pelicula.poster_path}
                        descripcion={pelicula.overview} />
                    ))}
                </section>
                <button className="cargarmas" onClick={cargarMas}>Cargar más</button>
                </div>
            }
        </React.Fragment>
        )
}

export default Peliculas;

