import React from 'react'
import { Link } from 'react-router-dom'
import banner from '../assets/images/banner.gif'

export default function Welcome() {
    return (
        <div className="welcome-area" id="welcome">
            {/* <!--
                <canvas id="canvas"></canvas>
                -->
                <!-- ***** Header Text Start ***** --> */}
            <div className="header-text">
                <div className="container">
                    <div className="row">
                        <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
                            <h1> El eloboost mas <strong> confiable </strong><br /> y rápido de <strong>
                                latinoamérica</strong></h1>
                            <p> Proporcionamos el mejor servicio de eloboost y coaching a nuestros clientes, brindando alta
                            calidad y rendimiento
                            en el desempeño de nuestros boosters. </p>
                            <Link to={"/boost"}>
                            <a href="" className="main-button-slider"> ¡Contratar! </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- ***** Header Text End ***** --> */}
        </div>

    )
}
