import React from 'react'

export default function Process() {
    return (
        <section className="site-section" id="procces">
            <div className="container">
                <div className="text-center">
                    <h1> Conoce nuestro proceso </h1>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="step step-test-1">
                            <span className="number">01</span>
                            <h3>Contratas nuestro servicio</h3>
                            <p> Elegis el tipo de boosting que deseas, realizas el pago y nosotros nos pondremos en contacto
                            para asesorarte.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="step">
                            <span className="number">02</span>
                            <h3>Empezamos a trabajar</h3>
                            <p> Uno de nuestros boosters te asistira en el trayecto y empezara a trabajar con tu cuenta con
                            el servicio contratado.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="step">
                            <span className="number">03</span>
                            <h3> Completamos el servicio </h3>
                            <p> Una vez terminado nuestro trabajo, tu cuenta quedara con el nivel deseado, estadisticas
                            superiores y futuros beneficios</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
