import React, { Component } from 'react';
import Busqueda from '../../components/Busqueda/Busqueda';
import Card from '../../components/Card/Card';

class Results extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: [],
            cargados: false,
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-ES&page=1&api_key=9db3ef1e0eb1302b52edf03773eaebd3&query=${this.props.match.params.buscado}`)
            .then(res => res.json())
            .then(data => this.setState ({datos: data.results, cargados: true}))
            .catch(error => console.log(error))
    }

    render(){
        return(
            <React.Fragment>
                {(this.state.cargados == false) ?
                    <h3>Cargando...</h3> :
                    (this.state.datos.length == 0) ?
                    <p className="noresult">No se encontraron resultados para su busqueda</p> :
                    <React.Fragment>
                        <h2 className="alert alert-warning">Resultados</h2>
                        <section className="row cards">
                            {this.state.datos.map((elemento) => (
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
}

export default Results;