
import React from 'react';
import '../styles/pages/landing.css'
import logoImg from '../images/logo.svg';
import {Link} from 'react-router-dom';
import '../styles/pages/landing.css';
import {FiArrowRight, FiDownload} from 'react-icons/fi';
import lixo from '../images/lixo.png';


function Landing() {
    return(
      
      <div id = "page-landing" >
      <div className="content-wrapper">
        <img src={logoImg} alt="DA" />
        
        <main>
          <h1>Ajude o meio ambiente!</h1>
          <p>Descarte o seu E-lixo com segurança!</p>
        </main>
  
        <div className="location">
        <strong> Vitória da Conquista </strong>
        <span>Bahia</span>
        </div>

        <div className = "lixo">
          <img src = {lixo} width="540" height="400" alt="LX" id="imglixo"/>
        </div>

        <a target= "_blank" rel="noopener noreferrer" href={"https://drive.google.com/file/d/1yjXt1sW4FTY6RFoa8mgSUgVjJoQV0Yyk/view?usp=sharing"} className = "down-app">
         <FiDownload size ={26} color="rgba(0,0,0,0.6)" />
         <legend>Download APK</legend>
         </a>

         <Link to="/login" className = "enter-app">
         <FiArrowRight size ={26} color="rgba(0,0,0,0.6)" />
         
         </Link>
        </div>
      </div>
    );
}

export default Landing;