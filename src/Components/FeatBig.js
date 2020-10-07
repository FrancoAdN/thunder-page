import React from 'react'
import logo from '../assets/images/ppp.png'

export default function FeatBig() {
    return (
        <section className="section padding-top-70 padding-bottom-0" id="features">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-12 col-sm-12 align-self-center"
                        data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                        <img src={logo} className="feature-img rounded d-block mx-auto" alt="App" />
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix">
                        <div className="left-heading">
                            <h2 className="section-title"> ¿Por qué tienes que elegirnos a nosotros? </h2>
                        </div>
                        <div className="left-text">
                            <p> En Thunder nos enfocamos en <span className="mark">mejorar la experiencia del jugador</span>,
                            brindándole distintos consejos y estrategias incluidas
                            en el boost a nuestros clientes haciendo que los mismos puedan mejorar su jugabilidad y dar
                            un mayor rendimiento en las ligas que se
                            propongan alcanzar. Nuestro servicio se destaca por la <span className="mark">rapidez y la
                                eficiencia</span> que consiguen nuestros boosters
                            después de años de experiencia en el mercado.
                        </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="hr"></div>
                    </div>
                </div>
            </div>
        </section>

    )
}
