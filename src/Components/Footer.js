import React from 'react'
import discord from '../assets/images/discord-3-569463.png'
export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <ul className="social">
                            <li><a href="https://www.instagram.com/thunderboosting_/"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="https://www.facebook.com/Thunder-Boosting-104946388051491"><i className="fa fa-facebook"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <p className="copyright">Copyright &copy; 2020 thunderboosting.com - Design: <img
                            src={discord} className="discord-icon" alt="discord" /> 001#2346 </p>
                    </div>
                </div>
            </div>
        </footer>

    )
}
