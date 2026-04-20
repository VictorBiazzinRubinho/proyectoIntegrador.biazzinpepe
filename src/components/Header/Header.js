import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'universal-cookie';

const cookies = new Cookies()
class Header extends Component {
    constructor(props){
        super(props)
            this.state = {
                valor : false
            }
        }

        componentDidMount(){
            this.verificar()
        }

        verificar(){
            let logeado = cookies.get('userEmail')
            
            if (logeado != null){
                this.setState({valor : true})
            } else {
                this.setState({valor : false})
            }
            console.log(logeado);
            console.log(this.state);
        }
        render(){
            return(
                <header>
                    <div className="container">
                        <h1>UdeSA Movies</h1>
                        <img className="logov" src="/img/logov.jpeg" alt="logo V"/>
                    </div>
                    <div>
                        <nav>
                            <ul className="nav nav-tabs my-4">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Peliculas" className="nav-link">Películas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Favoritas" className="nav-link">Favoritas</Link>
                                </li>
                                <li className="nav-item ml-auto">
                                    <Link to="/Register" className="nav-link">Registro</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Login" className="nav-link">Login</Link>
                                </li>
                            </ul>   
                        </nav>
                    </div>
                </header>
                )
            }
}

export default Header;