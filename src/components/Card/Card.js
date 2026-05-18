import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import Cookies from 'universal-cookie'; 

const cookies = new Cookies() 

function Card(props) {

    const [verMas, setVerMas] = useState(false)

    const [estadoFavoritos, setEstadoFavoritos] = useState(false)

    const [valor, setValor] = useState("🤍")

    const [logi, setLogi] = useState(false)

    useEffect(
        () => { 
        let storage = localStorage.getItem('movie') 
        let storageJson = JSON.parse(storage) 
        if (storageJson !== null) {
            let esFavorito = storageJson.filter(id => id === props.id).length > 0 
            if (esFavorito) { 
                setEstadoFavoritos(true);
                setValor("❤️");
            }
        }
        verificar() 
        }, []
    )

    function verificar(){ 
        let logeado = cookies.get('userEmail') 
        if (logeado != null) {
            setLogi(true) 
        } else {
            setLogi(false)
        }
        console.log(logeado);
        console.log({verMas, estadoFavoritos, valor, logi});
    }

    function agregarfav(id){ 
        let storage = localStorage.getItem('movie')
        let storageJson = JSON.parse(storage)
        if (storageJson == null) {
            let primerValor = [id]
            let primerString = JSON.stringify(primerValor) 
            localStorage.setItem('movie', primerString)
        }
        else {
            storageJson.push(id) 
            let storageString = JSON.stringify(storageJson) 
            localStorage.setItem('movie', storageString)
        }
        setEstadoFavoritos(true)
        setValor("❤️")
    }

    function Eliminar(id){ 
        let listFav = localStorage.getItem('movie')
        let listFavJson = JSON.parse(listFav)
        let nuevaListFav = listFavJson.filter((i) => i !== id) 
        let newListFavJson = JSON.stringify(nuevaListFav) 
        localStorage.setItem('movie', newListFavJson)
        setValor("🤍")
        setEstadoFavoritos(false)
    }

    function MostrarMas(){ 
        setVerMas(true)
    }

    function MostrarMenos(){ 
        setVerMas(false)
    }

        return(
            <article className="single-card-movie">
                <h5 className="card-title">{props.titulo}</h5> 
                <div className="cardBody">
                    <img src={"https://image.tmdb.org/t/p/original/" + props.imagen}
                    className="card-img-top"
                    alt="..."/>
                        <button onClick={() => verMas ? MostrarMenos() : MostrarMas()}>{verMas == true ? "Mostrar descripción" : "Ocultar descripción"}</button> 
                    <p className={verMas ? "card-text-hide" : "card-text-show"}>{props.descripcion}</p> 
                    <Link to={`/Detalle/${props.id}`} className=" btn btn-primary">Ver más</Link>
                    <button onClick={() => estadoFavoritos == false ? agregarfav(props.id) : Eliminar(props.id)} value={props.id} className="favoritos">
                        {valor}
                    </button>
                </div>
            </article>
        )
    
}

export default Card;