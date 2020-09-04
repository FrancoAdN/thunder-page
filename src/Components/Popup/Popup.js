import React, { useState } from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'

export default function Popup() {
    const [two, setTwo] = useState(false)
    if (two) {
        return (<StepTwo />)
    }
    return (<StepOne set={setTwo} />)
}
