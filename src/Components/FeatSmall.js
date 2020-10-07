import React from 'react'
import thundericon from '../assets/images/thunder.png'

export default function FeatSmall() {
    return (
        <section className="section home-feature">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            {/* <!-- ***** Features Small Item Start ***** --> */}
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12"
                                data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                                <div className="features-small-item item-test-1">
                                    <div className="icon">
                                        <i><img src={thundericon} className="thunder-icon" alt="icon" /></i>
                                    </div>
                                    <h5 className="features-title"> Eficiencia </h5>
                                    <p> Eficiencia al máximo para la completa satisfacción de nuestros clientes.</p>
                                </div>
                            </div>
                            {/* <!-- ***** Features Small Item End ***** --> */}

                            {/* <!-- ***** Features Small Item Start ***** --> */}
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12"
                                data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s">
                                <div className="features-small-item item-test-2">
                                    <div className="icon">
                                        <i><img src="https://img.icons8.com/fluent/48/000000/exercise.png" alt="exercise" /></i>
                                    </div>
                                    <h5 className="features-title"> Rapidez </h5>
                                    <p> Los mejores y mas rápidos tiempos de boosting para nuestros clientes. </p>
                                </div>
                            </div>
                            {/* <!-- ***** Features Small Item End ***** --> */}

                            {/* <!-- ***** Features Small Item Start ***** --> */}
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12"
                                data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s">
                                <div className="features-small-item item-test-3">
                                    <div className="icon">
                                        <i><img src="https://img.icons8.com/fluent/48/000000/guarantee.png" alt="guarantee" /></i>
                                    </div>
                                    <h5 className="features-title"> Calidad </h5>
                                    <p> Contamos con boosters de alto nivel en el mercado del boosting profesional. </p>
                                </div>
                            </div>
                            {/* <!-- ***** Features Small Item End ***** --> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
