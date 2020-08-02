import React from 'react'
import video from '../assets/images/test.webm'
export default function FeatItem() {
    return (
        <section className="section padding-bottom-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-bottom-fix">
                        <div className="left-heading">
                            <h2 className="section-title"> Nuestro roster profesional de eloboosters </h2>
                        </div>
                        <div className="left-text">
                            <p> En Thunder contamos con un gran numero de boosters experimentados en el mercado,
                            del boosting los cuales cuentan con <span className="mark">una amplia trayectoria</span>. Se
                            realizaron distintos
                            estudios e investigaciones de las estadisticas de los mismos, comprobando su <span
                                    className="mark">habilidad
                                y rendimiento</span> en el juego cumpliendo los requisitos para ser boosters de Thunder.
                            <br />
                            Agregado a esto,buscamos que nuestros boosters ya hayan tenido una previa experiencia
                            en el boosting. La calidad, eficiencia y rapidez de nuestros boosters nos diferencia
                            de los demas a un <span className="mark">nivel superior</span>.
                        </p>
                        </div>
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-5 col-md-12 col-sm-12 align-self-center mobile-bottom-fix-big"
                        data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                        <video src={video} type="video/webm" autoPlay controls className="vid-post rounded" alt="" />
                    </div>
                </div>
            </div>
        </section>

    )
}
