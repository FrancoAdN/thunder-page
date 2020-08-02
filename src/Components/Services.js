import React, { useState } from 'react'
// import Popup from './Popup/Popup'
export default function Services() {
    const [pop, setPop] = useState(false)
    return (
        <section className="mini" id="services">
            {/* <Popup open={pop} setOpen={setPop} /> */}
            <div className="mini-content">
                <div className="container">
                    <div className="row">
                        <div className="offset-lg-3 col-lg-6">
                            <div className="info">
                                <h1> Nuestros servicios </h1>
                                <p> Contamos con distintos tipos de boosting para la satisfaccion de nuestros clientes,
                                brindando la mejor experiencia de eloboost.
                                Tu liga deseada esta solo a un click de distancia. </p>
                            </div>
                        </div>
                    </div>
                    <div className="circle">
                        <div className="icon">
                            <i>POPULAR</i>
                        </div>
                    </div>

                    <div className="circle2">
                        <div className="icon">
                            <i>NUEVO</i>
                        </div>
                    </div>
                    <main className="page-content">
                        <div className="card">
                            <div className="content">
                                <h2 className="title">Boosting Solo/Duo Queue</h2>
                                <p className="copy">Solo tienes que elegir la liga en la que quieres estar y el resto lo hacemos
                                nosotros.</p>
                                <button className="btn"> ¡Contratar! </button>
                            </div>
                        </div>
                        <div className="card">
                            <div className="content">
                                <h2 className="title">Boost Solo/Duo Promotion</h2>
                                <p className="copy"> Si te encuentras a solo un paso de avanzar de liga, esta asegura la
                                victoria de su promocion. </p>
                                <button className="btn" onClick={() => setPop(true)}> ¡Contratar! </button>
                            </div>
                        </div>
                        <div className="card">
                            <div className="content">
                                <h2 className="title">Boost Solo/Duo Victory Wins</h2>
                                <p className="copy"> Si lo que necesitas es solo acumular una cantidad de victorias, esta opción
                                es para ti!</p>
                                <button className="btn" onClick={() => setPop(true)}> ¡Contratar! </button>
                            </div>
                        </div>
                        <div className="card">
                            <div className="content">
                                <h2 className="title">Boosting Flex (5v5) Queue</h2>
                                <p className="copy"> Solo tienes que elegir la liga en la que quieres estar y el resto lo
                                hacemos nosotros. </p>
                                <button className="btn" onClick={() => setPop(true)}> ¡Contratar! </button>
                            </div>
                        </div>
                    </main>

                    {/* <!-- ***** Mini Box End ***** --> */}
                </div>
                <div className="wave">
                    <svg width="100%" height="355px" viewBox="0 0 1920 355" version="1.1" xmlns="http://www.w3.org/2000/svg"
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
