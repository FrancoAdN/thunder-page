import React from 'react'

export default function Counter() {
    return (
        <section className="counter-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="single-counter">
                            <h1 className="counter">17</h1>
                            <p> Nuevos clientes </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-counter">
                            <h1 className="counter">50</h1>
                            <p> Boostings realizados </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-counter">
                            <h1 className="counter">5</h1>
                            <p> Coaching realizados </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-counter">
                            <h1 className="counter">100%</h1>
                            <p> Clientes satisfechos </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
