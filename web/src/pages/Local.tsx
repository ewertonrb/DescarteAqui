import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { FiClock} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import '../styles/pages/Local.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import { useEffect, useState } from "react";
import api from "../service/api";
import {useParams} from 'react-router-dom';

interface Local{
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  phone: string;
  instructions: string;
  horario_funcionamento: string;
  images: Array< {
      id: number;
      url: string;
  }>;
  
}
interface PlacesParams{
  id:string;
}

export default function Local() {
  const params = useParams() as PlacesParams;
  const[local, setLocal] = useState<Local>();
  const [activeImageIndex, setActiveImageIndex] = useState(1);


    useEffect(()=>{
        api.get(`locais/${params.id}`).then(response=>{
            setLocal(response.data);
        })
    },[params.id]);

    if(!local){
      return<p>Carregando...</p>;
    }

  return (
    <div id="page-local">
      <Sidebar/>

      <main>
        <div className="local-details">
          <img src={local.images[activeImageIndex].url} alt={local.name} />

          <div className="images">
            {local.images.map((image, index) =>{
              return(
                <button 
                key={image.id} 
                className={activeImageIndex === index ? 'active' : ''} 
                type= "button"
                onClick = {()=> {
                  setActiveImageIndex(index)
                }}
                >
                <img src= {image.url} alt= {local.name} />
                </button>
              );
            })}
          </div>
          
          <div className="local-details-content">
            <h1>{local.name}</h1>
            <p>{local.about}</p>

            <div className="map-container">
              <Map 
                center={[local.latitude, local.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                <Marker interactive={false} icon={mapIcon} position={[local.latitude,local.longitude]} />
              </Map>

              <footer>
                <a target= "_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${local.latitude},${local.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para Coleta</h2>
            <p>{local.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {local.horario_funcionamento}
              </div>
            </div>

            <button type="submit" className="contact-button" >
              <FaWhatsapp size={20} color="#FFF" />
             <a href={`https://api.whatsapp.com/send?phone=55${local.phone}`}> Entrar em Contato</a>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}