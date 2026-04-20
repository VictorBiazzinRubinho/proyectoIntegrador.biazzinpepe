import React, { Component } from 'react';
import Card from '../Card/Card';

class FavMovies extends Component {
    constructor(){
        super()
        this.state = {
            todosdatos: [],
            cargados: false,
        }
    }

    componentDidMount(){
        let listFav = localStorage.getItem("movie")
        console.log(listFav);
        let listFavJson = JSON.parse(listFav);
        console.log('listFavJSON movies', listFavJson);

        if (listFavJson === null || listFavJson.length === 0) {
            this.setState({cargados: false})
        } else {
            const favsRecuperados = []
            listFavJson.map((i) =>
            fetch(`https://api.themovie.org/3/movie/${i}?api_key=9db3ef1e0eb1302b52edf03773eaebd3`)
              .then(res => res.json())
              .then(data => {
                favsRecuperados.push(data)
                this.setState({todosdatos:favsRecuperados, cargados: true})
              })
              .catch(error => console.log(error))
            )
        }
    }

    render(){
        return(
            <React.Fragment>
                <h2 className="alert alert-primary">Películas Favoritas</h2>
                <div>
                    <section className="row cards" id="movie">
                        {this.state.cargados == false ?
                            <p className="noresult">No hay películas guardadas</p>
                            : this.state.todosdatos.length == 0 ?
                            <p>Cargando</p>
                            : this.state.todosdatos.map((peliculas, id) => (
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
}

export default FavMovies;