import React, { useState } from 'react'
import Modal from 'react-modal'
import './modals.css'
import top from '../top.png'
import jungle from '../jungle.png'
import mid from '../mid.png'
import bot from '../bot.png'
import support from '../support.png'

export default function ModalLanes({ lanes, setLanes }) {
    const [prefLanes, setPrefLanes] = useState([])
    const close = () => {
        setLanes(false)
    }
    const handleCheck = (e, role) => {
        if (e.target.checked) {
            setPrefLanes(prefLanes => [...prefLanes, role])
        } else {
            const index = prefLanes.findIndex(item => item === role)
            if (index)
                setPrefLanes(prefLanes => prefLanes.splice(index, 1))

        }
    }
    const handleOnclick = () => {
        console.log(prefLanes)
    }

    return (
        <Modal
            isOpen={lanes}
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
            <div className="btn-wrapper">
                <button className="btn-roles" onClick={handleOnclick}>FIJAR ROLES</button>
            </div>

        </Modal>
    )
}
