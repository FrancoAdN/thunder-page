import React from 'react'

export default function Valorant() {
    return (
        <section className="mini2" id="valorant">
            <div className="mini2-content">
                <div className="container">
                    <div className="row">
                        <div className="offset-lg-3 col-lg-6">
                            <div className="info">
                                <h1> Nuevos servicios </h1>
                                <p> Debido a la creciente demanda de los mismos, hemos implementado dos nuevos servicios
                                para
                                satisfacer a nuestros clientes en otros ambitos del boosting. </p>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            {/* <!-- card1 --> */}
                            <div className="card2-circle">
                                <div className="card2-icon">
                                    <i className="fas fa-apple-alt"></i>
                                </div>
                                <div className="card2-body">
                                    <h5 className="card2-title">Valorant Coaching</h5>
                                    <p className="card2-text">Te brindamos ayuda y consejos para mejorar tu experiencia de
                                    juego.</p>
                                    <button className="btn btn-primary">¡Proximamente!</button>
                                </div>
                            </div>
                            {/* <!-- card2 --> */}
                            <div className=" card2-circle">
                                <div className="card2-icon">
                                    <i className="fas fa-cookie"></i>
                                </div>
                                <div className="card2-body">
                                    <h5 className="card2-title">Valorant Boosting</h5>
                                    <p className="card2-text">Nos encargamos de alcanzar tu rango deseado y mejorar tus
                                    estadisticas.</p>
                                    <button className="btn btn-primary">¡Proximamente!</button>
                                </div>
                            </div>
                            {/* <!-- card3 --> */}
                            <div className=" card2-circle ">
                                <div className="card2-icon">
                                    <i className="fas fa-carrot"></i>
                                </div>
                                <div className="card2-body">
                                    <h5 className="card2-title">Valorant Training</h5>
                                    <p className="card2-text">Te brindamos distintas tecnicas y entrenamientos diarios para dar
                                    tu 100%.</p>
                                    <button className="btn btn-primary">¡Proximamente!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- ***** Mini Box End ***** --> */}
                </div>
                <div className="wave">
                    <svg width="100%" height="350px" viewBox="0 0 1920 355" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Apple-TV" transform="translate(0.000000, -402.000000)" fill="#FFFFFF">
                                <path
                                    d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,757 L1017.15166,757 L0,757 L0,439.134243 Z"
                                    id="Path"></path>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </section>

    )
}
