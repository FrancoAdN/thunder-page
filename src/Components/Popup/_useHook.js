import React, { createContext, useRef, useState } from 'react'
import axios from 'axios'

export const prov = createContext()

export default function StateProvider(props) {
    const [price, setPrice] = useState(0)
    const [days, setDays] = useState(0)
    const [fromRank, setFromRank] = useState("Iron")
    const [toRank, setToRank] = useState("Iron")
    const [champs, setChamps] = useState([])
    const [lanes, setLanes] = useState([])
    const divFromRef = useRef()
    const divToRef = useRef()
    const serverRef = useRef()
    const modeRef = useRef()
    const fastRef = useRef()
    const discordRef = useRef()
    //STEP 2
    const [summoners, setSummoners] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [cemail, setCemail] = useState('')
    const [ref, setRef] = useState('')
    const [message, setMessage] = useState('')

    const fetchInformation = () => {
        const from = `${fromRank} ${divFromRef.current}`
        const to = `${toRank} ${divToRef.current}`
        const server = serverRef.current
        const mode = (fastRef.current) ? "Fast service" : "Normal service"
        const dc = (discordRef.current) ? "SI" : "NO"
        const queue = modeRef.current
        let ch = []
        for (let c of champs) {
            ch.push(c.champ_name)
        }
        const data = { summoners, username, password, email, cemail, ref, message, price, days, from, to, server, mode, dc, queue, lanes, ch }

        axios.post('https://thunderboosting.com/boost', data).then((resp) => {
            return resp
        })
    }

    const romanize = (num) => {
        if (num === "1") return 'I'
        else if (num === "2") return 'II'
        else if (num === "3") return 'III'
        return 'IV'
    }

    const rt = {
        price, setPrice,
        days, setDays,
        fromRank, setFromRank,
        toRank, setToRank,
        champs, setChamps,
        lanes, setLanes,
        divFromRef, divToRef, discordRef,
        serverRef, modeRef, fastRef,
        //STEP 2
        summoners, setSummoners,
        username, setUsername,
        password, setPassword,
        email, setEmail,
        cemail, setCemail,
        ref, setRef,
        message, setMessage,

        fetchInformation, romanize
    }



    return (
        <prov.Provider value={rt}>
            {props.children}
        </prov.Provider>
    )
}