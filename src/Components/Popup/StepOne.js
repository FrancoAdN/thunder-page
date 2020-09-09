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
import top from './TOP.png'
import jungler from './JUNGLER.png'
import mid from './MID.png'
import bot from './BOT.png'
import sup from './SUPPORT.png'

export default function StepOne({ set }) {

    const {
        price, setPrice,
        days, setDays,
        champs, setChamps,
        lanes, setLanes,
        fromRank, setFromRank,
        toRank, setToRank,
        divFromRef, divToRef,
        serverRef, modeRef, fastRef
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
        }
    }, [champs])

    const handleFast = (e) => {
        fastRef.current = e.target.checked
        calculatePrice()
    }

    const pricing = [
        { rank: 'Iron', price_per_div: 150, days_per_div: 0.5 },
        { rank: 'Bronze', price_per_div: 250, days_per_div: 1 },
        { rank: 'Silver', price_per_div: 350, days_per_div: 1.5 },
        { rank: 'Gold', price_per_div: 450, days_per_div: 1.5 },
        { rank: 'Platinium', price_per_div: 650, days_per_div: 2 },
        { rank: 'Diamond' },
        { rank: 'Master' }
    ]

    const calculatePrice = () => {

        const fromIndex = getIndexOfRank(fromRef.current)
        const toIndex = getIndexOfRank(toRef.current)

        setPrice(0)
        const intDivFrom = parseInt(divFromRef.current)
        const intDivTo = parseInt(divToRef.current)
        if (fromIndex <= toIndex) {
            if (fromIndex !== toIndex && toIndex < 5) {
                let currPrice = 0

                for (let i = fromIndex + 1; i < toIndex; i++) {
                    currPrice += pricing[i].price_per_div * 4
                }

                currPrice += pricing[fromIndex].price_per_div * intDivFrom

                currPrice += pricing[toIndex].price_per_div * (4 - intDivTo)

                setPrice(currPrice)

            } else if (fromIndex === toIndex && toIndex < 5) {
                if (intDivFrom > intDivTo) {
                    setPrice(pricing[fromIndex].price_per_div * (intDivFrom - intDivTo))
                }

            } else if (toIndex >= 5) {

                if (fromIndex !== 5) {
                    let currPrice = 0

                    for (let i = fromIndex + 1; i < 5; i++) {
                        currPrice += pricing[i].price_per_div * 4
                    }

                    if (toIndex === 5) {
                        if (intDivTo === 3) {
                            currPrice += 1500
                        } else if (intDivTo === 2) {
                            currPrice += 3500
                        } else if (intDivTo === 1) {
                            currPrice += 6000
                        }
                    } else if (toIndex === 6) {
                        currPrice += 9500
                    }

                    currPrice += pricing[fromIndex].price_per_div * intDivFrom

                    setPrice(currPrice)


                } else if (fromIndex === 5) {
                    if (toIndex === fromIndex) {

                        if (intDivFrom === 4 && intDivTo < intDivFrom) {
                            if (intDivTo === 3) {
                                setPrice(1500)
                            } else if (intDivTo === 2) {
                                setPrice(3500)
                            } else if (intDivTo === 1) {
                                setPrice(6000)
                            }
                        } else if (intDivFrom === 3 && intDivTo < intDivFrom) {
                            if (intDivTo === 2) {
                                setPrice(2000)
                            } else if (intDivTo === 1) {
                                setPrice(4500)
                            }
                        } else if (intDivFrom === 2 && intDivTo < intDivFrom) {
                            setPrice(2500)
                        } else {
                            setPrice(0)
                        }

                    } else {
                        if (intDivFrom === 4) {
                            setPrice(9500)
                        } else if (intDivFrom === 3) {
                            setPrice(8000)
                        } else if (intDivFrom === 2) {
                            setPrice(6000)
                        } else {
                            setPrice(3500)
                        }
                    }

                }

            }
        }

        if (serverRef.current === 'BR') {
            setPrice(price => price + (price / 2))
        }

        if (modeRef.current === 'DUO') {
            setPrice(price => price * 2)
        }

        if (fastRef.current) {
            setPrice(price => price + (price / 2))
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
        if (role === "TOP")
            return top
        else if (role === "JUNGLER")
            return jungler
        else if (role === "MID")
            return mid
        else if (role === "BOT")
            return bot

        return sup

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
                                    {/* <option value="Grand Master">Grand Master</option>
                                    <option value="Challenger">Challenger</option> */}
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
                                    {/* <option value="Grand Master">Grand Master</option>
                                    <option value="Challenger">Challenger</option> */}
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
                                <input type="checkbox" id="checkChamps" value="first_checkbox" className="checkbox" onChange={handleOpenChamps} />
                                <ModalChamps openChamps={openChamps} setOpenChamps={setOpenChamps} setChamps={setChamps} champions={champs} lanes={lanes} />
                                <div className="image-container">
                                    {
                                        champs.map(champ => <img src={champ.img} className="image-champ" alt="" />)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="card8">
                            <div className="mini-card-container">
                                <i><img src="https://img.icons8.com/color/48/000000/league-of-legends.png"
                                    className="server-icon text-center" alt="" /></i>
                                <p className="server-title"> Fijar roles </p>
                                <input type="checkbox" id="checkLanes" value="first_checkbox" className="checkbox" onChange={handleLanes} />
                                <ModalLanes openLanes={openLanes} setOpenLanes={setOpenLanes} setLanes={setLanes} lanes={lanes} />


                            </div>
                            <div className="image-container2">
                                {
                                    lanes.map(role => <img key={role} src={getLaneImage(role)} alt={role} className="image-champ2" />)
                                }
                            </div>
                        </div>
                        <div className="continue2" style={{ visibility: cont }} onClick={() => set("2")}>
                            <p className="cont text-center"> Continuar </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

