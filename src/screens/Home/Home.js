import React from 'react';
import Busqueda from '../../components/Busqueda/Busqueda';
import SeccionPeliculas from '../../components/Seccion/SeccionPeliculas';

function Home() {
        return(
            <>
              <Busqueda/>
              <h2 className="subtitulo">Popular movies this week</h2>
              <SeccionPeliculas/>
            </> 
      );  
}

export default Home;