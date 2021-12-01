import '../styles/pages/Login.css'
import logoImg from '../images/logo.svg';
import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import React from 'react';


export function Login(){

    const history = useHistory();

    function data(event: FormEvent){
      history.push('/app')
    }

    return(
      
      <div id = "page-login" >
      <div className="content-wrapper">
        <img src={logoImg} alt="DA" />
        
  
        <div className="location">
        <strong> Vitória da Conquista </strong>
        <span>Bahia</span>
        </div>


        <main>
            <form onSubmit={data} className = "form">
            <fieldset>
            <legend>Login:</legend>
            
            <div className="input-block">
              <label htmlFor="name">Nome:</label>
              <input id="name"/>
            </div>

            <div className="input-block">
              <label htmlFor="password">Password:</label>
              <input id="password" type= "password" />
            </div>

            <span className = "senha">Esqueceu sua senha?</span>

            <button className="confirm-button" type = 'submit'>
            Confirmar
          </button>


            </fieldset>
            </form>
        </main>





        </div>
      </div>
    
    )}

export default Login;
