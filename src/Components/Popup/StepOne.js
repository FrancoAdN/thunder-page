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
import jungler from './JUNGLER.png'
import mid from './mid.png'
import bot from './bot.png'
import sup from './support.png'

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

                <section id="grilla">
                    <section id="card1" className="card1"> 
                        <h1 className="title"> Selecciona tu <span> liga actual </span> </h1>
                        <div className="form">
                            <div className="img-rank">
                                <img src="" className="division"></img> { /* Aca va la imagen de los rank */ }
                            </div>
                            <div className="container-rank">				
                             <select name="ranks" value={fromRank} onChange={(e) => {
                                 setFromRank(e.target.value)
                                 fromRef.curent = e.target.value
                                 handleSelect(e, setFrom, setVisFrom)

                             }}>
                                    <option value="1">Iron</option> 
                                    <option value="2">Bronce</option> 
                                    <option value="3">Silver</option>
                                    <option value="10">Gold</option> 
                                    <option value="11">Platino</option> 
                                    <option value="12">Diamond</option> 
                                  </select>
                                 <div className="divition" style={{ visibility: visFrom }}>                          
                                    <select name="divisions" onChange={(e) => changeDivision(e, divFromRef)}>
                                    <option value="1"> Division I </option> 
                                    <option value="2"> Division II </option> 
                                    <option value="3"> Division III </option>
                                    <option value="10">Division IV </option> 
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
                                <img src="" className="division"> </img> { /* Aca va la imagen de los rank */ }
                            </div>
                            <div className="container-rank">				
                             <select name="ranks" value={toRank} onChange={(e) => {
                                setToRank(e.target.value)
                                 toRef.current = e.target.value
                                 handleSelect(e, setTo, setVisTo)
                             }}>
                                    <option value="1">Iron</option> 
                                    <option value="2">Bronce</option> 
                                    <option value="3">Silver</option>
                                    <option value="10">Gold</option> 
                                    <option value="11">Platino</option> 
                                    <option value="12">Diamond</option> 
                                    <option value="13">Master</option>
                                    <option value="14">Grand Master</option>
                                    <option value="15">Challenger</option>
                             </select>
                                <div className="divition" style={{ visibility: visTo }}> 
                                <select name="divisions" onChange={(e) => changeDivision(e, divToRef)}>
                                    <option value="1"> Division I </option> 
                                    <option value="2"> Division II </option> 
                                    <option value="3"> Division III </option>
                                    <option value="10">Division IV </option> 
                                 </select>
                                 </div>
                            </div>
                        </div>
                    </section>

                    <section id="card3" className="card3"> 
                        <h1 className="title"> Configuracion de boost </h1>
                        <hr/>
                        <div className="checkout-container">
                            <div className="services-container">
                                <div className="configuration">
                                    <h1 className=""> Opciones de boost </h1>
                                <div className="server"> 
                                    <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon"> </img>
                                    <p> Servidor: </p>
                                     <select name="servidores" onChange={(e) => {
                                         serverRef.current = e.target.value
                                         calculatePrice()
                                     }}>
                                        <option value="1"> LAS </option> 
                                        <option value="2"> BR (+10%)</option> 
                                    </select>
                                </div>
                                <div className="server"> 
                                    <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon"> </img>
                                    <p> Modo Queue: </p>
                                    <select name="modo" onChange={modeChange}>
                                        <option value="1"> Solo </option> 
                                        <option value="2"> Duo (+15%)</option> 
                                        <option value="3"> Flexible </option>
                                    </select>
                                </div>
                                <hr>
                                <div className="fast"> 
                                    <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon"></img>
                                    <p> Servicio rapido: <span>+30%</span> </p>
                                    <input type="checkbox" id="cbox1" value="first_checkbox" className="checkbox" onChange={handleFast}> </input>
                                    <div className="streaming"> 
                                        <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon"></img>
                                        <p> Discord Stream: <span> +15% </span> </p>
                                        <input type="checkbox" id="cbox1" value="first_checkbox" className="checkbox"></input>
                                    </div>
                                </div>
                                <hr/>
                                <div className="extra">
                                    <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon"> </img>
                                    <p> Fijar campeones: <span> +10% </span></p>
                                         <input type="checkbox" id="cbox1" value="first_checkbox" className="checkbox" onChange={handleOpenChamps}></input>
                                         <ModalChamps openChamps={openChamps} setOpenChamps={setOpenChamps} setChamps={setChamps} champions={champs} lanes={lanes} ></ModalChamps>
                                    <div className="image-container">
                                     {
                                        champs.map(champ => <img src={champ.img} className="image-champ" alt="" />)            
                                     }
                                </div>
                                    <div className="extra2">
                                        <img src="https://img.icons8.com/color/48/000000/league-of-legends.png" className="icon" />
                                        <p>Fijar roles: <span> +10% </span></p>
                                             <input type="checkbox" id="cbox1" value="first_checkbox" className="checkbox" onChange={handleLanes} />
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
                                             {price ? <p className="old"> <del> ${price + (price * 0.2)} ARS </del></p> : <p></p> }
                                        <p className="now"> ${price} ARS </p>
                                        <hr/>
                                    </div>
                                    <div className="time">
                                        <a> Tiempo estimado </a>
                                        <p className="count"> {days} </p>
                                        <p> Dias </p>
                                        <hr/>
                                    </div>
                                    <div className="services">
                                        <p className="title2">Servicios adicionales <br/> con tu compra </p>
                                        <p> <img src="./verify.png" className="icon"></img> Soporte en Discord 24/7 </p> { /* Aca va la imagen verify */ }
                                        <p> <img src="./verify.png" className="icon"></img> Rango Vip en nuestro Discord </p>
                                        <p> <img src="./verify.png" className="icon"></img> Chat con tu Booster </p>
                                        <p> <img src="./verify.png" className="icon"></img> Acceso a beneficios </p>
                                        <p> <img src="./verify.png" className="icon"></img> 1 Sesion de Coaching gratis </p>
                                        <hr/>
                                    </div>
                                    <div className="continue" style={{ visibility: cont }} onClick={() => set(true)}>
                                         <button> Continuar </button>  
                                    </div>
                                </div>
                            </hr>
                        </div>
                    </div>
                </div>
            </section>
        </section>

    )
}

