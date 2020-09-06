import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Modal from 'react-modal'
import './modals.css'

const CHAMP_QUERY = gql`
query ChampionTest($lanes: [String]) {
    champions(lanes: $lanes) {
      id_champ
      champ_name
      img
      
    }
}
  
`

export default function ModalChamps({ openChamps, setOpenChamps, setChamps, champions, lanes }) {
    const [check, setCheck] = useState(false)
    useEffect(() => {
        if (openChamps)
            setCheck(false)
    }, [openChamps])

    const closeModal = () => {
        document.getElementById("checkChamps").checked = check
        setOpenChamps(false)
    }

    return (
        <Modal
            isOpen={openChamps}
            onRequestClose={closeModal}
            className={"modal-champs"}
        >
            <div className="champs-wrapper">
                <Query query={CHAMP_QUERY} variables={{ lanes }}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <div>LOADING</div>
                            if (error) return <div>ERROR</div>
                            return data.champions.map(champ => (
                                <ChampionItem champ={champ} key={champ.id_champ} champions={champions} setChamps={setChamps} setCheck={setCheck} />
                            ))
                        }
                    }
                </Query>

            </div>

        </Modal>
    )
}

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

function ChampionItem({ champ, champions, setChamps, setCheck }) {
    let border = '3px solid transparent'
    const force = useForceUpdate()
    for (let c of champions) {
        if (c.champ_name === champ.champ_name) {
            border = '5px solid red'
            break
        }
    }

    const selectChampion = (champ) => {
        let aux = champions
        let found = false
        for (let index = 0; index < aux.length; index++) {
            const c = aux[index];
            if (c.champ_name === champ.champ_name) {
                found = true
                border = '5px solid transparent'
                aux.splice(index, 1)
                if (aux.length === 0)
                    setCheck(false)
                break
            }

        }

        if (!found) {
            setChamps(champions => [...champions, champ])
            setCheck(true)
        }
        else
            setChamps(aux)


        force()

    }
    return (
        <div onClick={() => selectChampion(champ)}>
            <img src={champ.img} alt={champ.champ_name} style={{ border }} className="champ-img" />
        </div>
    )
}