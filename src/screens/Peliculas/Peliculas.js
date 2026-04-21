import React, { Component } from 'react'
import BuscadorFiltro from '../../components/BuscadorFiltro/BuscadorFiltro'
import Card from '../../components/Card/Card'

class Peliculas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: [],
            pag: 1,
            cargados: false
        };
    }
    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc` + `&api_key=9db3ef1e0eb1302b52edf03773eaebd3`)
            .then(res => res.json())
            .then(data => this.setState({ datos: data.results, backup: data.results, cargados: true }))
            .catch(error => console.log(error));
    }

    cargarMas = () => {
        let newpag = this.state.pag + 1
        fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=9db3ef1e0eb1302b52edf03773eaebd3` + `&page=${newpag}`)
            .then(res => res.json())
            .then(data => this.setState({ datos: this.state.datos.concat(data.results), backup: this.state.datos.concat(data.results), pag: newpag }))
            .catch(error => console.log(error));
    }

    filtrarPeliculas(Pelicula) {
        const peliculas = this.state.backup.filter((i) => i.title.toLowerCase().includes(Pelicula.toLowerCase()))
        this.setState({
            datos: peliculas
        })
    }

    render() {
        return (
        <React.Fragment>
            <BuscadorFiltro filter={(input) => this.filtrarPeliculas(input)} />
            <h2 className="todaspelis">Todas las películas</h2>
            {this.state.cargados == false ?
                <h3>Cargando...</h3> :
                this.state.datos.length === 0 ?
                <p className="noresult">No hay resultados para su busqueda</p> :
                <div>
                <section className="row cards" id="movies">
                    {this.state.datos.map((pelicula, id) => (
                    <Card 
                        type="movie"
                        titulo={pelicula.title}
                        key={pelicula.id}
                        id={pelicula.id}
                        imagen={pelicula.poster_path}
                        descripcion={pelicula.overview} />
                    ))}
                </section>
                <button className="cargarmas" onClick={this.cargarMas}>Cargar más</button>
                </div>
            }
        </React.Fragment>
        )
    }
}

export default Peliculas;

