import React, {useEffect, useState} from 'react';
import Local from '../images/local.svg';
import {Link} from 'react-router-dom';
import{FiPlus, FiEdit3, FiArrowRight} from 'react-icons/fi';

import '../styles/pages/CollectionMap.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mapIcon from '../utils/mapIcon';
import api from '../service/api';

interface LocalData{
    id:number;
    name: string;
    latitude: number;
    longitude: number;

}

function CollectionMap(){
    const[locais, setLocais] = useState<LocalData[]>([]);



    useEffect(()=>{
        api.get('locais').then(response=>{
            setLocais(response.data);
        })
    },[]);

return (
    <div id= "page-map">
        <aside>
            <header>
                <img src={Local} alt="DA" />
                <h2>Escolha um Local no Mapa</h2>
                <p>Descarte seu e-lixo em segurança! ;) </p>
            </header>

        <footer>
            <strong>Vitória da Conquista</strong>
            <span>Bahia</span>
        </footer>
        </aside>

        <Map
            center = {[-14.8611792,-40.8361888]}
            zoom = {13}
            style ={{ width:'100%', height: '100%' }}
        >
            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

       
        {locais.map(local => {
            return(
                <Marker
                icon={mapIcon}
                position = {[local.latitude, local.longitude]}
                key = {local.id}
                >
                     <Popup closeButton = {false} minWidth={240} maxWidth= {240} className ="map-popup">
                       {local.name}

                       <Link to = {`/update/${local.id}`} className='iconUpdate'>
                        <FiEdit3 size={20} color="#15c3d6" />
                       </Link>
                       <Link to = {`/local/${local.id}`}>
                        <FiArrowRight size={20} color="#fff" />
                       </Link>

                    </Popup>    
                </Marker>
            )
        })}
        </Map>

        <Link to="/local/create" className = "criar-local">
        <FiPlus size= {32} color = "#FFF" />
        </Link>
    </div>
);
}

export default CollectionMap;