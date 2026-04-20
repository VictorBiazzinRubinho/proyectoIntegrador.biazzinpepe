import React, { Component } from 'react';
import Busqueda from '../../components/Busqueda/Busqueda';
import SeccionPeliculas from '../../components/Seccion/SeccionPeliculas';


class Home extends Component {
    render(){
        return(
            <body>
              <Busqueda/>
              <h2 className="subtitulo">Popular movies this week</h2>
              <SeccionPeliculas/>
            </body> 
      );
    }  
}

export default Home;