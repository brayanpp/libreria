import React from 'react';
import { NavLink} from 'react-router-dom';
import logo from '../assets/images/logo.svg';


const Header = () => {
    return (
        <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className='container'>
                <NavLink to="" className="navbar-brand">
                    <img className='App-logo' src={logo} alt="logo" width={80} />
                </NavLink>
                
                <ul className='navbar-nav'>
                    <li className="nav-item">
                        <NavLink to="/books" className="nav-link">Inventario Libros</NavLink>
                    </li>
                    <li className='nabvar-nav'>
                        <NavLink to="/sales" className="nav-link">Ventas</NavLink>
                    </li>
                </ul>

                
            </div>

        </nav>
    );
}


export default Header