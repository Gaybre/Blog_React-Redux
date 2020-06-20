import React from 'react'   
import '../css/menu.css'
import { Link } from 'react-router-dom'
import Logo from '../img/myLogo.png'

const Menu = () => (
    <nav id="menu">
        <img src={ Logo } alt="logo" className="icon" />
        <div>
            <Link to="/" className="enlace">
                Usuarios
            </Link>
            <Link to="/tareas" className="enlace">
                Tareas
            </Link>
        </div>
    </nav>
)

export default Menu