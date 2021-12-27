
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import mapIcon from '../utils/mapIcon';
import '../styles/pages/CreateLocal.css';
import Sidebar from '../components/Sidebar';
import {LeafletMouseEvent} from 'leaflet';
import { FormEvent, useState, ChangeEvent } from 'react';
import api from '../service/api';
import { useHistory } from 'react-router';
import React from 'react';


export default function CreateLocal(){

  const history = useHistory();
  const [position, setPosition ] = useState({ latitude: 0, longitude: 0});

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [phone, setphone] = useState('');
  const [instructions, setInstructions] = useState('');
  const [horario_funcionamento, setHorarioFuncionamento] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  
  function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng;
   setPosition({
     latitude: lat,
     longitude: lng,
   });

  }
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      alert('necessário inserir ao menos 1 imagem!');
      return;
    }

    const selectedImages = Array.from(event.target.files);


    setImages(selectedImages);
    const selectedImagesPreview = selectedImages.map(image =>{
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }
  
  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const {latitude, longitude} = position;

    const data = new FormData();
    
    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('phone', phone);
    data.append('instructions', instructions);
    data.append('horario_funcionamento', horario_funcionamento);
    
    images.forEach(image => {
      data.append('images', image);
    });
    
    
    if(position.longitude === 0 ){
      alert('Marque o local no Mapa!')
      return;
    }

    if(images.length === 0 ){
      alert('Insira ao menos uma imagem!')
      return;
    }

    api.post('locais', data);
    alert('Cadastro Efetuado com sucesso!!');
    history.push('/app');
    
  }
  return (
    <div id="page-create-local">
    
    <Sidebar/>
    
      <main>
        <form onSubmit={handleSubmit} className="create-local-form">
          <fieldset>
            <legend>Dados:</legend>

            <Map 
              center = {[-14.8611792,-40.8361888]}
              style={{ width: '100%', height: 280 }}
              zoom={13}
              onclick={handleMapClick}
            >
              <TileLayer 
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {position.latitude !== 0 && (
              <Marker 
              interactive={false} 
              icon={mapIcon} 
              position={[
                position.latitude,
                position.longitude
              ]} />
              )}
              

            </Map>

              <span className = "instructionMap" >*Selecione o local no mapa*</span>


            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" required value= {name} onChange= {event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre:</label>
              <p className = "instruction">*Máximo de 300 caracteres</p>
              <textarea id="about" 
              value = {about} required onChange= {event => setAbout(event.target.value)} maxLength={300}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos:</label>
              <p className = "instruction">*Min 1 foto / max 5</p>


              <div className="image-container">
                {previewImages.map(image => {
                  return(
                    <img key ={image} src={image} alt={name} />
                  )
                })}

              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Coleta de E-Lixo</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
              id="instructions" 
              required
              value= {instructions} 
              onChange={event => setInstructions(event.target.value)}
              />
            </div>
            

            <div className="input-block">
              <label htmlFor="phone">Whats App</label>
              <input
              id="phone"
              required placeholder="(xx) xxxxx-xxxx"
              type="number"
              value= {phone} 
              onChange={event => setphone(event.target.value)}
               />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input id="opening_hours"
              required
              value= {horario_funcionamento} 
              onChange={event => setHorarioFuncionamento(event.target.value)}
               />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`*/