import React, { Component } from 'react';

class BuscadorFiltro extends Component {
    constructor(props){
        super(props)
        this.state={
            valor: []
        }
    }

    evitarSubmit(event){
        event.preventDefault();
    }

    guardarCambios(event){
        this.setState({
            valor: event.target.value
        }, () => this.props.filter(this.state.valor))
    }

    render(){
        return(
            <form onSubmit={(event) => this.evitarSubmit(event)} className="search-form">
                <input type="text" onChange={(event) => this.guardarCambios(event)} value={this.state.valor}></input>
                <button type="submit" className="btn-sm">Buscar</button>
            </form>
        )
    }
}

export default BuscadorFiltro;