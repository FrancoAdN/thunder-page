import React, { useState, useEffect, useContext, useRef } from 'react'
import { prov } from './_useHook'
import Header from './Header'
// import './style2.css'
import './style3.css'
// import thunder from './thunder.png'
import payments from './payments.png'
import payments2 from './payments2.png'
import brubank from './payments-img/brubank.png'
import rapipago from './payments-img/rapipago.png'

export default function StepTwo() {
    const [cont, setCont] = useState('hidden')

    const [imgfrom, setImgfrom] = useState(require('./ranks-lol/9.png'))
    const [namefrom, setNamefrom] = useState('')
    const [imgto, setImgto] = useState(require('./ranks-lol/9.png'))
    const [nameto, setNameto] = useState('')




    const {
        //step 1
        price, days, fromRank, toRank, divFromRef, divToRef,
        //step 2
        summoners, setSummoners, username, setUsername, password, setPassword,
        email, setEmail, cemail, setCemail, ref, setRef, message, setMessage,
        fetchInformation
    } = useContext(prov)

    function romanize(num) {
        if (num === "1") return 'I'
        else if (num === "2") return 'II'
        else if (num === "3") return 'III'
        return 'IV'
    }

    useEffect(() => {
        // console.log(price, days, fromRank, toRank, divFromRef.current, divToRef.current)
        // switch (fromRank) {
        //     case 'Iron':
        //         imgFrom.current = require('./ranks-lol/9.png')
        //         break
        // }

        divFromRef.current = romanize("3")
        divToRef.current = romanize("4")

        switch (fromRank) {
            case 'Iron':
                setNamefrom(`${fromRank} ${divFromRef.current}`)
                setImgfrom(require('./ranks-lol/9.png'))
                break
            case 'Bronze':
                setNamefrom(`${fromRank} ${divFromRef.current}`)
                setImgfrom(require('./ranks-lol/8.png'))
                break
            case 'Silver':
                setNamefrom(`${fromRank} ${divFromRef.current}`)
                setImgfrom(require('./ranks-lol/7.png'))
                break
            case 'Gold':
                setNamefrom(`${fromRank} ${divFromRef.current}`)
                setImgfrom(require('./ranks-lol/6.png'))
                break
            case 'Platinium':
                setNamefrom(`${fromRank} ${divFromRef.current}`)
                setImgfrom(require('./ranks-lol/5.png'))
                break
            case 'Diamond':
                setNamefrom(`${fromRank} ${divFromRef.current}`)
                setImgfrom(require('./ranks-lol/4.png'))
                break
            case 'Master':
                setNamefrom(`${fromRank}`)
                setImgfrom(require('./ranks-lol/3.png'))
                break
            case 'Grand Master':
                setNamefrom(`${fromRank}`)
                setImgfrom(require('./ranks-lol/2.png'))
                break
            case 'Challenger':
                setNamefrom(`${fromRank}`)
                setImgfrom(require('./ranks-lol/1.png'))
                break

        }

        switch (toRank) {
            case 'Iron':
                setNameto(`${toRank} ${divToRef.current}`)
                setImgto(require('./ranks-lol/9.png'))
                break
            case 'Bronze':
                setNameto(`${toRank} ${divToRef.current}`)
                setImgto(require('./ranks-lol/8.png'))
                break
            case 'Silver':
                setNameto(`${toRank} ${divToRef.current}`)
                setImgto(require('./ranks-lol/7.png'))
                break
            case 'Gold':
                setNameto(`${toRank} ${divToRef.current}`)
                setImgto(require('./ranks-lol/6.png'))
                break
            case 'Platinium':
                setNameto(`${toRank} ${divToRef.current}`)
                setImgto(require('./ranks-lol/5.png'))
                break
            case 'Diamond':
                setNameto(`${toRank} ${divToRef.current}`)
                setImgto(require('./ranks-lol/4.png'))
                break
            case 'Master':
                setNameto(`${toRank}`)
                setImgto(require('./ranks-lol/3.png'))
                break
            case 'Grand Master':
                setNameto(`${toRank}`)
                setImgto(require('./ranks-lol/2.png'))
                break
            case 'Challenger':
                setNameto(`${toRank}`)
                setImgto(require('./ranks-lol/1.png'))
                break

        }


    }, [])


    const formSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
    }

    return (
        <div className="form-popup">
            <div className="container form-wrapper">
                <Header title="2. PAGOS E INFORMACIÓN" />

                <form className="main-section" onSubmit={formSubmit}>
                    <div className="main-section-head">
                        <h1 className="title text-center"> DATOS DE CONTACTO </h1>
                        <p className="sub-title text-center"> Completa los siguientes campos para poder empezar tu orden.
                        <br /> Te estaremos contactando en el proceso. </p>
                    </div>
                    <div className="info-card">
                        <div className="info-container">
                            <div className="name">
                                <label > Nombre del invocador </label> <br /> <input required type="text" value={summoners} onChange={(e) => setSummoners(e.target.value)} />
                            </div>
                            <div className="user">
                                <label > Usuario </label> <br /> <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="pass">
                                <label > Contraseña </label> <br /> <input required type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="email">
                                <label className="" > Email </label> <br /> <input required className="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="cemail">
                                <label className="" > Confirmar email </label> <br /> <input required className="email" type="email" value={cemail} onChange={(e) => setCemail(e.target.value)} />
                            </div>
                            <div className="ref">
                                <label className="" > Referido </label> <br /> <input required className="email" type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
                            </div>
                            <div className="contact">
                                <label > Mensaje de contacto (Opcional) </label> <br /> <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                            </div>
                            <p className="opc-pago"> OPCIONES DE PAGO </p>
                            <hr />
                            <img alt="" className="payments" src={payments} />
                            <img alt="" className="payments2" src={payments2} />
                            <img alt="" className="brubank" src={brubank} />
                            <img alt="" className="rapipago" src={rapipago} />
                        </div>
                    </div>
                    <div className="card6">
                        <p className="card-title2"> DETALLES </p>
                        <hr />
                        <div className="info-rank">
                            <div className="actual">
                                <p className="info-rank-p text-center"> DESDE </p>
                                <p className="text-center"> {namefrom} </p>
                                <img alt="" className="" src={imgfrom} />
                            </div>
                            <div className="proximo">
                                <p className="info-rank-p text-center"> HASTA </p>
                                <p className="text-center"> {nameto} </p>
                                <img alt="" className="" src={imgto} />
                            </div>
                        </div>
                        <hr />
                        <div className="price">
                            <p className="price-a"> PRECIO TOTAL </p>
                            {/* <p className="price-b"> <del> ${price + (price * 0.2)} ARS </del> </p> */}
                            {price ? <p className="price-b"> <del> ${price + (price * 0.2)} ARS </del> </p> : <p></p>}
                            <p className="price-c"> ${price} ARS </p>
                            <hr />
                            <div className="time">
                                <p className="time-a"> TIEMPO <br /> ESTIMADO </p>
                                <p className="time-b"> {days} DÍAS</p>
                            </div>

                            <button className="pay" type="submit">
                                <p className="button-pay text-center"> CONFIRMAR </p>
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
