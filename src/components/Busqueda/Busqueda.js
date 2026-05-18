import React, { useState } from 'react'; 
import { withRouter, Link } from 'react-router-dom/cjs/react-router-dom'; 

function Busqueda(props) {

    const [valor, setValor] = useState('')

    function evitarBusqueda(e){ 
        e.preventDefault(); 
        props.history.push('/Results/' + valor) 
    }

    function controlarCambios(e){ 
        setValor(e.target.value)
    }

    return(
            <form onSubmit={(e) => evitarBusqueda(e)} className="search-form"> 
                <input type="text" onChange={(e) => controlarCambios(e)} value={valor} name="searchData" placeholder="Buscar películas..."></input> 
                <button type="submit" className="btn-sm">Buscar</button> 
            </form>
        )
}

export default withRouter(Busqueda); 
