import React, { useState, useRef, useEffect, useContext } from 'react'
import ModalLanes from './Modals/ModalLanes'
import ModalChamps from './Modals/ModalChamps'
import Header from './Header'
import './style.css'
import './responsive.css'
import rank3 from './ranks-lol/3.png'
import rank4 from './ranks-lol/4.png'
import rank5 from './ranks-lol/5.png'
import rank6 from './ranks-lol/6.png'
import rank7 from './ranks-lol/7.png'
import rank8 from './ranks-lol/8.png'
import rank9 from './ranks-lol/9.png'
import { prov } from './_useHook'
import top from './top.png'
import verifry from './verify.png'
import jungler from './JUNGLER.png'
import mid from './mid.png'
import bot from './bot.png'
import sup from './support.png'
import Footer from '../Footer'
import { parse } from 'graphql'
import MiniHeader from './MiniHeader'

export default function StepOne({ set }) {

    const {
        price, setPrice,
        days, setDays,
        champs, setChamps,
        lanes, setLanes,
        fromRank, setFromRank,
        toRank, setToRank,
        divFromRef, divToRef,
        serverRef, modeRef, fastRef, discordRef
    } = useContext(prov)

    const fromRef = useRef()
    const toRef = useRef()
    const [visFrom, setVisFrom] = useState('visible')
    const [visTo, setVisTo] = useState('visible')
    const [from, setFrom] = useState(rank9)
    const [to, setTo] = useState(rank9)
    const [cont, setCont] = useState('hidden')
    const [openLanes, setOpenLanes] = useState(false)
    const [openChamps, setOpenChamps] = useState(false)


    useEffect(() => {
        fromRef.current = fromRank
        toRef.current = toRank
        serverRef.current = "LAS"
        modeRef.current = "SOLO"
        fastRef.current = false

        divFromRef.current = "4"
        divToRef.current = "4"

    }, [])

    useEffect(() => {
        if (price) setCont('visible')
        else setCont('hidden')
    }, [price])

    useEffect(() => {
        if (champs.length === 0) {
            document.getElementById("checkChamps").checked = false
        } else {
            calculatePrice()
        }
    }, [champs])

    useEffect(() => {
        if (lanes.length !== 0)
            calculatePrice()
    }, [lanes])

    const handleFast = (e) => {
        fastRef.current = e.target.checked
        calculatePrice()
    }

    const handleDiscord = (e) => {
        discordRef.current = e.target.checked
        calculatePrice()
    }

    const pricing = [
        { rank: 'Iron', price_per_div: 150, days_per_div: 2 },
        { rank: 'Bronze', price_per_div: 250, days_per_div: 2 },
        { rank: 'Silver', price_per_div: 350, days_per_div: 2 },
        { rank: 'Gold', price_per_div: 450, days_per_div: 2 },
        { rank: 'Platinium', price_per_div: 650, days_per_div: 3 },
        { rank: 'Diamond' },
        { rank: 'Master' }
    ]

    const calculatePrice = () => {

        setPrice(0)
        setDays(0)

        const fromIndex = getIndexOfRank(fromRef.current)
        const toIndex = getIndexOfRank(toRef.current)


        const intDivFrom = parseInt(divFromRef.current)
        const intDivTo = parseInt(divToRef.current)
        if (fromIndex <= toIndex) {
            if (fromIndex !== toIndex && toIndex < 5) {
                let currPrice = 0
                let currDays = 0
                for (let i = fromIndex + 1; i < toIndex; i++) {
                    currPrice += pricing[i].price_per_div * 4
                    currDays += pricing[i].days_per_div * 4
                }
                currPrice += pricing[fromIndex].price_per_div * intDivFrom
                currDays += pricing[fromIndex].days_per_div * intDivFrom

                currPrice += pricing[toIndex].price_per_div * (4 - intDivTo)
                currDays += pricing[toIndex].days_per_div * (4 - intDivTo)

                setDays(currDays)
                setPrice(currPrice)

            } else if (fromIndex === toIndex && toIndex < 5) {
                if (intDivFrom > intDivTo) {
                    setDays(pricing[fromIndex].days_per_div * (intDivFrom - intDivTo))
                    setPrice(pricing[fromIndex].price_per_div * (intDivFrom - intDivTo))
                }

            } else if (toIndex >= 5) {

                if (fromIndex !== 5) {
                    let currPrice = 0
                    let currDays = 0

                    for (let i = fromIndex + 1; i < 5; i++) {
                        currPrice += pricing[i].price_per_div * 4
                        currDays += pricing[i].days_per_div * 4
                    }

                    if (toIndex === 5) {
                        if (intDivTo === 3) {
                            currPrice += 1500
                            currDays += 4
                        } else if (intDivTo === 2) {
                            currPrice += 3500
                            currDays += 8
                        } else if (intDivTo === 1) {
                            currPrice += 6000
                            currDays += 12
                        }
                    } else if (toIndex === 6) {
                        currPrice += 9500
                        currDays += 17
                    }

                    currPrice += pricing[fromIndex].price_per_div * intDivFrom
                    currDays += pricing[fromIndex].days_per_div * intDivFrom

                    setPrice(currPrice)


                } else if (fromIndex === 5) {
                    if (toIndex === fromIndex) {

                        if (intDivFrom === 4 && intDivTo < intDivFrom) {
                            if (intDivTo === 3) {
                                setDays(4)
                                setPrice(1500)
                            } else if (intDivTo === 2) {
                                setPrice(3500)
                                setDays(8)
                            } else if (intDivTo === 1) {
                                setPrice(6000)
                                setDays(12)
                            }
                        } else if (intDivFrom === 3 && intDivTo < intDivFrom) {
                            if (intDivTo === 2) {
                                setDays(4)
                                setPrice(2000)
                            } else if (intDivTo === 1) {
                                setPrice(4500)
                                setDays(4)
                            }
                        } else if (intDivFrom === 2 && intDivTo < intDivFrom) {
                            setPrice(2500)
                            setDays(4)
                        } else {
                            setDays(0)
                            setPrice(0)
                        }

                    } else {
                        if (intDivFrom === 4) {
                            setPrice(9500)
                            setDays(17)
                        } else if (intDivFrom === 3) {
                            setPrice(8000)
                            setDays(13)
                        } else if (intDivFrom === 2) {
                            setPrice(6000)
                            setDays(9)
                        } else {
                            setPrice(3500)
                            setDays(5)
                        }
                    }

                }

            }
        }

        if (serverRef.current === 'BR') {
            setPrice(price => parseInt(price + (price * 0.25)))
        }

        if (modeRef.current === 'DUO') {
            setPrice(price => parseInt(price + (price * 0.5)))
        }

        if (fastRef.current) {
            setPrice(price => parseInt(price + (price * 0.5)))
            setDays(days => parseInt(days - (days * 0.5)))
        }

        if (discordRef.current) {
            setPrice(price => parseInt(price + (price * 0.15)))
        }

        if (lanes.length !== 0) {
            setPrice(price => parseInt(price + (price * 0.25)))
        }

        if (champs.length !== 0) {
            setPrice(price => parseInt(price + (price * 0.25)))
        }


    }

    function getIndexOfRank(rank) {
        for (let i = 0; i < pricing.length; i++) {
            if (pricing[i].rank === rank)
                return i
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

    const handleLanes = (e) => {
        if (e.target.checked === false) {
            setLanes([])
        }

        setOpenLanes(true)
    }

    const handleOpenChamps = (e) => {
        if (e.target.checked === false) {
            setChamps([])
        }

        setOpenChamps(true)

    }

    const getLaneImage = (role) => {
        if (role === "top")
            return top
        else if (role === "JUNGLER")
            return jungler
        else if (role === "mid")
            return mid
        else if (role === "bot")
            return bot

        return sup

    }

    return (
        <div>
            <Header />
            <MiniHeader />
            <section id="grilla">
                <section id="card1" className="card1">
                    <h1 className="title"> Selecciona tu <span> liga actual </span> </h1>
                    <div className="form">
                        <div className="img-rank">
                            <img src={from} className="division"></img> { /* Aca va la imagen de los rank */}
                        </div>
                        <div className="container-rank">
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
                            </select>
                            <div className="divition" style={{ visibility: visFrom }}>
                                <select name="divisions" onChange={(e) => changeDivision(e, divFromRef)}>
                                    <option value="4">Division IV </option>
                                    <option value="3"> Division III </option>
                                    <option value="2"> Division II </option>
                                    <option value="1"> Division I </option>

                                </select>
                            </div>
                            <select name="lp">
                                <option value="1"> 0  - 25 LP </option>
                                <option value="2"> 25 - 50 LP </option>
                                <option value="3"> 50 - 75 LP </option>
                                <option value="10">75 - 100 LP </option>
                            </select>
                        </div>
                    </div>
                </section>

                <section id="card2" className="card2">
                    <h1 className="title"> Selecciona tu <span> liga deseada </span> </h1>
                    <div className="form">
                        <div className="img-rank">
                            <img src={to} className="division"></img> { /* Aca va la imagen de los rank */}
                        </div>
                        <div className="container-rank">
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
                            </select>
                            <div className="divition" style={{ visibility: visTo }}>
                                <select name="divisions" onChange={(e) => changeDivision(e, divToRef)}>
                                    <option value="4">Division IV </option>
                                    <option value="3"> Division III </option>
                                    <option value="2"> Division II </option>
                                    <option value="1"> Division I </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="card3" className="card3">
                    <h1 className="title"> Configuracion de boost </h1>
                    <hr />
                    <div className="checkout-container">
                        <div className="services-container">
                            <div className="configuration">
                                <h1 className=""> Opciones de boost </h1>
                                <div className="server">
                                    <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon"></img>
                                    <p> Servidor: </p>
                                    <select name="servidores" onChange={(e) => {
                                        serverRef.current = e.target.value
                                        calculatePrice()
                                    }}>
                                        <option value="LAS"> LAS </option>
                                        <option value="BR"> BR (+25%)</option>
                                    </select>
                                </div>
                                <div className="server">
                                    <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon" />
                                    <p> Modo Queue: </p>
                                    <select name="modo" onChange={modeChange}>
                                        <option value="SOLO"> Solo </option>
                                        <option value="DUO"> Duo (+50%)</option>
                                        <option value="FLEXIBLE"> Flexible </option>
                                    </select>
                                </div>
                                <hr />
                                <div className="fast">
                                    <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon"></img>
                                    <p> Servicio rapido: <span>+30%</span> </p>
                                    <input type="checkbox" id="cbox1" value="first_checkbox" className="checkbox" onChange={handleFast} />
                                    <div className="streaming">
                                        <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon"></img>
                                        <p> Discord Stream: <span> +15% </span> </p>
                                        <input type="checkbox" id="cbox1" value="first_checkbox" className="checkbox" onChange={handleDiscord}></input>
                                    </div>
                                </div>
                                <hr />
                                <div className="extra">
                                    <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon" />
                                    <p> Fijar campeones: <span> +25% </span></p>
                                    <input type="checkbox" id="checkChamps" value="first_checkbox" className="checkbox" onChange={handleOpenChamps}></input>
                                    <ModalChamps openChamps={openChamps} setOpenChamps={setOpenChamps} setChamps={setChamps} champions={champs} lanes={lanes} ></ModalChamps>
                                    <div className="image-container">
                                        {
                                            champs.map(champ => <img src={champ.img} className="image-champ" alt="" />)
                                        }
                                    </div>
                                    <div className="extra2">
                                        <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon" />
                                        <p>Fijar roles: <span> +25% </span></p>
                                        <input type="checkbox" id="checkLanes" value="first_checkbox" className="checkbox" onChange={handleLanes} />
                                        <ModalLanes openLanes={openLanes} setOpenLanes={setOpenLanes} setLanes={setLanes} lanes={lanes} />
                                        <div className="image-container">
                                            {
                                                lanes.map(role => <img key={role} src={getLaneImage(role)} alt={role} className="image-champ" />)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="test">
                                    <h1> Informacion de boost </h1>
                                    <div className="price">
                                        <a> Precio total </a>
                                        {price ? <p className="old"> <del> ${price + (price * 0.2)} ARS </del></p> : <p></p>}
                                        <p className="now"> ${price} ARS </p>
                                        <hr />
                                    </div>
                                    <div className="time">
                                        <a> Tiempo estimado </a>
                                        <p className="count"> {days} </p>
                                        <p> Dias </p>
                                        <hr />
                                    </div>
                                    <div className="services">
                                        <p className="title2">Servicios adicionales <br /> con tu compra </p>
                                        <p> <img src={verifry} className="icon"></img> Soporte en Discord 24/7 </p> { /* Aca va la imagen verify */}
                                        <p> <img src={verifry} className="icon"></img> Rango Vip en nuestro Discord </p>
                                        <p> <img src={verifry} className="icon"></img> Chat con tu Booster </p>
                                        <p> <img src={verifry} className="icon"></img> Acceso a beneficios </p>
                                        <hr />
                                    </div>
                                    <div className="continue" style={{ visibility: cont }} onClick={() => set("2")}>
                                        <button> Continuar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section >
        </div>

    )
}

