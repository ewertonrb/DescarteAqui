import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import local from '../images/local.svg';
import '../styles/components/sidebar.css';

export default function Sidebar(){
    const {goBack} = useHistory();
    return(
        <aside className= "app-sidebar">
            <img src={local} alt="DA" />

            <footer>
              <button type='button' onClick={goBack}>
                <FiArrowLeft size={24} color="#fff" />
              </button>
            </footer>
        </aside>
    )

}