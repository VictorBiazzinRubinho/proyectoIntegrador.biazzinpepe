import React, { Component } from 'react';
import FavMovies from '../../components/FavMovies/FavMovies';

class Favoritas extends Component {
    constructor(){
        super()
        this.state = {
            todosdatos: []
        }
    }

    render (){
        return (
            <React.Fragment>
                <FavMovies/>
            </React.Fragment>
        )
    }
}

export default Favoritas;