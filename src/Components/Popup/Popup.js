import React, { useState } from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'


export default function Popup() {
    // const [two, setTwo] = useState(false)
    // if (two) {
    //     return (<StepTwo />)
    // }
    // return (<StepOne set={setTwo} />)
    const [step, setStep] = useState("1")
    if (step === "1")
        return (<StepOne set={setStep} />)
    else if (step === "2")
        return (<StepTwo set={setStep} />)
    // return (<Payment />)
}
