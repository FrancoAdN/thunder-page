import React from 'react'

export default function Counter() {
    return (
        <section className="counter-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="single-counter">
                            <h1 className="counter"> +57 </h1>
                            <p> Nuevos clientes </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-counter">
                            <h1 className="counter"> +200 </h1>
                            <p> Boostings realizados </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-counter">
                            <h1 className="counter"> +49 </h1>
                            <p> Coaching realizados </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-counter">
                            <h1 className="counter"> 98% </h1>
                            <p> Clientes satisfechos </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
