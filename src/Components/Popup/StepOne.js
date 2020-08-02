import React, { useState, useRef, useEffect, useContext } from 'react'
import Header from './Header'
import './style.css'
import './responsive.css'
import rank1 from './ranks-lol/1.png'
import rank2 from './ranks-lol/2.png'
import rank3 from './ranks-lol/3.png'
import rank4 from './ranks-lol/4.png'
import rank5 from './ranks-lol/5.png'
import rank6 from './ranks-lol/6.png'
import rank7 from './ranks-lol/7.png'
import rank8 from './ranks-lol/8.png'
import rank9 from './ranks-lol/9.png'
import { prov } from './_useHook'

// import victory from './victory.png'
// import thunder from './thunder.png'
import example from './example.png'
import jungle from './jungle.png'

export default function StepOne({ set }) {

    const {
        price, setPrice,
        days, setDays,
        fromRank, setFromRank,
        toRank, setToRank,
        divFromRef, divToRef,
        serverRef, modeRef, fastRef
    } = useContext(prov)

    console.log(price, setPrice)

    const fromRef = useRef()
    const toRef = useRef()
    const [visFrom, setVisFrom] = useState('visible')
    const [visTo, setVisTo] = useState('visible')
    const [from, setFrom] = useState(rank9)
    const [to, setTo] = useState(rank9)
    const [cont, setCont] = useState('hidden')


    useEffect(() => {
        fromRef.current = fromRank
        toRef.current = toRank
        serverRef.current = "LAS"
        modeRef.current = "SOLO"
        fastRef.current = false

        divFromRef.current = "4"
        divToRef.current = "4"
        console.log(divFromRef)

    }, [])

    useEffect(() => {
        if (price) setCont('visible')
        else setCont('hidden')
    }, [price])

    const handleFast = (e) => {
        fastRef.current = e.target.checked
        calculatePrice()
    }

    const pricing = [
        { from: 'Iron', to: 'Bronze', price: 1250, days: 5 },
        { from: 'Bronze', to: 'Silver', price: 1450, days: 5 },
        { from: 'Silver', to: 'Gold', price: 1820, days: 6 },
        { from: 'Gold', to: 'Platinium', price: 2500, days: 7 },
        { from: 'Platinium', to: 'Diamond', price: 3450, days: 7 },
        { from: 'Diamond', to: 'Master', price: 16500, days: 11 },
        { from: 'Master', to: 'Grand Master', price: 23800, days: 15 },
        { from: 'Grand Master', to: 'Challenger', price: 30500, days: 22 }
    ]

    const calculatePrice = () => {
        let foundFrom = false
        let foundTo = false
        let currentPrice = 0
        let currentDays = 0

        for (const div of pricing) {

            if (!foundFrom) {
                if (fromRef.current === div.from) {
                    foundFrom = true
                    currentPrice += div.price
                    currentDays += div.days
                    if (toRef.current === div.to) {
                        foundTo = true
                        break
                    }
                }

            } else {
                currentPrice += div.price
                currentDays += div.days
                if (toRef.current === div.to) {
                    foundTo = true
                    break
                }
            }
        }


        if (foundTo) {

            setDays(currentDays)

            if (serverRef.current === "LAS") setPrice(currentPrice)
            else setPrice(currentPrice + currentPrice * 0.45)

            if (modeRef.current === "DUO") setPrice(price => price + price * 0.75)
            if (fastRef.current) {
                setDays(days => days - days * 0.35)
                setPrice(price => price + price * 0.25)
            }
            if ((toRef.current !== "Challenger") && (toRef.current !== "Master") && (toRef.current !== "Grand Master"))
                divitionProfit()

            setPrice(price => Math.round(price))
            setDays(days => Math.round(days))

        } else if ((fromRef.current === toRef.current) && ((toRef.current !== "Challenger") && (toRef.current !== "Master") && (toRef.current !== "Grand Master"))) {

            const next = getCurrent(fromRef.current)
            setPrice(next.price - next.price * 0.3)
            setDays(next.days - next.days * 0.3)
            let dif = 0
            if (divFromRef.current === "3") dif = 0.15
            else if (divFromRef.current === "2") dif = 0.3
            else if (divFromRef.current === "1") dif = 0.7
            setPrice(price => price - next.price * dif)
            setDays(days => days - next.days * dif)

            if (serverRef.current !== "LAS") setPrice(price => price + price * 0.45)

            if (modeRef.current === "DUO") setPrice(price => price + price * 0.75)
            if (fastRef.current) {
                setDays(days => days - days * 0.35)
                setPrice(price => price + price * 0.25)
            }

            setPrice(price => Math.round(price))
            setDays(days => Math.round(days))


        } else {
            setPrice(0)
            setDays(0)
        }


    }


    const handleSelect = (e, setImg, set) => {

        switch (e.target.value) {
            case "Iron":
                setImg(rank9)
                set('visible')
                break
            case "Bronze":
                setImg(rank8)
                set('visible')
                break
            case "Silver":
                setImg(rank7)
                set('visible')
                break
            case "Gold":
                setImg(rank6)
                set('visible')
                break
            case "Platinium":
                setImg(rank5)
                set('visible')
                break
            case "Diamond":
                setImg(rank4)
                set('visible')
                break
            case "Master":
                setImg(rank3)
                set('hidden')
                break
            case "Grand Master":
                setImg(rank2)
                set('hidden')
                break
            case "Challenger":
                setImg(rank1)
                set('hidden')
                break

        }
        calculatePrice()
    }

    const modeChange = (e) => {
        modeRef.current = e.target.value
        calculatePrice()
    }

    const changeDivision = (e, refDiv) => {
        refDiv.current = e.target.value
        calculatePrice()
    }

    const divitionProfit = () => {


        if (divFromRef.current === "4") {
            if (divToRef.current === "4")
                setPrice(price => price)
            else {
                const next = getNext(toRef.current)
                setProfit(next)

            }

        } else if (divFromRef.current === "3") {
            const next = getCurrent(fromRef.current)
            setPrice(price => price - next.price * 0.15)
            setDays(days => days - next.days * 0.15)
            setProfit(getNext(toRef.current))

        } else if (divFromRef.current === "2") {
            const next = getCurrent(fromRef.current)
            setPrice(price => price - next.price * 0.3)
            setDays(days => days - next.days * 0.3)
            setProfit(getNext(toRef.current))
        } else if (divFromRef.current === "1") {
            const next = getCurrent(fromRef.current)
            setPrice(price => price - next.price * 0.7)
            setDays(days => days - next.days * 0.7)
            setProfit(getNext(toRef.current))
        }




    }

    const setProfit = (next) => {
        if (divToRef.current === "3") {
            setPrice(price => price + next.price * 0.15)
            setDays(days => days + next.days * 0.15)
        } else if (divToRef.current === "2") {
            setPrice(price => price + next.price * 0.3)
            setDays(days => days + next.days * 0.3)
        } else if (divToRef.current === "1") {
            setPrice(price => price + next.price * 0.7)
            setDays(days => days + next.days * 0.7)
        }
    }

    const getNext = (current) => {
        for (let i = 0; i < pricing.length; i++) {
            if (pricing[i].to === current) {
                return { price: pricing[i + 1].price, days: pricing[i + 1].days }
            }
        }
    }

    const getCurrent = (current) => {
        for (let i = 0; i < pricing.length; i++) {
            if (pricing[i].from === current) {
                return { price: pricing[i].price, days: pricing[i].days }
            }
        }
    }


    return (
        <div className="form-popup">
            <div className="container form-wrapper">
                <Header title="1. ELEGI TU LIGA" />
                <div className="main-section">
                    <div className="main-section-head">
                        <h1 className="title text-center"> THUNDER BOOSTING </h1>
                        <p className="sub-title text-center"> Selecciona tu liga y la deseada, configura las opciones del
                        boosting
						<br /> y nosotros nos encargamos de cumplirlo. </p>
                    </div>

                    <div className="card">
                        <div className="card-container">
                            <p className="card-title text-center"> TU DIVISION </p>
                            <i><img src={from} className="img-fluid4" alt="" /></i>
                            <div className="rank">
                                <select name="ranks" value={fromRank} onChange={(e) => {
                                    setFromRank(e.target.value)
                                    fromRef.current = e.target.value
                                    handleSelect(e, setFrom, setVisFrom)

                                }}>
                                    <option value="Iron">Iron</option>
                                    <option value="Bronze">Bronze</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Platinium">Platinium</option>
                                    <option value="Diamond">Diamond</option>
                                    <option value="Master">Master</option>
                                    <option value="Grand Master">Grand Master</option>
                                    <option value="Challenger">Challenger</option>
                                </select>
                            </div>
                            <div className="divition" style={{ visibility: visFrom }}>
                                <select name="divisions" onChange={(e) => changeDivision(e, divFromRef)}>
                                    <option value="4"> División IV </option>
                                    <option value="3"> División III </option>
                                    <option value="2"> División II </option>
                                    <option value="1"> División I </option>
                                </select>
                            </div>
                            <div className="status-lp">
                                <select name="lp">
                                    <option value="1"> 0 - 25 LP </option>
                                    <option value="2"> 25 - 50 LP </option>
                                    <option value="3"> 50 - 75 LP </option>
                                    <option value="10">75 - 100 LP </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="card2">
                        <div className="card-container">
                            <p className="card-title text-center"> DIVISIÓN DESEADA </p>
                            <i><img src={to} className="img-fluid4" alt="" /></i>
                            <div className="rank">
                                <select name="ranks" value={toRank} onChange={(e) => {
                                    setToRank(e.target.value)
                                    toRef.current = e.target.value
                                    handleSelect(e, setTo, setVisTo)
                                }}>
                                    <option value="Iron">Iron</option>
                                    <option value="Bronze">Bronze</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Platinium">Platinium</option>
                                    <option value="Diamond">Diamond</option>
                                    <option value="Master">Master</option>
                                    <option value="Grand Master">Grand Master</option>
                                    <option value="Challenger">Challenger</option>
                                </select>
                            </div>
                            <div className="divition" style={{ visibility: visTo }}>
                                <select name="divisions" onChange={(e) => changeDivision(e, divToRef)}>
                                    <option value="4"> Division IV </option>
                                    <option value="3"> Division III </option>
                                    <option value="2"> Division II </option>
                                    <option value="1"> Division I </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="card6">
                        <p className="card-title2"> EXTRAS </p>
                        <hr />
                        <div className="price">
                            <p className="price-a"> PRECIO TOTAL </p>
                            {/* <p className="price-b"> <del> ${price + (price * 0.2)} ARS </del> </p> */}
                            {price ? <p className="price-b"> <del> ${price + (price * 0.2)} ARS </del> </p> : <p></p>}
                            <p className="price-c"> ${price} ARS </p>
                            <hr />
                            <div className="time">
                                <p className="time-a"> TIEMPO <br /> ESTIMADO </p>
                                <p className="time-b"> {days} DÍAS </p>
                                <hr />
                            </div>
                        </div>
                        <div className="card3">
                            <div className="mini-card-container">
                                <i><img src="https://img.icons8.com/color/48/000000/league-of-legends.png"
                                    className="server-icon text-center" alt="" /></i>
                                <p className="server-title"> Servidor: </p>
                                <div className="server">
                                    <select name="servidores" onChange={(e) => {
                                        serverRef.current = e.target.value
                                        calculatePrice()
                                    }}>
                                        <option value="LAS"> LAS </option>
                                        <option value="BR"> BR </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card4">
                            <div className="mini-card-container">
                                <i><img src="https://img.icons8.com/color/48/000000/league-of-legends.png"
                                    className="server-icon text-center" alt="" /></i>
                                <p className="server-title"> Modo: </p>
                                <div className="modo">
                                    <select name="modo" onChange={modeChange}>
                                        <option value="SOLO"> SOLO </option>
                                        <option value="DUO"> DUO </option>
                                        <option value="FLEXIBLE"> FLEXIBLE </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card5">
                            <div className="mini-card-container">
                                <i><img src="https://img.icons8.com/color/48/000000/league-of-legends.png"
                                    className="server-icon text-center" alt="" /></i>
                                <p className="server-title"> Servicio rapido: </p>
                                <input type="checkbox" id="cbox1" value="first_checkbox" className="checkbox" onChange={handleFast} />
                            </div>
                        </div>
                        <div className="card7">
                            <div className="mini-card-container">
                                <i><img src="https://img.icons8.com/color/48/000000/league-of-legends.png"
                                    className="server-icon text-center" alt="" /></i>
                                <p className="server-title"> Fijar campeones </p>
                                <input type="checkbox" id="cbox1" value="first_checkbox" className="checkbox" />
                                <div className="image-container">
                                    <img src={example} className="image-champ" alt="" />
                                    <img src={example} className="image-champ" alt="" />
                                    <img src={example} className="image-champ" alt="" />
                                    <img src={example} className="image-champ" alt="" />
                                    <img src={example} className="image-champ" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="card8">
                            <div className="mini-card-container">
                                <i><img src="https://img.icons8.com/color/48/000000/league-of-legends.png"
                                    className="server-icon text-center" alt="" /></i>
                                <p className="server-title"> Fijar roles </p>
                                <input type="checkbox" id="cbox1" value="first_checkbox" className="checkbox" />
                            </div>
                            <div className="image-container2">
                                <img src={jungle} className="image-champ2" alt="" />
                                <img src={jungle} className="image-champ2" alt="" />
                                <img src={jungle} className="image-champ2" alt="" />
                                <img src={jungle} className="image-champ2" alt="" />
                                <img src={jungle} className="image-champ2" alt="" />
                            </div>
                        </div>
                        <div className="continue" style={{ visibility: cont }} onClick={() => set(true)}>
                            <p className="cont text-center"> Continuar </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
