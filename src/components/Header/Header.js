import Navbar from "../Navbar/Navbar";

function Header(){
    return(
        <header>
            <div className="container">
                <h1>UdeSA Movies</h1>
            </div>
            <div>
                <Navbar/>
            </div>
        </header>
    );
};

export default Header;