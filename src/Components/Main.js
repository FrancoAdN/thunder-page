import React, { useState } from 'react'
import '../assets/css/main.css'
import '../assets/css/style.css'
import '../assets/css/font-awesome.css'
// import Preloader from './Preloader'
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
// import StateProvider from './Popup/_useHook'
// import Popup from './Popup/Popup'

export default function Main() {

    const [mod, setMod] = useState(false)

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

            {/* <Modal
                isOpen={mod}
                onRequestClose={() => setMod(false)}
                style={{
                    content: {
                        width: '90%',
                        height: '100%',
                        zIndex: 10000,
                        position: 'absolute',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px',
                        border: '1px solid #ccc',
                        top: '50%',
                        left: '50%',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    }

                }}

            >
                <StateProvider>
                    <Popup />
                </StateProvider>
            </Modal>
 */}
        </div>
    )
}
