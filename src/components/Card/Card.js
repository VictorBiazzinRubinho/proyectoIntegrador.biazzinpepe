import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies()
class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            estadoFavoritos: false,
            valor: "🤍",
            verMas: true,
            logi: false,
        }
    }

    componentDidMount(){
        let storage = localStorage.getItem('movie')
        let storageJson = JSON.parse(storage)

        if (storageJson !== null) {
            let esFavorito = storageJson.filter(id => id === this.props.id).length > 0
            if (esFavorito) {
                this.setState({estadoFavoritos: true, valor: "❤️"})
            }
        }
        this.verificar()
    }

    verificar(){
        let logeado = cookies.get('userEmail')

        if (logeado != null) {
            this.setState({logi: true})
        } else {
            this.setState({logi: false})
        }
        console.log(logeado);
        console.log(this.state);
    }

    agregarfav(id){
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
        this.setState({estadoFavoritos: true, valor: "❤️"})
    }

    Eliminar(id){
        let listFav = localStorage.getItem('movie')
        let listFavJson = JSON.parse(listFav)
        let nuevaListFav = listFavJson.filter((i) => i !== id)
        let newListFavJson = JSON.stringify(nuevaListFav)
        localStorage.setItem('movie', newListFavJson)
        this.setState({valor: "🤍", estadoFavoritos: false})
    }

    MostrarMas(){
        this.setState({
            verMas: true
        })
    }

    MostrarMenos(){
        this.setState({
            verMas: false
        })
    }

    render(){
        return(
            <article className="single-card-movie">
                <h5 className="card-title">{this.props.titulo}</h5>
                <div className="cardBody">
                    <img src={"https://image.tmdb.org/t/p/original/" + this.props.imagen}
                    className="card-img-top"
                    alt="..."/>
                    <button onClick={() => this.state.verMas ? this.MostrarMenos() : this.MostrarMas()}>{this.state.verMas == true ? "Mostrar descripción" : "Ocultar descripción"}</button>
                    <p className={this.state.verMas ? "card-text-hide" : "card-text-show"}>{this.props.descripcion}</p>
                    <Link to={`/Detalle/${this.props.id}`} className=" btn btn-primary">Ver más</Link>
                    <button onClick={() => this.state.estadoFavoritos == false ? this.agregarfav(this.props.id) : this.Eliminar(this.props.id)} value={this.props.id} className={this.state.logi?'favoritos':'card-text-hide'}>
                        {this.state.valor}
                    </button>
                </div>
            </article>
        )
    }
}

export default Card;