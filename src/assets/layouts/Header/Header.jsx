import { Link } from 'react-router-dom';

import Logo from '../../img/marvel-logo.png';
import './Header.css';

export default function Header () {
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/">
                    <img className="logo-header" src={Logo} alt="Logo Marvel" />
                </Link>
            </div>
            <nav className="menu">
                <Link to="/comics">Comics</Link>
                <Link to="/characters">Personnages</Link>
                <Link to="/favoris">Favoris</Link>
            </nav>
        </header>
        
    )
};