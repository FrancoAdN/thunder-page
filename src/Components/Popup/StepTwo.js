import React, { useState, useEffect, useContext } from 'react'
import { prov } from './_useHook'
import Header from './Header'
import './style.css'
import './responsive.css'
import MiniHeader from './MiniHeader'
import Payment from './Payment'
import Modal from 'react-modal'
import payments from './payments.png'
import payments2 from './payments2.png'
import brubank from './payments-img/brubank.png'
import rapipago from './payments-img/rapipago.png'
import verify from './verify.png'

export default function StepTwo({ set }) {

    const [imgfrom, setImgfrom] = useState(require('./ranks-lol/9.png'))
    const [namefrom, setNamefrom] = useState('')
    const [imgto, setImgto] = useState(require('./ranks-lol/9.png'))
    const [nameto, setNameto] = useState('')
    const [payment, setPayment] = useState(false)




    const {
        //step 1
        price, days, fromRank, toRank, divFromRef, divToRef,
        //step 2
        summoners, setSummoners, username, setUsername, password, setPassword,
        email, setEmail, cemail, setCemail, ref, setRef, message, setMessage,
        romanize
    } = useContext(prov)



    useEffect(() => {

        divFromRef.current = romanize(divFromRef.current)
        divToRef.current = romanize(divToRef.current)

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
        // set("3")
        setPayment(true)
    }

    return (

        <div>
        <Header/>
        <MiniHeader/>
        <form id="steptwo" onSubmit= {formSubmit}>
            <div id="card4" class="card4"> 
                <div class="title">
                    <h1> <span> Completar </span> con <span > sus </span> datos </h1>
                    <p> Si tienes alguna duda sobre nuestro servicio, no dudes en contactarnos por <span> <a href="https://discord.gg/CrxGDbF"> Discord.</a> </span>
                    <br/> Gracias por confiar en nosotros ;)
                    </p>
                    </div>
                    <div class="form-container" >
                        <div class="user">
                            <label > Nombre de invocador </label> <br /> <input required type="text" value={summoners} onChange={(e) => setSummoners(e.target.value)} />
                        </div>
                        <div class>
                            <label > Usuario </label> <br /> <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div class>
                            <label > Contraseña </label> <br /> <input required type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div class>
                            <label className="" > Email </label> <br /> <input required className="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div class>
                            <label className="" > Confirmar email </label> <br /> <input required className="email" type="email" value={cemail} onChange={(e) => setCemail(e.target.value)} />
                        </div>
                        <div class>
                            <label className="" > Referido </label> <br /> <input required className="email" type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
                        </div>
                        <div class="">
                            <label> Mensaje de contacto (Opcional) </label> <br /> <textarea type="text" class="form" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div class="payment-metod">
                        <div class="title">
                            <h1> Metodos de pago disponible </h1>
                            <p> Si no encuentra su metodo de pago disponible, consultenos por el mismo a traves de <span> <a href="https://discord.gg/CrxGDbF"> Discord.</a> </span>                    </p>
                        </div>
                        <div class="payment-options">
                            <p> El método de pago por defecto es con tarjeta de débito o crédito a través de nuestra plataforma. Si usted
                                desea realizar el mismo por otro medio, como <a href="">Mercado Pago</a>, <a href="https://www.paypal.com/paypalme/eloboostlat">Paypal</a> o transferencia directa a CVU <a href="">( CVU: 0000003100014410698580)</a>,
                                puedes contactarnos en nuestras redes sociales o en nuestro Discord para brindar un mejor soporte con su pago</p>
                        </div>
                    </div>
                </div>

                <div id="card5" class="card5">
                    <div class="title">
                        <h1> Resumen de compra </h1>
                        <hr />
                    </div>
                    <div class="resume">
                        <img src={imgfrom} class="rank" /> { /* Aca va la imagen de los rank */}
                        <img src={imgto} class="rank" /> { /* Aca va la imagen de los rank */}
                        <p class="rank-status"> Desde {namefrom} hasta {nameto} </p>
                        <hr />
                    </div>
                    <div class="payment-info">
                        <div class="price">
                            <a class="padd"> Precio final </a>
                            {price ? <p className="old"> <del> ${price + (price * 0.2)} ARS </del></p> : <p></p>}
                            <p class="now"> ${price} ARS </p>
                            <hr />
                        </div>
                        <div class="time">
                            <a class="padd"> Tiempo total </a>
                            <p class="count"> {days} </p>
                            <p> Dias </p>
                            <hr />
                            <p> <img src={verify} class="icon" /> Soporte al cliente 24/7 </p> { /* Aca va la imagen verify */}
                            <p> <img src={verify} class="icon" /> Acceso a beneficios exclusivos </p> { /* Aca va la imagen verify */}
                            <p> <img src={verify} class="icon" /> Servicios adicionales incluidos </p> { /* Aca va la imagen verify */}
                        </div>
                        <button className="pay" type="submit"> Pagar </button>
                        <div class="dude">
                            <p> Ante cualquier duda con tu pago, contactanos a <a href="https://discord.gg/CrxGDbF"> Discord.</a> </p>
                        </div>
                    </div>
                </div>
         </form>
        </div>
    )
}
