import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Switch } from "react-router-dom";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import Detalle from "./screens/Detalle/Detalle";
import Favoritas from "./screens/Favoritas/Favoritas";
import Peliculas from "./screens/Peliculas/Peliculas";
import Results from "./screens/Results/Results";
import NotFound from "./screens/NotFound/NotFound";

function App() {
  return (
    <React.Fragment>
        <Header/>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/Login" component={Login}/>
          <Route path="/Register" component={Register}/>
          <Route path="/Detalle/:id" component={Detalle}/>
          <Route path="/Favoritas" component={Favoritas}/>
          <Route path="/Peliculas" component={Peliculas}/>
          <Route path="/Results/:buscado" component={Results}/>
          <Route path="" component={NotFound}/>
        </Switch>
        <Footer/>
    </React.Fragment>    
  );
}

export default App;
