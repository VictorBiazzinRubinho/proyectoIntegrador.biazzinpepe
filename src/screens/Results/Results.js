import React, { useState, useEffect } from 'react';
import Busqueda from '../../components/Busqueda/Busqueda';
import Card from '../../components/Card/Card';

function Results(props) {

    const [datos, setDatos] = setState([])

    const [cargados, setCargados] = setState(false)

    useEffect(
        () => {
        fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-ES&page=1&api_key=9db3ef1e0eb1302b52edf03773eaebd3&query=${props.match.params.buscado}`)
            .then(res => res.json())
            .then(data => { setDatos (data.results)
                            setCargados(true)
        })
            .catch(error => console.log(error))
    }, [] 
    )

        return(
            <React.Fragment>
                {(cargados == false) ?
                    <h3>Cargando...</h3> :
                    (datos.length == 0) ?
                    <p className="noresult">No se encontraron resultados para su busqueda</p> :
                    <React.Fragment>
                        <h2 className="alert alert-warning">Resultados</h2>
                        <section className="row cards">
                            {datos.map((elemento) => (
                                <Card
                                    key={elemento.id}
                                    titulo={elemento.title}
                                    id={elemento.id}
                                    type="movie"
                                    imagen={`https://image.tmdb.org/t/p/w500${elemento.poster_path}`}
                                    descripcion={elemento.overview}
                                />
                            ))}
                        </section>
                    </React.Fragment>
                }
            </React.Fragment>
        )
}

export default Results;