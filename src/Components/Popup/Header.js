import React from 'react'
import rank1 from './ranks-lol/1.png'

export default function Header({ title }) {
    return (
        <div className="header-section">
            <div className="division text-center">
                <p className="">{title}</p>
                <i><img src={rank1} className="img-fluid" /></i>
            </div>
        </div>
    )
}
