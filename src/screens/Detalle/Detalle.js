import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie'; 

const cookies = new Cookies() 
function Detalle(props) { 

    const [datos, setDatos] = useState(null)

    const [estadoFavoritos, setEstadoFavoritos] = useState(false)

    const [valor, setValor] = useState("🩶")

    const [logi, setLogi] = useState(false)

    useEffect(
        () => { 
        fetch(`https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=9db3ef1e0eb1302b52edf03773eaebd3`) 
            .then(res => res.json()) 
            .then(data => setDatos(data)) 
            .catch(error => console.log(error)); 
        let storage = localStorage.getItem("movie") 
        let storageJson = JSON.parse(storage) 
        if (storageJson !== null) { 
            let esFavorito = storageJson.filter(id => id === props.match.params.id).length > 0 
            if (esFavorito) {
                setEstadoFavoritos(true)
                setValor("♥️") 
            }
        }
        verificar() 
    }, [] 
    ) 

    function verificar() { 
        let logeado = cookies.get('userEmail') 

        if (logeado != null) { 
            setLogi(true) 
        } else { 
            setLogi(false) 
        }
        console.log(logeado); 
        console.log({datos, estadoFavoritos, valor, logi}); 
    }

    function agregarfav(id) { 
        let storage = localStorage.getItem("movie") 
        let storageJson = JSON.parse(storage) 
        if (storageJson == null) { 
            let primerValor = [id] 
            let primerString = JSON.stringify(primerValor) 
            localStorage.setItem("movie", primerString) 
        }
        else { 
            storageJson.push(id) 
            let storageString = JSON.stringify(storageJson) 
            localStorage.setItem("movie", storageString) 
        }
        setEstadoFavoritos(true)
        setValor("♥️")
    }

    function Eliminar(id) { 
        let listFav = localStorage.getItem("movie") 
        let listFavJson = JSON.parse(listFav) 
        let nuevaListFav = listFavJson.filter((i) => i !== id) 
        let newListFavJson = JSON.stringify(nuevaListFav) 
        localStorage.setItem("movie", newListFavJson) 
        setValor("🩶")
        setEstadoFavoritos(false) 
    }
 
        return ( 
            <React.Fragment> 
                {datos == null ? 
                    <h3>Cargando...</h3> : 
                    <div> 
                        <h2 className="alert alert-primary">{datos.title}</h2> 
                        <section className="detalles"> 
                            <section className="col-md-6 info"> 
                                <h3>Descripción</h3> 
                                <p className="description">{datos.overview}</p> 
                                <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> {datos.release_date}</p> 
                                <p className="mt-0 mb-0 length"><strong>Duración:</strong> {datos.runtime} minutos </p> 
                                <p className="mt-0" id="votes"><strong>Puntuación:</strong> {datos.vote_average}</p> 
                                <ul className="mt-0 mb-0 length"><strong>Géneros:</strong> {datos.genres.map((genero, idx) => 
                                    <li key={genero + idx}> {genero.name}</li>)}</ul> 
                                <button onClick={() => estadoFavoritos === false ? agregarfav(datos.id) : Eliminar(datos.id)} value={props.id} className={logi ? 'favoritos' : 'card-text-hide'}> 
                                    {valor} 
                                </button>
                            </section>
                            <img src={`https://image.tmdb.org/t/p/w500${datos.poster_path}`} className="col-md-6" alt={datos.title} /> 
                        </section>
                    </div>
                }
            </React.Fragment>
        )
}

export default Detalle; 
