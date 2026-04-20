import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import Cookies from 'universal-cookie'

const cookies = new Cookies()
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };
    }

    login() {
        let usuarioALogear = {
            email: this.state.email,
            password: this.state.password
        }

        if (usuarioALogear.password.length < 6) {
            alert('Minimo de 6 caracteres la contraseña')
            return
        }

        let usersStorage = localStorage.getItem('users');
        let usuariosParseados = JSON.parse(usersStorage);

        let usuariosFiltrados = usuariosParseados.filter(function (user) {
            return user.email == usuarioALogear.email;
        })
        console.log(usuariosFiltrados);

        if (usuariosFiltrados[0].password == usuarioALogear.password) {
            cookies.set('userEmail', usuarioALogear.email)
            cookies.set('userPassword', usuarioALogear.password)

        } else if (usuariosFiltrados.password != usuarioALogear.password) {
            alert('Credenciales incorrectas')
            return
        }
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="alert alert-primary">Iniciar sesión</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={(e) => { e.preventDefault(); this.login() }}>
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input onChange={(e) => this.setState({ email: e.target.value })} type="email" className="form-control" id="email" placeholder="Ingresá tu email" />
                            </div>
                            <div className="form-group">
                                <label for="password">Contraseña</label>
                                <input onChange={(e) => this.setState({ password: e.target.value })} type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                        </form>
                        <p className="mt-3 text-center">¿No tenés cuenta? <Link to="/Register">Registrarse</Link></p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Login);
