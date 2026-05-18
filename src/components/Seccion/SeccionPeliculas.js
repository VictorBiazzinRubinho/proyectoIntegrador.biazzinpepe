import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import Card from "../Card/Card"; 

function SeccionPeliculas(props) { 

    const [datos, setDatos] = useState([])

    useEffect(
        () => { 
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=9db3ef1e0eb1302b52edf03773eaebd3') 
            .then(res => res.json()) 
            .then(data => setDatos(data.results)) 
            .catch(error => console.log(error)); 
        }, []
    )
     
        return ( 
            <React.Fragment> 
               {datos.length === 0 ? 
               <h3>Cargando...</h3> : 
               <section className="cards" id="movies"> 
                    {datos.filter((pelicula, idx) => idx<4).map((pelicula) => ( 
                        <Card 
                            type="movie" 
                            titulo={pelicula.title} 
                            id={pelicula.id} 
                            imagen={pelicula.poster_path} 
                            descripcion={pelicula.overview} 
                        />
                    ))}
                    <Link to="/Peliculas" className="verMasBotao">Ver todas las películas</Link> 
               </section>
               }
            </React.Fragment>
        )
    
}

export default SeccionPeliculas; 