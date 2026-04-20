import React, { Component } from 'react';
import Busqueda from '../../components/Busqueda/Busqueda';
import SeccionPeliculas from '../../components/Seccion/SeccionPeliculas';


class Home extends Component {
    render(){
        return(
            <>
              <Busqueda/>
              <h2 className="subtitulo">Popular movies this week</h2>
              <SeccionPeliculas/>
            </> 
      );
    }  
}

export default Home;