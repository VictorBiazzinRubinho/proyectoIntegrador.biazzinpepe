import Login from "../../screens/Login/Login";


function Navbar(props){
    let unMenu = ["Home", "Películas", "Series",  
    ];
    return(
        <nav>
            <ul className="nav nav-tabs my-4">
                {
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Home</a>
                </li>   
                }
            </ul>
            <Login/>
        </nav>
    );
};

export default Navbar;