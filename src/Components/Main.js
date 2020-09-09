import React from 'react'
import '../assets/css/main.css'
import '../assets/css/style.css'
import '../assets/css/font-awesome.css'
import Header from './Header'
import Welcome from './Welcome'
import FeatSmall from './FeatSmall'
import FeatBig from './FeatBig'
import FeatItem from './FeatItem'
import Counter from './Counter'
import Services from './Services'
import Process from './Process'
import Valorant from './Valorant'
import Footer from './Footer'

export default function Main() {

    return (
        <div>

            {/* <Preloader /> */}

            <Header />
            <Welcome />
            <FeatSmall />
            <FeatBig />
            <FeatItem />
            <Counter />
            <Services />
            <Process />
            <Valorant />
            <Footer />

        </div>
    )
}
