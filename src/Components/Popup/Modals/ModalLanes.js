import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import './modals.css'
import top from '../TOP.png'
import jungle from '../JUNGLER.png'
import mid from '../MID.png'
import bot from '../BOT.png'
import support from '../SUPPORT.png'

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
                    <input type="checkbox" onChange={(e) => handleCheck(e, 'TOP')} />
                </div>
                <div className="div-lane">
                    <span>JUNGLER</span>
                    <img alt="jungle" src={jungle} />
                    <input type="checkbox" onChange={(e) => handleCheck(e, 'JUNGLER')} />
                </div>
                <div className="div-lane">
                    <span>MID</span>
                    <img alt="mid" src={mid} />
                    <input type="checkbox" onChange={(e) => handleCheck(e, 'MID')} />
                </div>
                <div className="div-lane">
                    <span>BOT</span>
                    <img alt="bot" src={bot} />
                    <input type="checkbox" onChange={(e) => handleCheck(e, 'BOT')} />
                </div>
                <div className="div-lane">
                    <span>SUPPORT</span>
                    <img alt="support" src={support} />
                    <input type="checkbox" onChange={(e) => handleCheck(e, 'SUPPORT')} />
                </div>
            </div>
            {/* <div className="btn-wrapper">
                <button className="btn-roles" onClick={handleOnclick}>FIJAR ROLES</button>
            </div> */}

        </Modal>
    )
}
