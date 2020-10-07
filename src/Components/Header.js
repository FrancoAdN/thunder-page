import React from 'react'
import logo from '../assets/images/logo-rec.png'
export default function Header() {
    return (
        <header className="header-area header-sticky">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="main-nav">
                            {/* <!-- ***** Logo Start ***** --> */}
                            <a href="https://thunderboosting.com/" className="logo">
                                <img src={logo} alt="" className="logo" />
                            </a>
                            {/* <!-- ***** Logo End ***** --> */}
                            {/* <!-- ***** Menu Start ***** --> */}
                            <ul className="nav">
                                <li><a href="https://thunderboosting.com/" className="active">Inicio</a></li>
                                <li><a href="#features"> Nosotros </a></li>
                                <li><a href="#services"> Servicios </a></li>
                                <li><a href="#procces"> Proceso </a></li>
                                <li><a href="#valorant"> Valorant </a></li>
                            </ul>
                            <a className='menu-trigger'>
                                <span>Menu</span>
                            </a>
                            {/* <!-- ***** Menu End ***** --> */}
                        </nav>
                    </div>
                </div>
            </div>
        </header>

    )
}
