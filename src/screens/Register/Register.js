import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    registro() {
        console.log(this.state.email);
        console.log(this.state.password);

        let usuarioACrear = {
            email: this.state.email,
            password: this.state.password,
            createdAt: Date.now(),
        }

        if (usuarioACrear.password.length < 6) {
            alert('Minimo de 6 caracteres la contraseña')
            return
        }

        let usersStorage = localStorage.getItem('users')
        if (usersStorage != null) {
            let usersParseado = JSON.parse(usersStorage)


            let usersFiltrados = usersParseado.filter(function (user) {
                return user.email == usuarioACrear.email;
            })

            if (usersFiltrados.length == 0) {
                usersParseado.push(usuarioACrear);
                let usersEnJson = JSON.stringify(usersParseado);
                localStorage.setItem('users', usersEnJson);

            } else {
                alert('ya tiene el mail en uso')
                return
            }

        } else {
            let usersInicial = [usuarioACrear]
            let usersEnJson = JSON.stringify(usersInicial)
            localStorage.setItem('users', usersEnJson);
        }
        this.props.history.push('/Login')
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="alert alert-primary">Registro</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={(e) => { e.preventDefault(); this.registro() }}>
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input onChange={(e) => this.setState({ email: e.target.value })} type="email" className="form-control" id="email" placeholder="Ingresá tu email" />
                            </div>
                            <div className="form-group">
                                <label for="password">Contraseña</label>
                                <input onChange={(e) => this.setState({ password: e.target.value })} type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                        </form>
                        <p className="mt-3 text-center">¿Ya tenés cuenta? <Link to="/Login">Iniciar Sesion</Link></p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Register);