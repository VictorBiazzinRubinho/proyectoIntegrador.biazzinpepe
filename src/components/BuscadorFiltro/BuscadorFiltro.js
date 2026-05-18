import React, { useState } from 'react'; 

function BuscadorFiltro(props) { 

    const [valor, setValor] = useState("")

    function evitarSubmit(event){ 
        event.preventDefault(); 
    }

    function guardarCambios(event){ 
        setValor(event.target.value), 
        () => props.filter(valor) 
    } 
    return(
            <form onSubmit={(event) => evitarSubmit(event)} className="search-form"> 
                <input type="text" onChange={(event) => guardarCambios(event)} value={valor} placeholder="Buscar películas..."></input> 
                <button type="submit" className="btn-sm">Buscar</button> 
            </form>
        )
}

export default BuscadorFiltro; 
