import React, { Component } from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
class Detalle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: null,
            estadoFavoritos: false,
            valor: "🩶",
            logi: false,
        };
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=9db3ef1e0eb1302b52edf03773eaebd3`)
            .then(res => res.json())
            .then(data => this.setState({ datos: data }))
            .catch(error => console.log(error));
        let storage = localStorage.getItem("movie")
        let storageJson = JSON.parse(storage)
        if (storageJson !== null) {
            let esFavorito = storageJson.filter(id => id === this.props.match.params.id).length > 0
            if (esFavorito) {
                this.setState({ estadoFavoritos: true, valor: "♥️" })
            }
        }
        this.verificar()
    }

    verificar() {
        let logeado = cookies.get('userEmail')

        if (logeado != null) {
            this.setState({ logi: true })
        } else {
            this.setState({ logi: false })
        }
        console.log(logeado);
        console.log(this.state);
    }



    agregarfav(id) {
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
        this.setState({ estadoFavoritos: true, valor: "♥️" })
    }

    Eliminar(id) {
        let listFav = localStorage.getItem("movie")
        let listFavJson = JSON.parse(listFav)
        let nuevaListFav = listFavJson.filter((i) => i !== id)
        let newListFavJson = JSON.stringify(nuevaListFav)
        localStorage.setItem("movie", newListFavJson)
        this.setState({ valor: "🩶", estadoFavoritos: false })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.datos == null ?
                    <h3>Cargando...</h3> :
                    <div>
                        <h2 className="alert alert-primary">{this.state.datos.title}</h2>
                        <section className="detalles">
                            <section className="col-md-6 info">
                                <h3>Descripción</h3>
                                <p className="description">{this.state.datos.overview}</p>
                                <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> {this.state.datos.release_date}</p>
                                <p className="mt-0 mb-0 length"><strong>Duración:</strong> {this.state.datos.runtime} minutos </p>
                                <p className="mt-0" id="votes"><strong>Puntuación:</strong> {this.state.datos.vote_average}</p>
                                <ul className="mt-0 mb-0 length"><strong>Géneros:</strong> {this.state.datos.genres.map((genero, idx) =>
                                    <li key={genero + idx}> {genero.name}</li>)}</ul>
                                <button onClick={() => this.state.estadoFavoritos === false ? this.agregarfav(this.state.datos.id) : this.Eliminar(this.state.datos.id)} value={this.props.id} className={this.state.logi ? 'favoritos' : 'card-text-hide'}>
                                    {this.state.valor}
                                </button>
                            </section>
                            <img src={`https://image.tmdb.org/t/p/w500${this.state.datos.poster_path}`} className="col-md-6" alt={this.state.datos.title} />
                        </section>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default Detalle;
