import React from 'react'
import discord from '../assets/images/discord-3-569463.png'
export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <ul className="social">
                            <li><a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="https://www.twitter.com/"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="https://www.youtube.com/"><i className="fa fa-youtube"></i></a></li>
                            <li><a href="https://www.whatsapp.com/"><i className="fa fa-whatsapp"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <p className="copyright">Copyright &copy; 2020 ThunderBoosting.com - Design: <img
                            src={discord} className="discord-icon" alt="discord" /> yazzi#9425 </p>
                    </div>
                </div>
            </div>
        </footer>

    )
}
