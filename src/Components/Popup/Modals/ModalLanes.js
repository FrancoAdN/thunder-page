import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import './modals.css'
import top from '../top.png'
import jungle from '../JUNGLER.png'
import mid from '../mid.png'
import bot from '../bot.png'
import support from '../support.png'

export default function ModalLanes({ openLanes, setOpenLanes, setLanes, lanes }) {

    const [check, setCheck] = useState(false)

    useEffect(() => {
        if (openLanes)
            setCheck(false)
    }, [openLanes])

    const close = () => {
        document.getElementById("checkLanes").checked = check
        setOpenLanes(false)
    }
    const handleCheck = (e, role) => {
        if (e.target.checked === true) {
            setLanes(lanes => [...lanes, role])
            setCheck(true)
        }
        else {
            let aux = lanes
            for (let index = 0; index < aux.length; index++) {
                const element = aux[index];
                if (element === role) {
                    aux.splice(index, 1)
                    if (aux.length === 0)
                        setCheck(false)
                    break
                }
            }
            setLanes(aux)
        }
    }

    return (
        <Modal
            isOpen={openLanes}
            onRequestClose={close}
            className={"modal-lanes"}>
            <div className="cont-div">
                <div className="div-lane">
                    <span>TOP</span>
                    <img alt="top" src={top} />
                    <input type="checkbox" onChange={(e) => handleCheck(e, 'top')} />
                </div>
                <div className="div-lane">
                    <span>JUNGLER</span>
                    <img alt="jungle" src={jungle} />
                    <input type="checkbox" onChange={(e) => handleCheck(e, 'JUNGLER')} />
                </div>
                <div className="div-lane">
                    <span>MID</span>
                    <img alt="mid" src={mid} />
                    <input type="checkbox" onChange={(e) => handleCheck(e, 'mid')} />
                </div>
                <div className="div-lane">
                    <span>BOT</span>
                    <img alt="bot" src={bot} />
                    <input type="checkbox" onChange={(e) => handleCheck(e, 'bot')} />
                </div>
                <div className="div-lane">
                    <span>SUPPORT</span>
                    <img alt="support" src={support} />
                    <input type="checkbox" onChange={(e) => handleCheck(e, 'support')} />
                </div>
            </div>
            {/* <div className="btn-wrapper">
                <button className="btn-roles" onClick={handleOnclick}>FIJAR ROLES</button>
            </div> */}

        </Modal>
    )
}
