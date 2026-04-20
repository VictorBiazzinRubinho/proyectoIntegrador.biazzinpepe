import React, { Component } from 'react';
import Busqueda from '../../components/Busqueda/Busqueda';

class NotFound extends Component {
    render (){
        return(
            <React.Fragment>
                <Busqueda/>
                <div>Notfound</div>
            </React.Fragment>
        )
    }
}

export default NotFound;