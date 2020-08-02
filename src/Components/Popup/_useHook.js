import React, { createContext, useRef, useState } from 'react'


export const prov = createContext()

export default function StateProvider(props) {
    const [price, setPrice] = useState(0)
    const [days, setDays] = useState(0)
    const [fromRank, setFromRank] = useState("Iron")
    const [toRank, setToRank] = useState("Iron")
    const divFromRef = useRef()
    const divToRef = useRef()
    const serverRef = useRef()
    const modeRef = useRef()
    const fastRef = useRef()
    //STEP 2
    const [summoners, setSummoners] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [cemail, setCemail] = useState('')
    const [ref, setRef] = useState('')
    const [message, setMessage] = useState('')

    const fetchInformation = () => {
        console.log(summoners)
        console.log(username)
        console.log(password)
        console.log(email)
        console.log(cemail)
        console.log(ref)
        console.log(message)
    }

    const rt = {
        price, setPrice,
        days, setDays,
        fromRank, setFromRank,
        toRank, setToRank,
        divFromRef, divToRef,
        serverRef, modeRef, fastRef,
        //STEP 2
        summoners, setSummoners,
        username, setUsername,
        password, setPassword,
        email, setEmail,
        cemail, setCemail,
        ref, setRef,
        message, setMessage,

        fetchInformation,
    }



    return (
        <prov.Provider value={rt}>
            {props.children}
        </prov.Provider>
    )
}