import { Map, Marker, TileLayer } from "react-leaflet";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../service/api";
import '../styles/pages/UpdateLocal.css';
import { LeafletMouseEvent } from "leaflet";
import mapIcon from "../utils/mapIcon";


interface Local{
    id: string;
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

export default function UpdateLocal(){

    const params = useParams() as PlacesParams;
    const[local, setLocal] = useState<Local>();
    const history = useHistory();

   const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [position, setPosition ] = useState({ latitude: 0, longitude: 0});
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [phone, setphone] = useState('');
  const [instructions, setInstructions] = useState('');
  const [horario_funcionamento, setHorarioFuncionamento] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);


  useEffect(()=>{
    api.get(`locais/${params.id}`).then(response=>{
        setLocal(response.data);
    })
},[params.id]);

if(!local){
  return<p>Carregando...</p>;
}
    
    function deleteLocal(event: FormEvent){
      event.preventDefault();

      var resultado = window.confirm("Deseja realmente excluir este local?");
        if (resultado === true) {

          api.delete(`/locais/${local?.id}`);
          alert('Local deletado com sucesso!!');
          history.push('/app');    
        }
        else{
            return;
        }
    }

    function handleMapClick(event: LeafletMouseEvent){
      const {lat, lng} = event.latlng;
     setPosition({
       latitude: lat,
       longitude: lng,
     });

    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
      if(!event.target.files){
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
      data.append('latitude', String (latitude));
      data.append('longitude', String (longitude));
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

      api.put(`/locais/${local?.id}`, data);
      alert('Local alterado com sucesso!!');
      history.push('/app');
      
    }

    return(
        <div id="page-create-local">
        <Sidebar/>
      <main>
        <form onSubmit={handleSubmit} className="create-local-form">

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
              <input required id="name" value={name} 
              placeholder={local.name} 
              onChange= {event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre:</label>
              <p className = "instruction">*Máximo de 300 caracteres</p>
              <textarea required id="about" value = {about} placeholder={local.instructions} 
              onChange= {event => setAbout(event.target.value)} maxLength={300}
              />
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
              </div>

              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
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
              placeholder={local.about} 
              onChange={event => setInstructions(event.target.value)}
              />
            </div>
            

            <div className="input-block">
              <label htmlFor="phone">Whats App</label>
              <input
              id="phone"
              required
              type="number"
              placeholder={local.phone}
              value= {phone} 
              onChange={event => setphone(event.target.value)}
               />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input required id="opening_hours" placeholder={local.horario_funcionamento}
              value= {horario_funcionamento} 
              onChange={event => setHorarioFuncionamento(event.target.value)}
               />
            </div>
          </fieldset>
          <button className="confirm-button" type="submit">
          Alterar
          </button>
          <button className="delete-button" type="button" onClick={deleteLocal}>
          Deletar Local
          </button>
          
        </form>
      </main>
    </div>
  );
}
