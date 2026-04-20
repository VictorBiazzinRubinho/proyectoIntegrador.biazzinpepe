import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from "../Card/Card";

class SeccionPeliculas extends Component {
    constructor(props){
        super(props)
        this.state = {
            datos: []
        };
    }
    componentDidiMount(){
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=9db3ef1e0eb1302b52edf03773eaebd3')

            .then(res => res.json())
            .then(data => this.setState({ datos: data.results }))
            .catch(error => console.log(error));
    }

    render(){
        return (
            <React.Fragment>
               {this.state.datos.length === 0 ?
               <h3>Cargando...</h3> :
                
               <section className="cards" id="movies">

                    {this.state.datos.filter((pelicula, idx) => idx<4).map((pelicula) => (
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
}

export default SeccionPeliculas;